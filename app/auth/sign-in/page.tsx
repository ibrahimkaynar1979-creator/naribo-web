'use client';

import { useActionState } from 'react';
import { signInWithEmail } from './actions';

export default function SignIn(){
 const[state,action,pending]=useActionState(signInWithEmail,null);
 return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#fbf7f1',padding:24,fontFamily:'Arial,sans-serif'}}>
  <form action={action} style={{width:'min(420px,100%)',background:'#fffdf9',border:'1px solid #ece4da',borderRadius:24,padding:34,boxShadow:'0 18px 60px rgba(91,61,44,.08)'}}>
   <div style={{fontSize:12,fontWeight:800,color:'#e84f4a',letterSpacing:1.2}}>PANELTAKİP · QR MENÜ</div>
   <h1 style={{fontFamily:'Georgia,serif',fontSize:34,margin:'10px 0 8px',color:'#171717'}}>Yönetim Paneli</h1>
   <p style={{fontSize:14,fontWeight:600,lineHeight:1.5,color:'#747474',margin:'0 0 26px'}}>Restoranınızı yönetmek için hesabınızla giriş yapın.</p>
   <label style={{display:'grid',gap:7,fontSize:13,fontWeight:800,marginBottom:16}}>E-posta<input name="email" type="email" required autoComplete="email" style={{height:48,border:'1px solid #e7dcd3',borderRadius:12,padding:'0 14px',fontSize:15}}/></label>
   <label style={{display:'grid',gap:7,fontSize:13,fontWeight:800,marginBottom:18}}>Şifre<input name="password" type="password" required autoComplete="current-password" style={{height:48,border:'1px solid #e7dcd3',borderRadius:12,padding:'0 14px',fontSize:15}}/></label>
   {state?.error&&<div style={{background:'#fff0ee',color:'#b83d37',padding:11,borderRadius:10,fontSize:13,fontWeight:700,marginBottom:14}}>{state.error}</div>}
   <button disabled={pending} style={{width:'100%',height:49,border:0,borderRadius:12,background:'#f46861',color:'#fff',fontSize:14,fontWeight:800,cursor:'pointer'}}>{pending?'Giriş yapılıyor…':'Giriş Yap'}</button>
   <p style={{fontSize:11,color:'#8a817b',textAlign:'center',margin:'18px 0 0'}}>Hesaplar PanelTakip tarafından yetkilendirilir.</p>
  </form>
 </main>
}
