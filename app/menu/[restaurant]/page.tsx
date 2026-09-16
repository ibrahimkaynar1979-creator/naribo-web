'use client';

import {useEffect,useMemo,useRef,useState} from 'react';
import {Bell,ChevronLeft,MapPin,MessageSquareMore,Phone,Search,Star,X} from 'lucide-react';
import './menu.css';

type Restaurant={id:string;slug:string;name:string;logo:string;cover:string;description:string;phone:string;address:string;instagram:string;wifiName:string;wifiPassword:string;directionsUrl:string;openingHours:Record<string,string>;themeColor:string};
type Category={id:string;name:string;sortOrder:number};
type Product={id:string;categoryId:string;name:string;description:string;price:number;image:string;allergens:string[];sortOrder:number};
type Payload={restaurant:Restaurant;categories:Category[];products:Product[]};
type Modal='product'|'feedback'|'service'|null;

export default function CustomerMenu({params}:{params:Promise<{restaurant:string}>}){
 const [slug,setSlug]=useState('');
 const [data,setData]=useState<Payload|null>(null);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const [active,setActive]=useState('all');
 const [search,setSearch]=useState('');
 const [modal,setModal]=useState<Modal>(null);
 const [selected,setSelected]=useState<Product|null>(null);
 const [rating,setRating]=useState(5);
 const [comment,setComment]=useState('');
 const [customerName,setCustomerName]=useState('');
 const [tableNo,setTableNo]=useState('');
 const [callNote,setCallNote]=useState('');
 const [sending,setSending]=useState(false);
 const [isPreview,setIsPreview]=useState(false);
 const viewed=useRef(false);
 useEffect(()=>{setIsPreview(new URLSearchParams(window.location.search).get('preview')==='1');params.then(p=>setSlug(p.restaurant))},[params]);
 useEffect(()=>{if(!slug)return;let alive=true;(async()=>{setLoading(true);try{const r=await fetch(`/api/menu/${slug}`,{cache:'no-store'});const j=await r.json();if(!r.ok)throw new Error(j.error||'Menü yüklenemedi');if(!alive)return;setData(j);setError('');const viewKey=`pt:menu:${slug}`;if(!isPreview&&!viewed.current&&!sessionStorage.getItem(viewKey)){viewed.current=true;sessionStorage.setItem(viewKey,'1');fetch(`/api/menu/${slug}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'menuView'})}).catch(()=>sessionStorage.removeItem(viewKey))}}catch(e){if(alive)setError(e instanceof Error?e.message:'Menü yüklenemedi')}finally{if(alive)setLoading(false)}})();return()=>{alive=false}},[slug,isPreview]);
 const products=useMemo(()=>{if(!data)return[];const q=search.trim().toLocaleLowerCase('tr-TR');return data.products.filter(p=>(active==='all'||p.categoryId===active)&&(!q||`${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(q)))},[data,active,search]);
 const openProduct=(p:Product)=>{setSelected(p);setModal('product');if(!isPreview){const key=`pt:product:${slug}:${p.id}`;if(!sessionStorage.getItem(key)){sessionStorage.setItem(key,'1');fetch(`/api/menu/${slug}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'productView',productId:p.id})}).catch(()=>sessionStorage.removeItem(key))}}};
 const sendFeedback=async()=>{if(!data||sending||isPreview)return;setSending(true);try{const r=await fetch(`/api/menu/${slug}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'feedback',rating,comment,customerName})});const j=await r.json();if(!r.ok)throw new Error(j.error||'Gönderilemedi');setModal(null);setComment('');setCustomerName('');setRating(5);alert('Teşekkürler. Geri bildiriminiz alındı.')}catch(e){alert(e instanceof Error?e.message:'Gönderilemedi')}finally{setSending(false)}};
 const sendCall=async()=>{if(!tableNo.trim()||sending||isPreview)return;setSending(true);try{const r=await fetch(`/api/menu/${slug}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'serviceCall',tableNo,note:callNote})});const j=await r.json();if(!r.ok)throw new Error(j.error||'Çağrı gönderilemedi');setModal(null);setTableNo('');setCallNote('');alert(j.duplicate?'Garson çağrınız zaten iletilmiş.':'Garson çağrınız iletildi.')}catch(e){alert(e instanceof Error?e.message:'Çağrı gönderilemedi')}finally{setSending(false)}};
 if(loading)return <main className="cmState">Menü yükleniyor…</main>;
 if(error||!data)return <main className="cmState"><b>Menü açılamadı</b><span>{error||'Restoran bulunamadı.'}</span></main>;
 const r=data.restaurant;
 return <main className="cm" style={{'--brand':r.themeColor||'#f46861'} as React.CSSProperties}>
  <section className="cmHero" style={r.cover?{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.64)),url(${r.cover})`}:{}}>
   <div className="cmHeroTop"><button onClick={()=>history.back()}><ChevronLeft/></button><span>{isPreview?'ÖNİZLEME':'QR MENÜ'}</span></div>
   <div className="cmBrand">{r.logo?<img src={r.logo} alt={`${r.name} logo`}/>:<div className="cmLogoFallback">{r.name.slice(0,1)}</div>}<div><h1>{r.name}</h1><p>{r.description||'Dijital menümüze hoş geldiniz.'}</p></div></div>
   <div className="cmMeta">{r.address&&<span><MapPin/> {r.address}</span>}{r.phone&&<a href={`tel:${r.phone.replace(/\s/g,'')}`}><Phone/> Ara</a>}{r.directionsUrl&&<a href={r.directionsUrl} target="_blank" rel="noreferrer"><MapPin/> Yol Tarifi</a>}</div>
  </section>
  <section className="cmToolbar"><div className="cmSearch"><Search/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Menüde ara…"/></div><div className="cmQuick"><button onClick={()=>setModal('feedback')}><MessageSquareMore/> Geri Bildirim</button><button onClick={()=>setModal('service')}><Bell/> Garson Çağır</button></div></section>
  {isPreview&&<div style={{maxWidth:1080,margin:'8px auto',padding:'0 18px',fontSize:11,fontWeight:800,color:'#a35b45'}}>Önizleme modu: görüntülenme, ürün inceleme, geri bildirim ve garson çağrısı istatistiklere yazılmaz.</div>}
  <nav className="cmCats"><button className={active==='all'?'active':''} onClick={()=>setActive('all')}>Tümü</button>{data.categories.map(c=><button key={c.id} className={active===c.id?'active':''} onClick={()=>setActive(c.id)}>{c.name}</button>)}</nav>
  <section className="cmGrid">{products.map(p=><article key={p.id} onClick={()=>openProduct(p)}>{p.image?<img src={p.image} alt={p.name}/>:<div className="cmNoImg">🍽️</div>}<div className="cmProductBody"><div><h2>{p.name}</h2><p>{p.description}</p></div><strong>{p.price.toLocaleString('tr-TR')} TL</strong></div>{p.allergens?.length>0&&<small>{p.allergens.join(' · ')}</small>}</article>)}{!products.length&&<div className="cmEmpty">Aramanıza uygun ürün bulunamadı.</div>}</section>
  <footer className="cmFooter"><span>paneltakip · QR Menü</span><small>Menü bilgileri restoran tarafından güncellenir.</small></footer>
  {modal&&<div className="cmModalBackdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(null)}}><div className="cmModal"><button className="cmClose" onClick={()=>setModal(null)}><X/></button>{modal==='product'&&selected&&<><div className="cmModalImg">{selected.image?<img src={selected.image} alt={selected.name}/>:<div>🍽️</div>}</div><h3>{selected.name}</h3><p>{selected.description}</p><strong>{selected.price.toLocaleString('tr-TR')} TL</strong>{selected.allergens?.length>0&&<small>Alerjenler: {selected.allergens.join(', ')}</small>}</>}{modal==='feedback'&&<><h3>Geri Bildirim</h3><p>{isPreview?'Önizleme modunda geri bildirim gönderilmez.':'Deneyiminizi bizimle paylaşın.'}</p><div className="cmStars">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setRating(n)} className={n<=rating?'active':''}><Star/></button>)}</div><input value={customerName} onChange={e=>setCustomerName(e.target.value)} placeholder="Adınız (isteğe bağlı)"/><textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Yorumunuz"/><button className="cmPrimary" onClick={sendFeedback} disabled={sending||isPreview}>{isPreview?'Önizleme Modu':sending?'Gönderiliyor…':'Gönder'}</button></>}{modal==='service'&&<><h3>Garson Çağır</h3><p>{isPreview?'Önizleme modunda çağrı gönderilmez.':'Masa numaranızı girin, çağrınızı ekibe iletelim.'}</p><input value={tableNo} onChange={e=>setTableNo(e.target.value)} placeholder="Masa numarası"/><textarea value={callNote} onChange={e=>setCallNote(e.target.value)} placeholder="Not (isteğe bağlı)"/><button className="cmPrimary" onClick={sendCall} disabled={sending||!tableNo.trim()||isPreview}>{isPreview?'Önizleme Modu':sending?'Gönderiliyor…':'Garson Çağır'}</button></>}</div></div>}
 </main>
}
