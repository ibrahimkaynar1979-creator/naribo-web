'use client';

import { useState } from 'react';

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
  try{
   const response=await fetch('/api/auth/request-password-reset',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});
   const result=await response.json();
   if(!response.ok)setError(result.error||'Şifre oluşturma bağlantısı gönderilemedi.');
   else setNotice('E-postanıza şifre oluşturma bağlantısı gönderdik. Gelen bağlantıdan yeni şifrenizi belirleyebilirsiniz.');
  }catch{
   setError('Şifre oluşturma bağlantısı gönderilemedi.');
  }
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
