'use client';

import { useState } from 'react';
import { authClient } from '../../../lib/auth/client';

export default function ForgotPasswordFlow({onBack}:{onBack:()=>void}){
 const[busy,setBusy]=useState(false);
 const[error,setError]=useState('');
 const[notice,setNotice]=useState('');
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  setBusy(true);setError('');setNotice('');
  const form=new FormData(e.currentTarget);
  const email=String(form.get('email')||'').trim();
  if(!email){setError('E-posta adresinizi yazın.');setBusy(false);return}
  const redirectTo=`${window.location.origin}/auth/reset-password`;
  const {error:authError}=await authClient.requestPasswordReset({email,redirectTo});
  if(authError)setError(authError.message||'Şifre oluşturma bağlantısı gönderilemedi.');
  else setNotice('E-postanıza şifre oluşturma bağlantısı gönderdik. Gelen bağlantıdan yeni şifrenizi belirleyebilirsiniz.');
  setBusy(false);
 }
 return <form className="ptAuthForm" onSubmit={submit}>
  <label>E-posta<input name="email" type="email" required autoComplete="email" placeholder="ornek@restoran.com"/></label>
  {error&&<p className="ptAuthError">{error}</p>}
  {notice&&<p className="ptAuthSuccess">{notice}</p>}
  <button disabled={busy}>{busy?'Gönderiliyor…':'Şifre Oluşturma Bağlantısı Gönder'}</button>
  <button type="button" className="ptForgotLink" onClick={onBack}>Giriş ekranına dön</button>
 </form>
}
