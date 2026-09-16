'use client';

import {FormEvent,useEffect,useState} from 'react';
import {authClient} from '../../../lib/auth/client';

export default function ResetPasswordPage(){
 const[token,setToken]=useState('');
 const[password,setPassword]=useState('');
 const[confirm,setConfirm]=useState('');
 const[show,setShow]=useState(false);
 const[busy,setBusy]=useState(false);
 const[error,setError]=useState('');
 const[success,setSuccess]=useState(false);

 useEffect(()=>{
  const params=new URLSearchParams(window.location.search);
  setToken(params.get('token')||'');
  if(params.get('error'))setError('Şifre bağlantısı geçersiz veya süresi dolmuş. Yeni bağlantı isteyin.');
 },[]);

 async function submit(e:FormEvent){
  e.preventDefault();
  setError('');
  if(!token){setError('Şifre bağlantısı geçersiz veya süresi dolmuş.');return;}
  if(password.length<8){setError('Şifreniz en az 8 karakter olmalı.');return;}
  if(password!==confirm){setError('Şifreler birbiriyle eşleşmiyor.');return;}
  setBusy(true);
  try{
   const result=await authClient.resetPassword({newPassword:password,token});
   if(result.error)throw new Error(result.error.message||'Şifre değiştirilemedi.');
   setSuccess(true);
  }catch(err){setError(err instanceof Error?err.message:'Şifre değiştirilemedi.');}
  finally{setBusy(false);}
 }

 return <main className="ptResetPage"><section className="ptResetCard">
  <div className="ptResetEyebrow">PANELTAKİP · QR MENÜ</div>
  <h1>Yeni Şifrenizi Belirleyin</h1>
  {success?<><p className="ptResetSuccess">Şifreniz başarıyla oluşturuldu.</p><a href="/auth/sign-in">Yönetim Paneline Giriş Yap</a></>:<form onSubmit={submit}>
   <label>Yeni şifre<span><input type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password" required/><button type="button" onClick={()=>setShow(v=>!v)}>{show?'Gizle':'Göster'}</button></span></label>
   <label>Yeni şifre tekrar<input type={show?'text':'password'} value={confirm} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password" required/></label>
   {error&&<p className="ptResetError">{error}</p>}
   <button className="ptResetPrimary" disabled={busy}>{busy?'Kaydediliyor…':'Şifreyi Kaydet'}</button>
   <a className="ptResetBack" href="/auth/sign-in">Giriş ekranına dön</a>
  </form>}
 </section><style jsx global>{`
 .ptResetPage{min-height:100vh;display:grid;place-items:center;padding:24px;background:#fbf7f1;font-family:Arial,sans-serif;color:#171717}.ptResetCard{width:min(430px,100%);background:#fffdf9;border:1px solid #ece4da;border-radius:24px;padding:34px;box-shadow:0 18px 60px rgba(91,61,44,.08)}.ptResetEyebrow{font-size:12px;font-weight:900;color:#e84f4a;letter-spacing:1.2px}.ptResetCard h1{font-family:Georgia,serif;font-size:32px;margin:10px 0 22px}.ptResetCard form{display:grid;gap:15px}.ptResetCard label{display:grid;gap:7px;font-size:13px;font-weight:800}.ptResetCard input{width:100%;height:48px;box-sizing:border-box;border:1px solid #e7dcd3;border-radius:12px;padding:0 14px;font-size:15px;background:#fff;outline:none}.ptResetCard label span{position:relative;display:block}.ptResetCard label span input{padding-right:72px}.ptResetCard label span button{position:absolute;right:8px;top:50%;transform:translateY(-50%);height:32px;border:0;border-radius:8px;background:#f5eee7;color:#665d57;font-size:11px;font-weight:900}.ptResetPrimary,.ptResetCard>a{height:49px;border:0;border-radius:12px;background:#f46861;color:#fff;font-size:14px;font-weight:900;display:flex;align-items:center;justify-content:center;text-decoration:none}.ptResetPrimary:disabled{opacity:.55}.ptResetBack{background:transparent!important;color:#d9554e!important;height:auto!important;font-size:12px!important}.ptResetError{background:#fff0ee;color:#b83d37;padding:11px;border-radius:10px;font-size:12px;font-weight:700;margin:0}.ptResetSuccess{background:#eef7ef;color:#35633d;padding:13px;border-radius:11px;font-size:13px;font-weight:750;line-height:1.45;margin:0 0 14px}
 `}</style></main>
}
