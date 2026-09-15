'use client';

import { useActionState, useState } from 'react';
import { signInWithEmail } from './actions';
import PhoneSignIn from './PhoneSignIn';

export default function SignIn(){
 const[state,action,pending]=useActionState(signInWithEmail,null);
 const[mode,setMode]=useState<'email'|'phone'>('email');
 return <main className="ptAuthPage">
  <section className="ptAuthCard">
   <div className="ptAuthEyebrow">PANELTAKİP · QR MENÜ</div>
   <h1>Yönetim Paneli</h1>
   <p className="ptAuthLead">Restoranınızı yönetmek için hesabınızla giriş yapın.</p>
   <div className="ptAuthTabs">
    <button type="button" className={mode==='email'?'active':''} onClick={()=>setMode('email')}>E-posta</button>
    <button type="button" className={mode==='phone'?'active':''} onClick={()=>setMode('phone')}>Telefon</button>
   </div>
   {mode==='email'?<form action={action} className="ptAuthForm">
    <label>E-posta<input name="email" type="email" required autoComplete="email" placeholder="ornek@restoran.com"/></label>
    <label>Şifre<input name="password" type="password" required autoComplete="current-password" placeholder="••••••••"/></label>
    {state?.error&&<p className="ptAuthError">{state.error}</p>}
    <button disabled={pending}>{pending?'Giriş yapılıyor…':'Giriş Yap'}</button>
   </form>:<PhoneSignIn/>}
   <p className="ptAuthFoot">Hesaplar PanelTakip tarafından yetkilendirilir.</p>
  </section>
  <style jsx global>{`
   .ptAuthPage{min-height:100vh;display:grid;place-items:center;background:#fbf7f1;padding:24px;font-family:Arial,sans-serif;color:#171717}
   .ptAuthCard{width:min(430px,100%);background:#fffdf9;border:1px solid #ece4da;border-radius:24px;padding:34px;box-shadow:0 18px 60px rgba(91,61,44,.08)}
   .ptAuthEyebrow{font-size:12px;font-weight:900;color:#e84f4a;letter-spacing:1.2px}.ptAuthCard h1{font-family:Georgia,serif;font-size:34px;margin:10px 0 8px}.ptAuthLead{font-size:14px;font-weight:600;line-height:1.5;color:#747474;margin:0 0 22px}
   .ptAuthTabs{display:grid;grid-template-columns:1fr 1fr;background:#f5eee7;border-radius:12px;padding:4px;margin-bottom:20px}.ptAuthTabs button{height:40px;border:0;border-radius:9px;background:transparent;color:#776c65;font-weight:800;cursor:pointer}.ptAuthTabs button.active{background:#fff;color:#171717;box-shadow:0 2px 8px rgba(80,55,40,.08)}
   .ptAuthForm{display:grid;gap:15px}.ptAuthForm label{display:grid;gap:7px;font-size:13px;font-weight:800}.ptAuthForm input{height:48px;border:1px solid #e7dcd3;border-radius:12px;padding:0 14px;font-size:15px;background:#fff;outline:none}.ptAuthForm input:focus{border-color:#f46861;box-shadow:0 0 0 3px rgba(244,104,97,.1)}
   .ptAuthForm>button:not(.ptLinkButton){width:100%;height:49px;border:0;border-radius:12px;background:#f46861;color:#fff;font-size:14px;font-weight:900;cursor:pointer}.ptAuthForm>button:disabled{opacity:.55;cursor:wait}.ptAuthForm small{font-size:11px;color:#8a817b;text-align:center}.ptAuthError{background:#fff0ee;color:#b83d37;padding:11px;border-radius:10px;font-size:13px;font-weight:700;margin:0}.ptSent{background:#f4f8f1;padding:12px;border-radius:11px;font-size:12px;color:#55644e}.ptLinkButton{border:0;background:transparent;color:#d9554e;font-weight:800;cursor:pointer}.ptAuthFoot{font-size:11px;color:#8a817b;text-align:center;margin:18px 0 0}
  `}</style>
 </main>
}
