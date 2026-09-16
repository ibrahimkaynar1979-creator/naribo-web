import {NextRequest,NextResponse} from 'next/server';
import {getQrMenuDb} from '../../../../../lib/qr-menu/db';
import {getRestaurantAccess} from '../../../../../lib/auth/access';

type Context={params:Promise<{restaurant:string}>};
function slugify(v:string){return v.toLocaleLowerCase('tr-TR').replace(/ı/g,'i').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c').replace(/[^a-z0-9-]+/g,'-').replace(/^-+|-+$/g,'')}

export async function GET(request:NextRequest,{params}:Context){
 try{
  const{restaurant}=await params;const slug=slugify(restaurant);const access=await getRestaurantAccess(slug);if(!access)return NextResponse.json({error:'Yetkisiz erişim'},{status:403});
  const sql=getQrMenuDb();const rr=await sql`SELECT id,name FROM restaurants WHERE slug=${slug} AND is_active=true LIMIT 1`;const r=rr[0] as any;if(!r)return NextResponse.json({error:'Restoran bulunamadı'},{status:404});
  const raw=request.nextUrl.searchParams.get('range')||'30';const range=['7','30','90','all'].includes(raw)?raw:'30';const days=range==='all'?null:Number(range);const start=days?new Date(Date.now()-(days-1)*86400000):null;const rid=r.id;
  const views= start
   ? await sql`SELECT to_char((viewed_at AT TIME ZONE 'Europe/Istanbul')::date,'YYYY-MM-DD') AS day,count(*)::int AS count FROM menu_views WHERE restaurant_id=${rid} AND viewed_at>=${start} GROUP BY 1 ORDER BY 1`
   : await sql`SELECT to_char((viewed_at AT TIME ZONE 'Europe/Istanbul')::date,'YYYY-MM-DD') AS day,count(*)::int AS count FROM menu_views WHERE restaurant_id=${rid} GROUP BY 1 ORDER BY 1`;
  const total= start
   ? await sql`SELECT count(*)::int AS count FROM menu_views WHERE restaurant_id=${rid} AND viewed_at>=${start}`
   : await sql`SELECT count(*)::int AS count FROM menu_views WHERE restaurant_id=${rid}`;
  const today=await sql`SELECT count(*)::int AS count FROM menu_views WHERE restaurant_id=${rid} AND (viewed_at AT TIME ZONE 'Europe/Istanbul')::date=(now() AT TIME ZONE 'Europe/Istanbul')::date`;
  const top= start
   ? await sql`SELECT p.id,p.name,p.image_url,p.price,count(v.id)::int AS views FROM products p LEFT JOIN product_views v ON v.product_id=p.id AND v.viewed_at>=${start} WHERE p.restaurant_id=${rid} GROUP BY p.id,p.name,p.image_url,p.price,p.sort_order ORDER BY views DESC,p.sort_order ASC LIMIT 8`
   : await sql`SELECT p.id,p.name,p.image_url,p.price,count(v.id)::int AS views FROM products p LEFT JOIN product_views v ON v.product_id=p.id WHERE p.restaurant_id=${rid} GROUP BY p.id,p.name,p.image_url,p.price,p.sort_order ORDER BY views DESC,p.sort_order ASC LIMIT 8`;
  const rating= start
   ? await sql`SELECT coalesce(round(avg(rating)::numeric,1),0)::text AS avg,count(*)::int AS count FROM feedback WHERE restaurant_id=${rid} AND created_at>=${start}`
   : await sql`SELECT coalesce(round(avg(rating)::numeric,1),0)::text AS avg,count(*)::int AS count FROM feedback WHERE restaurant_id=${rid}`;
  const calls= start
   ? await sql`SELECT count(*)::int AS count FROM service_calls WHERE restaurant_id=${rid} AND created_at>=${start}`
   : await sql`SELECT count(*)::int AS count FROM service_calls WHERE restaurant_id=${rid}`;
  return NextResponse.json({range,restaurantName:r.name,todayViews:Number((today[0] as any)?.count||0),periodViews:Number((total[0] as any)?.count||0),averageRating:Number((rating[0] as any)?.avg||0),feedbackCount:Number((rating[0] as any)?.count||0),serviceCalls:Number((calls[0] as any)?.count||0),dailyViews:views.map((x:any)=>({day:x.day,count:Number(x.count)})),topProducts:top.map((p:any)=>({id:String(p.id),name:p.name,image:p.image_url||'',price:Number(p.price),views:Number(p.views)}))},{headers:{'Cache-Control':'no-store'}})
 }catch(e){console.error(e);return NextResponse.json({error:'İstatistikler yüklenemedi'},{status:500})}
}
