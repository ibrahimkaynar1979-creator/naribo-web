'use server';

import { auth } from '../../../lib/auth/server';
import { getQrMenuDb } from '../../../lib/qr-menu/db';
import { redirect } from 'next/navigation';

export async function signInWithEmail(_prevState:{error:string}|null,formData:FormData){
  const email=String(formData.get('email')||'').trim().toLowerCase();
  const password=String(formData.get('password')||'');
  if(!email||!password)return {error:'E-posta ve şifre gerekli.'};

  const {error}=await auth.signIn.email({email,password});
  if(error)return {error:'E-posta veya şifre hatalı.'};

  const sql=getQrMenuDb();
  const rows=await sql`
    SELECT COALESCE(r.slug, (
      SELECT r2.slug FROM restaurants r2 WHERE r2.is_active=true ORDER BY r2.id LIMIT 1
    )) AS slug
    FROM neon_auth."user" u
    JOIN restaurant_users ru ON ru.user_id=u.id
    LEFT JOIN restaurants r ON r.id=ru.restaurant_id AND r.is_active=true
    WHERE lower(u.email)=lower(${email})
      AND (r.id IS NOT NULL OR (ru.restaurant_id IS NULL AND ru.role='admin'))
    ORDER BY CASE WHEN r.id IS NULL THEN 1 ELSE 0 END, r.id
    LIMIT 1
  `;

  const slug=String((rows[0] as any)?.slug||'');
  if(!slug)return {error:'Hesabınıza bağlı aktif bir restoran bulunamadı.'};
  redirect(`/admin/${slug}`);
}
