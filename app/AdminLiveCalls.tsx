'use client';

import {useEffect,useMemo,useRef,useState} from 'react';
import {Bell,Check,Clock3,Volume2,X} from 'lucide-react';
import './admin-live-calls.css';

type Call={id:string;tableNo:string;note:string;status:string;createdAt:string;resolvedAt?:string};
type ApiData={calls:Call[];stats:{pendingCalls:number}};

function ago(v:string){
 const ms=Date.now()-new Date(v).getTime();
 const m=Math.max(0,Math.floor(ms/60000));
 if(m<1)return 'Şimdi';
 if(m<60)return `${m} dk önce`;
 const h=Math.floor(m/60);
 return h<24?`${h} sa önce`:`${Math.floor(h/24)} gün önce`;
}
function slugFromPath(){
 const m=location.pathname.match(/^\/admin\/([^/?#]+)/);
 return m?.[1]||'';
}

export default function AdminLiveCalls(){
 const[slug,setSlug]=useState('');
 const[calls,setCalls]=useState<Call[]>([]);
 const[open,setOpen]=useState(false);
 const[toast,setToast]=useState<Call|null>(null);
 const[permission,setPermission]=useState<NotificationPermission|'unsupported'>(()=>typeof Notification==='undefined'?'unsupported':Notification.permission);
 const seen=useRef<Set<string>|null>(null);
 const busy=useRef(false);
 const pending=useMemo(()=>calls.filter(c=>c.status==='pending'),[calls]);

 useEffect(()=>{
  const update=()=>setSlug(slugFromPath());
  update();
  const id=setInterval(update,1500);
  return()=>clearInterval(id);
 },[]);

 useEffect(()=>{
  if(!slug)return;
  let dead=false;
  const syncBadges=(n:number)=>{
   document.querySelectorAll<HTMLElement>('.qaBell i,.qaSide button em').forEach(el=>{
    if(n>0){el.textContent=String(n);el.style.display='';}
    else el.style.display='none';
   });
  };
  const poll=async(first=false)=>{
   if(busy.current)return;
   busy.current=true;
   try{
    const r=await fetch(`/api/qr-menu/${slug}`,{cache:'no-store'});
    if(!r.ok)return;
    const d=await r.json() as ApiData;
    if(dead)return;
    const list=(d.calls||[]).filter(c=>c.status==='pending').sort((a,b)=>+new Date(b.createdAt)-+new Date(a.createdAt));
    setCalls(d.calls||[]);
    syncBadges(list.length);
    const ids=new Set(list.map(c=>c.id));
    if(seen.current===null||first){seen.current=ids;return;}
    const fresh=list.filter(c=>!seen.current!.has(c.id));
    seen.current=ids;
    if(fresh.length){
     const newest=fresh[0];
     setToast(newest);
     setTimeout(()=>setToast(null),9000);
     if(typeof Notification!=='undefined'&&Notification.permission==='granted'){
      const body=newest.note?`Masa ${newest.tableNo} · ${newest.note}`:`Masa ${newest.tableNo}`;
      new Notification('Yeni Garson Çağrısı',{body,tag:`waiter-${newest.id}`});
     }
    }
   }catch{
   }finally{
    busy.current=false;
   }
  };
  void poll(true);
  const id=setInterval(()=>void poll(),5000);
  const onFocus=()=>void poll();
  window.addEventListener('focus',onFocus);
  return()=>{
   dead=true;
   clearInterval(id);
   window.removeEventListener('focus',onFocus);
  };
 },[slug]);

 const resolve=async(id:string)=>{
  try{
   const r=await fetch(`/api/qr-menu/${slug}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'resolveCall',id})});
   if(!r.ok)throw new Error();
   setCalls(x=>x.map(c=>c.id===id?{...c,status:'resolved',resolvedAt:new Date().toISOString()}:c));
   setToast(t=>t?.id===id?null:t);
  }catch{
   alert('Çağrı tamamlanamadı. Tekrar deneyin.');
  }
 };
 const enable=async()=>{
  if(typeof Notification==='undefined')return;
  const p=await Notification.requestPermission();
  setPermission(p);
 };
 if(!slug)return null;
 return <>
  <button className={`alcFab ${pending.length?'has':''}`} onClick={()=>setOpen(v=>!v)} aria-label="Canlı garson çağrıları"><Bell/>{pending.length>0&&<b>{pending.length}</b>}</button>
  {toast&&<div className="alcToast"><div className="alcToastIcon"><Bell/></div><div><small>YENİ GARSON ÇAĞRISI</small><strong>Masa {toast.tableNo}</strong><span>{toast.note||'Garson talep edildi.'}</span></div><button onClick={()=>resolve(toast.id)}><Check/> Tamamlandı</button><button className="close" onClick={()=>setToast(null)}><X/></button></div>}
  {open&&<div className="alcDrawer"><header><div><small>CANLI</small><h2>Garson Çağrıları</h2><p>5 saniyede bir otomatik yenilenir.</p></div><button className="alcClose" onClick={()=>setOpen(false)}><X/></button></header>{permission==='default'&&<button className="alcNotify" onClick={enable}><Volume2/> Tarayıcı bildirimlerini aç</button>}{permission==='denied'&&<div className="alcDenied">Tarayıcı bildirimleri kapalı. Çağrılar panel içinde görünmeye devam eder.</div>}<div className="alcList">{pending.length?pending.map(c=><article key={c.id}><div className="alcTable">{c.tableNo}</div><div><strong>Masa {c.tableNo}</strong><span>{c.note||'Garson talep edildi.'}</span><small><Clock3/> {ago(c.createdAt)}</small></div><button onClick={()=>resolve(c.id)}><Check/> Tamamlandı</button></article>):<div className="alcEmpty"><Bell/><strong>Bekleyen çağrı yok</strong><span>Yeni çağrılar burada anında görünecek.</span></div>}</div></div>}
 </>;
}
