'use client';

import {useEffect} from 'react';

type Range='7'|'30'|'90'|'all';
type Mood='all'|'positive'|'neutral'|'negative';

function parseTrDate(text:string){
 const m=text.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})[,\s]+(\d{1,2}):(\d{2})/);
 if(m)return new Date(+m[3],+m[2]-1,+m[1],+m[4],+m[5]);
 return null;
}
function ratingOf(article:HTMLElement){
 const stars=article.querySelector('span')?.textContent||'';
 return (stars.match(/★/g)||[]).length;
}
function daysOld(article:HTMLElement){
 const d=parseTrDate(article.querySelector('small')?.textContent||'');
 return d?Math.floor((Date.now()-d.getTime())/86400000):0;
}

export default function AdminFeedbackEnhancer(){
 useEffect(()=>{
  if(!location.pathname.startsWith('/admin/'))return;
  let cleanup:undefined|(()=>void);
  const enhance=()=>{
   const list=document.querySelector<HTMLElement>('.qaFeedbackList');
   if(!list||list.dataset.feedbackPremium==='1')return;
   list.dataset.feedbackPremium='1';
   const page=list.closest<HTMLElement>('.qaPage');if(!page)return;
   page.classList.add('qaFeedbackPremiumPage');
   const articles=[...list.querySelectorAll<HTMLElement>('article')];
   const state:{range:Range;mood:Mood;q:string;sort:'new'|'old'|'high'|'low'}={range:'30',mood:'all',q:'',sort:'new'};
   const controls=document.createElement('div');controls.className='qaFbControls';
   controls.innerHTML=`<div class="qaFbRange"><button data-range="7">Son 7 Gün</button><button data-range="30" class="active">Son 30 Gün</button><button data-range="90">Son 3 Ay</button><button data-range="all">Tümü</button></div><div class="qaFbTools"><input type="search" placeholder="Yorumlarda ara…" aria-label="Yorumlarda ara"><select aria-label="Sırala"><option value="new">En Yeni</option><option value="old">En Eski</option><option value="high">Puan: Yüksek</option><option value="low">Puan: Düşük</option></select></div><div class="qaFbMood"><button data-mood="all" class="active">Tümü</button><button data-mood="positive">Olumlu</button><button data-mood="neutral">Nötr</button><button data-mood="negative">Olumsuz</button></div>`;
   list.before(controls);
   const side=document.createElement('aside');side.className='qaFbSide';page.append(side);
   const render=()=>{
    const maxDays=state.range==='all'?Infinity:+state.range;
    let visible=articles.filter(a=>{const r=ratingOf(a),m=r>=4?'positive':r===3?'neutral':'negative',text=(a.textContent||'').toLocaleLowerCase('tr-TR');return daysOld(a)<=maxDays&&(state.mood==='all'||m===state.mood)&&(!state.q||text.includes(state.q))});
    visible.sort((a,b)=>{if(state.sort==='high'||state.sort==='low'){const x=ratingOf(a)-ratingOf(b);return state.sort==='high'?-x:x}const x=daysOld(a)-daysOld(b);return state.sort==='new'?x:-x});
    articles.forEach(a=>a.style.display='none');visible.forEach(a=>{a.style.display='';list.append(a)});
    const ratings=visible.map(ratingOf),count=ratings.length,avg=count?ratings.reduce((a,b)=>a+b,0)/count:0,pos=ratings.filter(x=>x>=4).length,neu=ratings.filter(x=>x===3).length,neg=ratings.filter(x=>x<=2).length;
    const dist=[5,4,3,2,1].map(n=>({n,c:ratings.filter(x=>x===n).length}));
    side.innerHTML=`<section><h2>⭐ Puan Dağılımı</h2>${dist.map(x=>`<div class="qaFbBar"><span>${x.n} yıldız</span><b>${x.c}</b><i><em style="width:${count?Math.round(x.c/count*100):0}%"></em></i><small>%${count?Math.round(x.c/count*100):0}</small></div>`).join('')}</section><section class="qaFbInfo"><h2>💬 Misafir Yorumları Hakkında</h2><p>Bu yorumlar restoranınızda QR menü üzerinden misafirleriniz tarafından gönderilir.</p><p>✓ Yorumları düzenli olarak takip edin.</p><p>✓ Olumsuz yorumları hızlı ve çözüm odaklı değerlendirin.</p><p>✓ Misafir geri bildirimlerini menü kalitenizi artırmak için kullanın.</p></section><section class="qaFbTip"><h2>💡 İpucu</h2><p>Misafirlerinizin geri bildirimleri hizmetinizi geliştirmek için en değerli kaynaklardan biridir.</p></section>`;
    page.dataset.fbCount=String(count);page.dataset.fbAvg=avg?avg.toFixed(1):'—';page.dataset.fbPositive=String(pos);page.dataset.fbNegative=String(neg);page.dataset.fbNeutral=String(neu);
   };
   controls.querySelectorAll<HTMLButtonElement>('[data-range]').forEach(b=>b.onclick=()=>{controls.querySelectorAll('[data-range]').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.range=b.dataset.range as Range;render()});
   controls.querySelectorAll<HTMLButtonElement>('[data-mood]').forEach(b=>b.onclick=()=>{controls.querySelectorAll('[data-mood]').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.mood=b.dataset.mood as Mood;render()});
   const input=controls.querySelector<HTMLInputElement>('input')!;input.oninput=()=>{state.q=input.value.toLocaleLowerCase('tr-TR');render()};
   const select=controls.querySelector<HTMLSelectElement>('select')!;select.onchange=()=>{state.sort=select.value as typeof state.sort;render()};
   render();cleanup=()=>controls.remove();
  };
  enhance();const ob=new MutationObserver(enhance);ob.observe(document.body,{childList:true,subtree:true});return()=>{ob.disconnect();cleanup?.()};
 },[]);
 return null;
}
