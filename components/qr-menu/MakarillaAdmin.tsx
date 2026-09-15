'use client';

import { ExternalLink, Eye, EyeOff, Plus, Save, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { QrMenuCategory, QrMenuProduct, QrMenuRestaurant } from '../../lib/qr-menu/types';
import { makarillaRestaurant } from '../../lib/qr-menu/makarilla';
import './makarilla-admin.css';

const cloneRestaurant = (): QrMenuRestaurant => JSON.parse(JSON.stringify(makarillaRestaurant));

export function MakarillaAdmin() {
  const [data, setData] = useState<QrMenuRestaurant>(cloneRestaurant);
  const [activeCategory, setActiveCategory] = useState('pastas');
  const [saved, setSaved] = useState(false);

  const products = useMemo(() => data.products.filter(p => p.categoryId === activeCategory).sort((a,b)=>a.sortOrder-b.sortOrder), [data.products, activeCategory]);

  const updateProduct = (id: string, patch: Partial<QrMenuProduct>) => {
    setSaved(false);
    setData(prev => ({ ...prev, products: prev.products.map(p => p.id === id ? { ...p, ...patch } : p) }));
  };

  const updateCategory = (id: string, patch: Partial<QrMenuCategory>) => {
    setSaved(false);
    setData(prev => ({ ...prev, categories: prev.categories.map(c => c.id === id ? { ...c, ...patch } : c) }));
  };

  const addProduct = () => {
    const now = Date.now();
    const next: QrMenuProduct = { id:`urun-${now}`, categoryId:activeCategory, name:'Yeni Ürün', description:'Ürün açıklaması', price:0, image:'/makarilla_tabak.png', isActive:true, sortOrder:data.products.length+1 };
    setData(prev => ({ ...prev, products:[...prev.products, next] }));
    setSaved(false);
  };

  const deleteProduct = (id: string) => {
    if (!window.confirm('Bu ürünü silmek istiyor musunuz?')) return;
    setData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
    setSaved(false);
  };

  const save = () => {
    localStorage.setItem('makarilla-qr-menu-draft', JSON.stringify(data));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return <main className="mk-admin-shell">
    <header className="mk-admin-topbar">
      <div><span className="mk-admin-kicker">PANELTAKİP QR MENÜ</span><h1>Makarilla Yönetim Paneli</h1></div>
      <div className="mk-admin-top-actions"><button className="mk-admin-ghost" onClick={()=>window.open('/menu/makarilla?view=menu','_blank')}><ExternalLink/> Menüyü Gör</button><button className="mk-admin-save" onClick={save}><Save/> {saved ? 'Kaydedildi' : 'Değişiklikleri Kaydet'}</button></div>
    </header>

    <div className="mk-admin-layout">
      <aside className="mk-admin-sidebar">
        <div className="mk-admin-brand"><img src="/makarilla-menu-logo.png" alt="Makarilla"/><span>Karşıyaka</span></div>
        <h3>Kategoriler</h3>
        {data.categories.sort((a,b)=>a.sortOrder-b.sortOrder).map(category => <button key={category.id} className={activeCategory===category.id?'active':''} onClick={()=>setActiveCategory(category.id)}><span>{category.name}</span><small>{data.products.filter(p=>p.categoryId===category.id).length}</small></button>)}
      </aside>

      <section className="mk-admin-content">
        <section className="mk-admin-card mk-admin-business">
          <div className="mk-admin-section-head"><div><span>İŞLETME BİLGİLERİ</span><h2>Restoran ayarları</h2></div></div>
          <div className="mk-admin-form-grid">
            <label>Restoran adı<input value={data.name} onChange={e=>setData({...data,name:e.target.value})}/></label>
            <label>Şube<input value={data.branch.name} onChange={e=>setData({...data,branch:{...data.branch,name:e.target.value}})}/></label>
            <label>Telefon<input value={data.branch.phone || ''} onChange={e=>setData({...data,branch:{...data.branch,phone:e.target.value}})} placeholder="0 232..."/></label>
            <label>Instagram<input value={data.branch.instagram || ''} onChange={e=>setData({...data,branch:{...data.branch,instagram:e.target.value}})} placeholder="https://instagram.com/..."/></label>
            <label className="wide">Adres<input value={data.branch.address} onChange={e=>setData({...data,branch:{...data.branch,address:e.target.value}})}/></label>
            <label>Çalışma saatleri<input value={data.branch.openingHours || ''} onChange={e=>setData({...data,branch:{...data.branch,openingHours:e.target.value}})}/></label>
            <label>Wi-Fi adı<input placeholder="Örn. Makarilla Guest"/></label>
            <label>Wi-Fi şifresi<input placeholder="Şifre"/></label>
            <label className="wide">IBAN<input placeholder="TR00 0000 0000 0000 0000 0000 00"/></label>
          </div>
        </section>

        <section className="mk-admin-card">
          <div className="mk-admin-section-head"><div><span>KATEGORİ</span><h2>{data.categories.find(c=>c.id===activeCategory)?.name}</h2></div><div className="mk-admin-category-tools"><button className="mk-admin-toggle" onClick={()=>updateCategory(activeCategory,{isActive:!data.categories.find(c=>c.id===activeCategory)?.isActive})}>{data.categories.find(c=>c.id===activeCategory)?.isActive ? <Eye/> : <EyeOff/>}{data.categories.find(c=>c.id===activeCategory)?.isActive ? 'Yayında' : 'Gizli'}</button><button className="mk-admin-add" onClick={addProduct}><Plus/> Ürün Ekle</button></div></div>

          <div className="mk-admin-products">
            {products.map(product => <article className="mk-admin-product" key={product.id}>
              <div className="mk-admin-product-image"><img src={product.image} alt=""/><label>Görsel URL<input value={product.image} onChange={e=>updateProduct(product.id,{image:e.target.value})}/></label></div>
              <div className="mk-admin-product-fields">
                <div className="mk-admin-product-row"><label>Ürün adı<input value={product.name} onChange={e=>updateProduct(product.id,{name:e.target.value})}/></label><label className="price">Fiyat<input type="number" value={product.price} onChange={e=>updateProduct(product.id,{price:Number(e.target.value)})}/></label></div>
                <label>Açıklama<textarea rows={2} value={product.description} onChange={e=>updateProduct(product.id,{description:e.target.value})}/></label>
                <label>Alerjenler<input value={(product.allergens||[]).join(', ')} onChange={e=>updateProduct(product.id,{allergens:e.target.value.split(',').map(x=>x.trim()).filter(Boolean)})} placeholder="Gluten, Süt"/></label>
                <div className="mk-admin-product-actions"><button className={product.isActive?'active':''} onClick={()=>updateProduct(product.id,{isActive:!product.isActive})}>{product.isActive ? <Eye/> : <EyeOff/>}{product.isActive?'Yayında':'Gizli'}</button><button className="danger" onClick={()=>deleteProduct(product.id)}><Trash2/> Sil</button></div>
              </div>
            </article>)}
          </div>
        </section>
      </section>
    </div>
  </main>;
}
