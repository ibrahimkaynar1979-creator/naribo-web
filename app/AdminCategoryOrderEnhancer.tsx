'use client';
import {useEffect} from 'react';

export default function AdminCategoryOrderEnhancer(){
 useEffect(()=>{
  if(!location.pathname.startsWith('/admin/'))return;
  let dragged:HTMLElement|null=null,busy=false;
  const slug=location.pathname.split('/')[2]||'';
  const ids=async()=>{try{const r=await fetch(`/api/qr-menu/${slug}`,{cache:'no-store'});if(!r.ok)return[];const j=await r.json();return (j.categories||[]).map((x:any)=>String(x.id))}catch{return[]}};
  const wire=async()=>{
   const list=document.querySelector<HTMLElement>('.qaCategoryList');
   if(!list||list.dataset.orderReady==='1')return;
   const categoryIds=await ids();
   const cards=[...list.children].filter((x):x is HTMLElement=>x instanceof HTMLElement);
   if(!categoryIds.length||cards.length!==categoryIds.length)return;
   list.dataset.orderReady='1';
   cards.forEach((card,i)=>{card.dataset.categoryId=categoryIds[i];card.draggable=true;card.classList.add('qaOrderCard');const handle=document.createElement('button');handle.type='button';handle.className='qaOrderHandle';handle.title='Sürükleyerek sırala';handle.setAttribute('aria-label','Kategoriyi sürükleyerek sırala');handle.innerHTML='⋮⋮';card.appendChild(handle);
    card.addEventListener('dragstart',e=>{if(busy){e.preventDefault();return}dragged=card;card.classList.add('dragging');e.dataTransfer?.setData('text/plain',card.dataset.categoryId||'');if(e.dataTransfer)e.dataTransfer.effectAllowed='move'});
    card.addEventListener('dragend',()=>{card.classList.remove('dragging');dragged=null;void save(list)});
    card.addEventListener('dragover',e=>{e.preventDefault();if(!dragged||dragged===card)return;const rect=card.getBoundingClientRect(),after=e.clientY>rect.top+rect.height/2;list.insertBefore(dragged,after?card.nextSibling:card)});
   });
   const save=async(el:HTMLElement)=>{if(busy)return;const orderedIds=[...el.querySelectorAll<HTMLElement>(':scope > [data-category-id]')].map(x=>x.dataset.categoryId!).filter(Boolean);busy=true;el.classList.add('savingOrder');try{const r=await fetch(`/api/qr-menu/${slug}/category-order`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({orderedIds})});if(!r.ok)throw new Error();el.classList.add('savedOrder');setTimeout(()=>el.classList.remove('savedOrder'),1200)}catch{alert('Kategori sırası kaydedilemedi. Sayfayı yenileyip tekrar deneyin.')}finally{busy=false;el.classList.remove('savingOrder')}};
  };
  void wire();const ob=new MutationObserver(()=>void wire());ob.observe(document.body,{childList:true,subtree:true});return()=>ob.disconnect();
 },[]);return null;
}
