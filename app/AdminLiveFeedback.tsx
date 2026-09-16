'use client';

import {useEffect,useRef,useState} from 'react';
import {MessageSquareText,Star,X} from 'lucide-react';
import './admin-live-feedback.css';

type Feedback={id:string;rating:number;comment:string;customerName:string;createdAt:string};
type ApiData={feedback:Feedback[]};
function slugFromPath(){const m=location.pathname.match(/^\/admin\/([^/?#]+)/);return m?.[1]||''}

export default function AdminLiveFeedback(){
 const[slug,setSlug]=useState('');
 const[toast,setToast]=useState<Feedback|null>(null);
 const seen=useRef<Set<string>|null>(null);
 const busy=useRef(false);
 useEffect(()=>{const update=()=>setSlug(slugFromPath());update();const id=setInterval(update,1500);return()=>clearInterval(id)},[]);
 useEffect(()=>{if(!slug)return;let dead=false;const poll=async(first=false)=>{if(busy.current)return;busy.current=true;try{const r=await fetch(`/api/qr-menu/${slug}`,{cache:'no-store'});if(!r.ok)return;const d=await r.json() as ApiData;if(dead)return;const items=(d.feedback||[]).sort((a,b)=>+new Date(b.createdAt)-+new Date(a.createdAt));const ids=new Set(items.map(x=>x.id));if(seen.current===null||first){seen.current=ids;return}const fresh=items.filter(x=>!seen.current!.has(x.id));seen.current=ids;if(fresh.length){const newest=fresh[0];setToast(newest);setTimeout(()=>setToast(null),9000)}}catch{}finally{busy.current=false}};void poll(true);const id=setInterval(()=>void poll(),7000);const onFocus=()=>void poll();window.addEventListener('focus',onFocus);return()=>{dead=true;clearInterval(id);window.removeEventListener('focus',onFocus)}},[slug]);
 if(!slug||!toast)return null;
 return <div className="alfToast"><div className="alfIcon"><MessageSquareText/></div><div><small>YENİ QR GERİ BİLDİRİMİ</small><strong>{toast.customerName||'Misafir'} · {toast.rating}/5</strong><span className="alfStars">{Array.from({length:5},(_,i)=><Star key={i} className={i<toast.rating?'on':''}/>)}</span><p>{toast.comment||'Yorum bırakılmadı.'}</p></div><button onClick={()=>setToast(null)}><X/></button></div>
}
