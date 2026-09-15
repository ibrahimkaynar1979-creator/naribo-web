import { NextRequest, NextResponse } from 'next/server';
import { getQrMenuDb } from '../../../../lib/qr-menu/db';

type ProductInput={id?:string;categoryId:string;name:string;description:string;price:number;image:string;allergens?:string[];isActive:boolean;sortOrder:number};
type Context={params:Promise<{restaurant:string}>};

function slugify(v:string){return v.toLocaleLowerCase('tr-TR').replace(/ı/g,'i').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c').replace(/[^a-z0-9-]+/g,'-').replace(/^-+|-+$/g,'')}

async function getRestaurant(sql:ReturnType<typeof getQrMenuDb>,slug:string){
  const rows=await sql`SELECT id,slug,name,logo_url,cover_url,description,phone,address,instagram,wifi_name,wifi_password,iban,directions_url,opening_hours,theme_color,is_active FROM restaurants WHERE slug=${slug} LIMIT 1`;
  return rows[0] as any|undefined;
}

export async function GET(_r:NextRequest,{params}:Context){
  try{
    const{restaurant}=await params;const slug=slugify(restaurant);const sql=getQrMenuDb();const r=await getRestaurant(sql,slug);
    if(!r||!r.is_active)return NextResponse.json({error:'Restoran bulunamadı'},{status:404});
    const rid=r.id;
    const [cr,pr,calls,feedback,todayViews,totalViews,rating,pending,daily,top]=await Promise.all([
      sql`SELECT id,name,sort_order,is_active FROM categories WHERE restaurant_id=${rid} ORDER BY sort_order,id`,
      sql`SELECT id,category_id,name,description,price,image_url,allergens,is_active,sort_order FROM products WHERE restaurant_id=${rid} ORDER BY sort_order,id`,
      sql`SELECT id,table_no,note,status,created_at,resolved_at FROM service_calls WHERE restaurant_id=${rid} ORDER BY created_at DESC LIMIT 50`,
      sql`SELECT id,rating,comment,customer_name,created_at FROM feedback WHERE restaurant_id=${rid} ORDER BY created_at DESC LIMIT 50`,
      sql`SELECT count(*)::int AS count FROM menu_views WHERE restaurant_id=${rid} AND (viewed_at AT TIME ZONE 'Europe/Istanbul')::date=(now() AT TIME ZONE 'Europe/Istanbul')::date`,
      sql`SELECT count(*)::int AS count FROM menu_views WHERE restaurant_id=${rid}`,
      sql`SELECT coalesce(round(avg(rating)::numeric,1),0)::text AS avg,count(*)::int AS count FROM feedback WHERE restaurant_id=${rid}`,
      sql`SELECT count(*)::int AS count FROM service_calls WHERE restaurant_id=${rid} AND status='pending'`,
      sql`SELECT to_char((viewed_at AT TIME ZONE 'Europe/Istanbul')::date,'YYYY-MM-DD') AS day,count(*)::int AS count FROM menu_views WHERE restaurant_id=${rid} AND viewed_at>=now()-interval '6 days' GROUP BY 1 ORDER BY 1`,
      sql`SELECT p.id,p.name,p.image_url,p.price,count(v.id)::int AS views FROM products p LEFT JOIN product_views v ON v.product_id=p.id WHERE p.restaurant_id=${rid} GROUP BY p.id,p.name,p.image_url,p.price ORDER BY views DESC,p.sort_order ASC LIMIT 5`
    ]);
    return NextResponse.json({
      restaurant:{id:String(rid),slug:r.slug,name:r.name,logo:r.logo_url||'',cover:r.cover_url||'',description:r.description||'',phone:r.phone||'',address:r.address||'',instagram:r.instagram||'',wifiName:r.wifi_name||'',wifiPassword:r.wifi_password||'',iban:r.iban||'',directionsUrl:r.directions_url||'',openingHours:r.opening_hours||{},themeColor:r.theme_color||'#f46861'},
      categories:cr.map((c:any)=>({id:String(c.id),name:c.name,isActive:c.is_active,sortOrder:c.sort_order})),
      products:pr.map((p:any)=>({id:String(p.id),categoryId:String(p.category_id),name:p.name,description:p.description||'',price:Number(p.price),image:p.image_url||'',allergens:p.allergens||[],isActive:p.is_active,sortOrder:p.sort_order})),
      calls:calls.map((c:any)=>({id:String(c.id),tableNo:c.table_no,note:c.note||'',status:c.status,createdAt:c.created_at,resolvedAt:c.resolved_at})),
      feedback:feedback.map((f:any)=>({id:String(f.id),rating:Number(f.rating),comment:f.comment||'',customerName:f.customer_name||'Misafir',createdAt:f.created_at})),
      stats:{todayViews:Number((todayViews[0] as any)?.count||0),totalViews:Number((totalViews[0] as any)?.count||0),averageRating:Number((rating[0] as any)?.avg||0),feedbackCount:Number((rating[0] as any)?.count||0),pendingCalls:Number((pending[0] as any)?.count||0),dailyViews:daily.map((d:any)=>({day:d.day,count:Number(d.count)})),topProducts:top.map((p:any)=>({id:String(p.id),name:p.name,image:p.image_url||'',price:Number(p.price),views:Number(p.views)}))}
    },{headers:{'Cache-Control':'no-store'}});
  }catch(e){console.error(e);return NextResponse.json({error:'Panel verileri yüklenemedi'},{status:500})}
}

export async function PUT(request:NextRequest,{params}:Context){
  try{
    const{restaurant}=await params;const slug=slugify(restaurant);const body=await request.json() as {products?:ProductInput[]};if(!Array.isArray(body.products))return NextResponse.json({error:'Geçersiz veri'},{status:400});const sql=getQrMenuDb();const r=await getRestaurant(sql,slug);if(!r)return NextResponse.json({error:'Restoran bulunamadı'},{status:404});const rid=r.id;
    const cr=await sql`SELECT id FROM categories WHERE restaurant_id=${rid}`;const valid=new Set((cr as any[]).map(c=>String(c.id)));const ids=new Set(body.products.map(p=>p.id).filter((id):id is string=>Boolean(id&&/^\d+$/.test(id))));const ex=await sql`SELECT id FROM products WHERE restaurant_id=${rid}`;
    for(const row of ex as any[])if(!ids.has(String(row.id)))await sql`DELETE FROM products WHERE id=${row.id} AND restaurant_id=${rid}`;
    for(const p of body.products){if(!valid.has(String(p.categoryId))||!p.name?.trim())continue;const cid=Number(p.categoryId),a=(p.allergens||[]).map(x=>x.trim()).filter(Boolean).join(',');if(p.id&&/^\d+$/.test(p.id))await sql`UPDATE products SET category_id=${cid},name=${p.name.trim()},description=${p.description||''},price=${Number(p.price)||0},image_url=${p.image||''},allergens=CASE WHEN ${a}='' THEN ARRAY[]::text[] ELSE string_to_array(${a}, ',') END,is_active=${p.isActive},sort_order=${p.sortOrder||0},updated_at=now() WHERE id=${Number(p.id)} AND restaurant_id=${rid}`;else await sql`INSERT INTO products (restaurant_id,category_id,name,description,price,image_url,allergens,is_active,is_featured,sort_order) VALUES (${rid},${cid},${p.name.trim()},${p.description||''},${Number(p.price)||0},${p.image||''},CASE WHEN ${a}='' THEN ARRAY[]::text[] ELSE string_to_array(${a}, ',') END,${p.isActive},false,${p.sortOrder||0})`}
    return NextResponse.json({ok:true});
  }catch(e){console.error(e);return NextResponse.json({error:'Menü kaydedilemedi'},{status:500})}
}

export async function PATCH(request:NextRequest,{params}:Context){
  try{
    const{restaurant}=await params;const slug=slugify(restaurant);const sql=getQrMenuDb();const r=await getRestaurant(sql,slug);if(!r)return NextResponse.json({error:'Restoran bulunamadı'},{status:404});const rid=r.id;const body=await request.json() as any;
    if(body.action==='saveCategory'){
      const c=body.category||{};const name=String(c.name||'').trim();if(!name)return NextResponse.json({error:'Kategori adı gerekli'},{status:400});
      if(c.id&&/^\d+$/.test(String(c.id)))await sql`UPDATE categories SET name=${name},is_active=${c.isActive!==false},sort_order=${Number(c.sortOrder)||0} WHERE id=${Number(c.id)} AND restaurant_id=${rid}`;
      else await sql`INSERT INTO categories (restaurant_id,name,sort_order,is_active) VALUES (${rid},${name},${Number(c.sortOrder)||0},${c.isActive!==false})`;
      return NextResponse.json({ok:true});
    }
    if(body.action==='deleteCategory'){
      const id=Number(body.id);const used=await sql`SELECT count(*)::int AS count FROM products WHERE restaurant_id=${rid} AND category_id=${id}`;if(Number((used[0] as any)?.count||0)>0)return NextResponse.json({error:'Bu kategoride ürün var. Önce ürünleri başka kategoriye taşıyın.'},{status:409});
      await sql`DELETE FROM categories WHERE id=${id} AND restaurant_id=${rid}`;return NextResponse.json({ok:true});
    }
    if(body.action==='updateRestaurant'){
      const x=body.restaurant||{};
      await sql`UPDATE restaurants SET name=${String(x.name||r.name).trim()||r.name},description=${String(x.description||'')},phone=${String(x.phone||'')},address=${String(x.address||'')},instagram=${String(x.instagram||'')},wifi_name=${String(x.wifiName||'')},wifi_password=${String(x.wifiPassword||'')},iban=${String(x.iban||'')},directions_url=${String(x.directionsUrl||'')},logo_url=${String(x.logo||'')},cover_url=${String(x.cover||'')},theme_color=${String(x.themeColor||'#f46861')},opening_hours=${JSON.stringify(x.openingHours||{})}::jsonb,updated_at=now() WHERE id=${rid}`;
      return NextResponse.json({ok:true});
    }
    if(body.action==='resolveCall'){
      const id=Number(body.id);await sql`UPDATE service_calls SET status='resolved',resolved_at=now() WHERE id=${id} AND restaurant_id=${rid}`;return NextResponse.json({ok:true});
    }
    return NextResponse.json({error:'Geçersiz işlem'},{status:400});
  }catch(e){console.error(e);return NextResponse.json({error:'İşlem tamamlanamadı'},{status:500})}
}
