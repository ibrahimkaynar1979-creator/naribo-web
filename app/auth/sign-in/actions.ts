'use server';

import { auth } from '../../../lib/auth/server';
import { redirect } from 'next/navigation';

export async function signInWithEmail(_prevState:{error:string}|null,formData:FormData){
  const email=String(formData.get('email')||'').trim();
  const password=String(formData.get('password')||'');
  if(!email||!password)return {error:'E-posta ve şifre gerekli.'};
  const {error}=await auth.signIn.email({email,password});
  if(error)return {error:'E-posta veya şifre hatalı.'};
  redirect('/admin/makarilla');
}
