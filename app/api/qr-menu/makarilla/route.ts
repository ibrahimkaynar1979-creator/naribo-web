import { NextResponse } from 'next/server';
import { getQrMenuDb } from '../../../../lib/qr-menu/db';

type ProductInput = { id?: string; categoryId:string; name:string; description:string; price:number; image:string; allergens?:string[]; isActive:boolean; sortOrder:number };

const slugByName:Record<string,string>={'Makarnalar':'pastas','Tavuklar':'chicken-pastas','Wraplar':'wraps','Salatalar':'salads','Tatlılar':'desserts','İçecekler':'drinks'};

export async function GET(){
  try{
    const sql=getQrMenuDb();
    const restaurantRows=await sql`SELECT id,slug,name FROM restaurants WHERE slug='makarilla' AND is_active=true LIMIT 1`;
    if(!restaurantRows.length) return NextResponse.json({error:'Makarilla bulunamadı'},{status:404});
    const restaurantId=restaurantRows[0].id;
    const categoryRows=await sql`SELECT id,name,sort_order,is_active FROM categories WHERE restaurant_id=${restaurantId} ORDER BY sort_order,id`;
    const productRows=await sql`SELECT p.id,p.category_id,p.name,p.description,p.price,p.image_url,p.allergens,p.is_active,p.sort_order,c.name AS category_name FROM products p JOIN categories c ON c.id=p.category_id WHERE p.restaurant_id=${restaurantId} ORDER BY p.sort_order,p.id`;
    const categories=categoryRows.map((c:any)=>({id:slugByName[c.name]||String(c.id),name:c.name,isActive:c.is_active,sortOrder:c.sort_order}));
    const products=productRows.map((p:any)=>({id:String(p.id),categoryId:slugByName[p.category_name]||String(p.category_id),name:p.name,description:p.description||'',price:Number(p.price),image:p.image_url||'',allergens:p.allergens||[],isActive:p.is_active,sortOrder:p.sort_order}));
    return NextResponse.json({categories,products},{headers:{'Cache-Control':'no-store'}});
  }catch(error){console.error('GET /api/qr-menu/makarilla',error);return NextResponse.json({error:'Menü yüklenemedi'},{status:500});}
}

export async function PUT(request:Request){
  try{
    const body=await request.json() as {products?:ProductInput[]};
    if(!Array.isArray(body.products)) return NextResponse.json({error:'Geçersiz veri'},{status:400});
    const sql=getQrMenuDb();
    const restaurantRows=await sql`SELECT id FROM restaurants WHERE slug='makarilla' LIMIT 1`;
    if(!restaurantRows.length) return NextResponse.json({error:'Makarilla bulunamadı'},{status:404});
    const restaurantId=restaurantRows[0].id;
    const categoryRows=await sql`SELECT id,name FROM categories WHERE restaurant_id=${restaurantId}`;
    const categoryBySlug:Record<string,number>={};
    for(const c of categoryRows as any[]) categoryBySlug[slugByName[c.name]||String(c.id)]=Number(c.id);

    const incomingIds=new Set(body.products.map(p=>p.id).filter((id):id is string=>Boolean(id&&/^\d+$/.test(id))));
    const existing=await sql`SELECT id FROM products WHERE restaurant_id=${restaurantId}`;
    for(const row of existing as any[]){
      if(!incomingIds.has(String(row.id))) await sql`DELETE FROM products WHERE id=${row.id} AND restaurant_id=${restaurantId}`;
    }

    for(const product of body.products){
      const categoryId=categoryBySlug[product.categoryId];
      if(!categoryId||!product.name?.trim()) continue;
      const allergensCsv=(product.allergens||[]).map(x=>x.trim()).filter(Boolean).join(',');
      if(product.id&&/^\d+$/.test(product.id)){
        await sql`UPDATE products SET category_id=${categoryId},name=${product.name.trim()},description=${product.description||''},price=${Number(product.price)||0},image_url=${product.image||''},allergens=CASE WHEN ${allergensCsv}='' THEN ARRAY[]::text[] ELSE string_to_array(${allergensCsv}, ',') END,is_active=${product.isActive},sort_order=${product.sortOrder||0},updated_at=now() WHERE id=${Number(product.id)} AND restaurant_id=${restaurantId}`;
      }else{
        await sql`INSERT INTO products (restaurant_id,category_id,name,description,price,image_url,allergens,is_active,is_featured,sort_order) VALUES (${restaurantId},${categoryId},${product.name.trim()},${product.description||''},${Number(product.price)||0},${product.image||''},CASE WHEN ${allergensCsv}='' THEN ARRAY[]::text[] ELSE string_to_array(${allergensCsv}, ',') END,${product.isActive},false,${product.sortOrder||0})`;
      }
    }
    return NextResponse.json({ok:true});
  }catch(error){console.error('PUT /api/qr-menu/makarilla',error);return NextResponse.json({error:'Menü kaydedilemedi'},{status:500});}
}
