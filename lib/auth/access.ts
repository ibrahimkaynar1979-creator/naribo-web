import { auth } from './server';
import { getQrMenuDb } from '../qr-menu/db';

export type RestaurantAccess={userId:string;restaurantId:number;role:string};

export async function getRestaurantAccess(slug:string):Promise<RestaurantAccess|null>{
  const {data:session}=await auth.getSession();
  const userId=String(session?.user?.id||'');
  if(!userId)return null;
  const sql=getQrMenuDb();
  const rows=await sql`
    SELECT r.id AS restaurant_id,ru.role
    FROM restaurants r
    JOIN restaurant_users ru ON (ru.restaurant_id=r.id OR (ru.restaurant_id IS NULL AND ru.role='admin'))
    WHERE r.slug=${slug} AND ru.user_id=${userId}::uuid
    ORDER BY CASE WHEN ru.restaurant_id=r.id THEN 0 ELSE 1 END
    LIMIT 1
  `;
  const row=rows[0] as any|undefined;
  return row?{userId,restaurantId:Number(row.restaurant_id),role:String(row.role)}:null;
}
