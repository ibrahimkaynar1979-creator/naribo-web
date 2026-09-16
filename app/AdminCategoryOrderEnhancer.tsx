'use client';
import {useEffect} from 'react';

type Product={id:string;categoryId:string;name:string;description:string;price:number;image:string;allergens?:string[];isActive:boolean;sortOrder:number};

export default function AdminCategoryOrderEnhancer(){
 useEffect(()=>{
  if(!location.pathname.startsWith('/admin/'))return;
  let dragged:HTMLElement|null=null;
  let busy=false;
  let productBusy=false;
  const slug=location.pathname.split('/')[2]||'';

  const fetchData=async()=>{
   try{
    const r=await fetch(`/api/qr-menu/${slug}`,{cache:'no-store'});
    if(!r.ok)return null;
    return await r.json() as {categories?:{id:string}[];products?:Product[]};
   }catch{return null;}
  };

  const saveCategoryOrder=async(el:HTMLElement)=>{
   if(busy)return;
   const orderedIds=[...el.querySelectorAll<HTMLElement>(':scope > [data-category-id]')].map(x=>x.dataset.categoryId!).filter(Boolean);
   busy=true;
   el.classList.add('savingOrder');
   try{
    const r=await fetch(`/api/qr-menu/${slug}/category-order`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({orderedIds})});
    if(!r.ok)throw new Error();
    el.classList.add('savedOrder');
    setTimeout(()=>el.classList.remove('savedOrder'),1200);
   }catch{
    alert('Kategori sırası kaydedilemedi. Sayfayı yenileyip tekrar deneyin.');
   }finally{
    busy=false;
    el.classList.remove('savingOrder');
   }
  };

  const wireCategories=async()=>{
   const list=document.querySelector<HTMLElement>('.qaCategoryList');
   if(!list||list.dataset.orderReady==='1')return;
   const data=await fetchData();
   const categoryIds=(data?.categories||[]).map(x=>String(x.id));
   const cards=[...list.children].filter((x):x is HTMLElement=>x instanceof HTMLElement);
   if(!categoryIds.length||cards.length!==categoryIds.length)return;
   list.dataset.orderReady='1';
   cards.forEach((card,i)=>{
    card.dataset.categoryId=categoryIds[i];
    card.draggable=true;
    card.classList.add('qaOrderCard');
    const handle=document.createElement('button');
    handle.type='button';
    handle.className='qaOrderHandle';
    handle.title='Sürükleyerek sırala';
    handle.setAttribute('aria-label','Kategoriyi sürükleyerek sırala');
    handle.innerHTML='⋮⋮';
    card.appendChild(handle);
    card.addEventListener('dragstart',e=>{
     if(busy){e.preventDefault();return;}
     dragged=card;
     card.classList.add('dragging');
     e.dataTransfer?.setData('text/plain',card.dataset.categoryId||'');
     if(e.dataTransfer)e.dataTransfer.effectAllowed='move';
    });
    card.addEventListener('dragend',()=>{
     card.classList.remove('dragging');
     dragged=null;
     void saveCategoryOrder(list);
    });
    card.addEventListener('dragover',e=>{
     e.preventDefault();
     if(!dragged||dragged===card)return;
     const rect=card.getBoundingClientRect();
     const after=e.clientY>rect.top+rect.height/2;
     list.insertBefore(dragged,after?card.nextSibling:card);
    });
   });
  };

  const removeProductOrdering=(list:HTMLElement)=>{
   delete list.dataset.productOrderReady;
   list.querySelectorAll<HTMLElement>(':scope > .qaProductRow').forEach(card=>{
    card.draggable=false;
    delete card.dataset.productId;
    card.querySelector('.qaProductOrderHandle')?.remove();
   });
  };

  const saveProductOrder=async(list:HTMLElement,products:Product[])=>{
   if(productBusy)return;
   const orderedIds=[...list.querySelectorAll<HTMLElement>(':scope > .qaProductRow[data-product-id]')].map(x=>x.dataset.productId!).filter(Boolean);
   if(orderedIds.length!==products.length)return;
   const byId=new Map(products.map(p=>[String(p.id),p]));
   const next=orderedIds.map((id,i)=>({...byId.get(id)!,sortOrder:i+1}));
   if(next.some(x=>!x))return;
   productBusy=true;
   list.style.opacity='.72';
   try{
    const r=await fetch(`/api/qr-menu/${slug}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({products:next})});
    if(!r.ok)throw new Error();
    const notice=document.createElement('div');
    notice.textContent='Ürün sırası kaydedildi ✓';
    Object.assign(notice.style,{position:'fixed',right:'22px',bottom:'22px',zIndex:'120',background:'#1c9b5b',color:'#fff',padding:'11px 15px',borderRadius:'12px',fontSize:'11px',fontWeight:'850',boxShadow:'0 12px 30px rgba(0,0,0,.14)'});
    document.body.appendChild(notice);
    setTimeout(()=>notice.remove(),1300);
   }catch{
    alert('Ürün sırası kaydedilemedi. Sayfayı yenileyip tekrar deneyin.');
   }finally{
    productBusy=false;
    list.style.opacity='';
   }
  };

  const wireProducts=async()=>{
   const list=document.querySelector<HTMLElement>('.qaProductList');
   if(!list)return;
   const data=await fetchData();
   const products=data?.products||[];
   const cards=[...list.querySelectorAll<HTMLElement>(':scope > .qaProductRow')];
   if(!products.length||cards.length!==products.length){
    removeProductOrdering(list);
    return;
   }
   if(list.dataset.productOrderReady==='1')return;
   list.dataset.productOrderReady='1';
   cards.forEach((card,i)=>{
    const product=products[i];
    card.dataset.productId=String(product.id);
    card.draggable=true;
    card.style.position='relative';
    const handle=document.createElement('button');
    handle.type='button';
    handle.className='qaProductOrderHandle';
    handle.title='Ürünü sürükleyerek sırala';
    handle.setAttribute('aria-label','Ürünü sürükleyerek sırala');
    handle.textContent='⋮⋮';
    Object.assign(handle.style,{position:'absolute',right:'10px',top:'10px',width:'32px',height:'32px',border:'1px solid #eadfd7',borderRadius:'9px',background:'#fff',color:'#697680',fontSize:'16px',fontWeight:'900',cursor:'grab',zIndex:'6',display:'grid',placeItems:'center'});
    handle.addEventListener('click',e=>e.stopPropagation());
    card.appendChild(handle);
    card.addEventListener('dragstart',e=>{
     if(productBusy){e.preventDefault();return;}
     dragged=card;
     card.style.opacity='.58';
     card.style.transform='scale(.985)';
     e.dataTransfer?.setData('text/plain',card.dataset.productId||'');
     if(e.dataTransfer)e.dataTransfer.effectAllowed='move';
    });
    card.addEventListener('dragend',()=>{
     card.style.opacity='';
     card.style.transform='';
     dragged=null;
     void saveProductOrder(list,products);
    });
    card.addEventListener('dragover',e=>{
     e.preventDefault();
     if(!dragged||dragged===card)return;
     const rect=card.getBoundingClientRect();
     const after=e.clientY>rect.top+rect.height/2;
     list.insertBefore(dragged,after?card.nextSibling:card);
    });
   });
  };

  const wireAll=()=>{void wireCategories();void wireProducts();};
  wireAll();
  const ob=new MutationObserver(wireAll);
  ob.observe(document.body,{childList:true,subtree:true});
  return()=>ob.disconnect();
 },[]);
 return null;
}
