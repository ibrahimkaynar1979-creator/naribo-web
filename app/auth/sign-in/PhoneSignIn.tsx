'use client';

import { FormEvent, useState } from 'react';
import { authClient } from '../../../lib/auth/client';

function normalizeTrPhone(raw:string){
  const digits=raw.replace(/\D/g,'');
  if(digits.startsWith('90')) return `+${digits}`;
  if(digits.startsWith('0')) return `+90${digits.slice(1)}`;
  return `+90${digits}`;
}

export default function PhoneSignIn(){
  const [phone,setPhone]=useState('');
  const [code,setCode]=useState('');
  const [sent,setSent]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');

  async function send(e:FormEvent){
    e.preventDefault(); setError(''); setBusy(true);
    try{
      const phoneNumber=normalizeTrPhone(phone);
      if(!/^\+[1-9]\d{9,14}$/.test(phoneNumber)) throw new Error('Geçerli bir telefon numarası girin.');
      const result=await authClient.phoneNumber.sendOtp({phoneNumber});
      if(result.error) throw new Error(result.error.message||'Kod gönderilemedi.');
      setSent(true);
    }catch(err){setError(err instanceof Error?err.message:'Kod gönderilemedi.');}
    finally{setBusy(false);}
  }

  async function verify(e:FormEvent){
    e.preventDefault(); setError(''); setBusy(true);
    try{
      const phoneNumber=normalizeTrPhone(phone);
      const result=await authClient.phoneNumber.verify({phoneNumber,code});
      if(result.error) throw new Error(result.error.message||'Kod doğrulanamadı.');
      window.location.href='/admin/makarilla';
    }catch(err){setError(err instanceof Error?err.message:'Kod doğrulanamadı.');}
    finally{setBusy(false);}
  }

  if(!sent) return <form onSubmit={send} className="ptAuthForm">
    <label>Telefon numarası<input value={phone} onChange={e=>setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="0532 000 00 00" required /></label>
    {error&&<p className="ptAuthError">{error}</p>}
    <button disabled={busy}>{busy?'Gönderiliyor…':'WhatsApp ile Kod Gönder'}</button>
    <small>6 haneli tek kullanımlık kod telefonunuza gönderilir.</small>
  </form>;

  return <form onSubmit={verify} className="ptAuthForm">
    <div className="ptSent">Kod <b>{phone}</b> numarasına gönderildi.</div>
    <label>6 haneli kod<input value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,'').slice(0,6))} inputMode="numeric" autoComplete="one-time-code" placeholder="000000" minLength={6} maxLength={6} required /></label>
    {error&&<p className="ptAuthError">{error}</p>}
    <button disabled={busy||code.length!==6}>{busy?'Kontrol ediliyor…':'Giriş Yap'}</button>
    <button type="button" className="ptLinkButton" onClick={()=>{setSent(false);setCode('');setError('')}}>Numarayı değiştir</button>
  </form>;
}
