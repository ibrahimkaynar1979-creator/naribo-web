'use client';

import { useEffect } from 'react';

const TARGETS:[string,string][]=[
  ['Görsel URL','Ürün Fotoğrafı'],
  ['Logo URL','Restoran Logosu'],
  ['Kapak Görseli URL','Kapak Görseli']
];

function compressImage(file:File):Promise<string>{
  return new Promise((resolve,reject)=>{
    if(!file.type.startsWith('image/')){reject(new Error('Lütfen bir fotoğraf seçin.'));return}
    if(file.size>12*1024*1024){reject(new Error('Fotoğraf en fazla 12 MB olabilir.'));return}
    const reader=new FileReader();
    reader.onerror=()=>reject(new Error('Fotoğraf okunamadı.'));
    reader.onload=()=>{
      const img=new Image();
      img.onerror=()=>reject(new Error('Fotoğraf açılamadı.'));
      img.onload=()=>{
        const render=(max:number,quality:number)=>{
          const scale=Math.min(1,max/Math.max(img.width,img.height));
          const width=Math.max(1,Math.round(img.width*scale));
          const height=Math.max(1,Math.round(img.height*scale));
          const canvas=document.createElement('canvas');
          canvas.width=width;canvas.height=height;
          const ctx=canvas.getContext('2d');
          if(!ctx){reject(new Error('Fotoğraf işlenemedi.'));return}
          ctx.drawImage(img,0,0,width,height);
          const data=canvas.toDataURL('image/webp',quality);
          if(data.length>900000&&max>850){
            const scale2=Math.min(1,850/Math.max(img.width,img.height));
            canvas.width=Math.max(1,Math.round(img.width*scale2));
            canvas.height=Math.max(1,Math.round(img.height*scale2));
            const ctx2=canvas.getContext('2d');
            if(!ctx2){reject(new Error('Fotoğraf işlenemedi.'));return}
            ctx2.drawImage(img,0,0,canvas.width,canvas.height);
            resolve(canvas.toDataURL('image/webp',0.64));
            return;
          }
          resolve(data);
        };
        render(1200,0.78);
      };
      img.src=String(reader.result||'');
    };
    reader.readAsDataURL(file);
  });
}

function setReactInputValue(input:HTMLInputElement,value:string){
  const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value')?.set;
  setter?.call(input,value);
  input.dispatchEvent(new Event('input',{bubbles:true}));
  input.dispatchEvent(new Event('change',{bubbles:true}));
}

export default function AdminImageUploadEnhancer(){
  useEffect(()=>{
    if(!window.location.pathname.startsWith('/admin/'))return;

    const enhance=()=>{
      document.querySelectorAll<HTMLLabelElement>('label').forEach(label=>{
        if(label.dataset.ptUploadEnhanced==='1')return;
        const input=label.querySelector<HTMLInputElement>('input');
        if(!input||input.type!=='text')return;
        const text=(label.textContent||'').trim();
        const match=TARGETS.find(([needle])=>text.startsWith(needle));
        if(!match)return;

        label.dataset.ptUploadEnhanced='1';
        label.classList.add('ptUploadEnhanced');
        input.classList.add('ptHiddenUrlInput');

        const box=document.createElement('div');
        box.className='ptUploadBox';
        const title=document.createElement('b');
        title.textContent=match[1];
        const row=document.createElement('div');
        row.className='ptUploadRow';
        const preview=document.createElement('img');
        preview.className='ptUploadPreview';
        preview.alt='';
        if(input.value)preview.src=input.value;
        const button=document.createElement('button');
        button.type='button';
        button.className='ptUploadButton';
        button.textContent=input.value?'Fotoğrafı Değiştir':'Fotoğraf Yükle';
        const status=document.createElement('span');
        status.className='ptUploadStatus';
        status.textContent='JPG, PNG veya WEBP';
        const picker=document.createElement('input');
        picker.type='file';
        picker.accept='image/jpeg,image/png,image/webp';
        picker.className='ptUploadPicker';
        button.addEventListener('click',e=>{e.preventDefault();picker.click()});
        picker.addEventListener('change',async()=>{
          const file=picker.files?.[0];if(!file)return;
          button.disabled=true;status.textContent='Fotoğraf hazırlanıyor…';
          try{
            const data=await compressImage(file);
            setReactInputValue(input,data);
            preview.src=data;
            button.textContent='Fotoğrafı Değiştir';
            status.textContent='Hazır · Kaydettiğinizde menüye uygulanacak';
          }catch(err){status.textContent=err instanceof Error?err.message:'Fotoğraf yüklenemedi.'}
          finally{button.disabled=false;picker.value=''}
        });
        row.append(preview,button,picker);
        box.append(title,row,status);
        label.insertBefore(box,input);
      });
    };

    enhance();
    const observer=new MutationObserver(enhance);
    observer.observe(document.body,{childList:true,subtree:true});
    return()=>observer.disconnect();
  },[]);

  return <style jsx global>{`
    .ptUploadEnhanced{font-size:0!important;gap:0!important}
    .ptHiddenUrlInput{display:none!important}
    .ptUploadBox{display:flex;flex-direction:column;gap:8px;font-size:12px!important;font-weight:800;color:#1e1b19;margin:3px 0 12px}
    .ptUploadRow{display:flex;align-items:center;gap:10px}
    .ptUploadPreview{width:58px;height:58px;border-radius:12px;object-fit:cover;background:#fff5ef;border:1px solid #eadbd2}
    .ptUploadPreview:not([src]){display:none}
    .ptUploadButton{height:40px;padding:0 15px;border:1px solid #efc8bc;border-radius:11px;background:#fff5ef;color:#d9554e;font-size:11px;font-weight:900;cursor:pointer}
    .ptUploadButton:hover{background:#ffede6}
    .ptUploadButton:disabled{opacity:.55;cursor:wait}
    .ptUploadPicker{display:none!important}
    .ptUploadStatus{font-size:10px!important;font-weight:600;color:#786d67}
  `}</style>;
}
