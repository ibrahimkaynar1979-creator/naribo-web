import {NextRequest,NextResponse} from 'next/server';
import {getQrMenuDb} from '../../../../../lib/qr-menu/db';
import {getRestaurantAccess} from '../../../../../lib/auth/access';

type Context={params:Promise<{restaurant:string}>};
function slugify(v:string){return v.toLocaleLowerCase('tr-TR').replace(/ı/g,'i').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c').replace(/[^a-z0-9-]+/g,'-').replace(/^-+|-+$/g,'')}

export async function PATCH(request:NextRequest,{params}:Context){
 try{
  const{restaurant}=await params;
  const slug=slugify(restaurant);
  const access=await getRestaurantAccess(slug);
  if(!access)return NextResponse.json({error:'Yetkisiz erişim'},{status:403});
  const body=await request.json() as {orderedIds?:string[]};
  const orderedIds=Array.isArray(body.orderedIds)?body.orderedIds.filter(x=>/^\d+$/.test(String(x))):[];
  if(!orderedIds.length)return NextResponse.json({error:'Kategori sırası gerekli'},{status:400});
  const sql=getQrMenuDb();
  const rows=await sql`SELECT id FROM categories WHERE restaurant_id=${access.restaurantId}`;
  const valid=new Set((rows as any[]).map(x=>String(x.id)));
  if(orderedIds.some(id=>!valid.has(String(id))))return NextResponse.json({error:'Geçersiz kategori'},{status:400});
  for(let i=0;i<orderedIds.length;i++)await sql`UPDATE categories SET sort_order=${i+1} WHERE id=${Number(orderedIds[i])} AND restaurant_id=${access.restaurantId}`;
  return NextResponse.json({ok:true});
 }catch(e){console.error(e);return NextResponse.json({error:'Kategori sırası kaydedilemedi'},{status:500})}
}
