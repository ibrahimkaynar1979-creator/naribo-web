'use client';

import { useState } from 'react';
import { ChevronRight, Heart, Home, List, MessageCircle, Search, Utensils } from 'lucide-react';
import type { QrMenuRestaurant } from '../../lib/qr-menu/types';
import './makarilla-reference-home.css';

export function MakarillaReferenceHome({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = restaurant.categories.filter(c => c.isActive).sort((a,b)=>a.sortOrder-b.sortOrder);
  const products = restaurant.products.filter(p=>p.isActive).sort((a,b)=>a.sortOrder-b.sortOrder);
  const hero = products[0];
  const filtered = activeCategory === 'all' ? products : products.filter(p=>p.categoryId===activeCategory);
  const popular = filtered.slice(0,4);

  return <main className="mk-stage">
    <section className="mk-phone">
      <div className="mk-page">
        <header className="mk-header">
          <div className="mk-brand-avatar">
            {restaurant.logo ? <img src={restaurant.logo} alt={restaurant.name}/> : <span>M</span>}
          </div>
          <div className="mk-brand-copy">
            <strong>{restaurant.name}</strong>
            <small>{restaurant.tagline}</small>
          </div>
          <button className="mk-heart" aria-label="Favoriler"><Heart size={20}/></button>
        </header>

        <label className="mk-search">
          <Search size={18}/>
          <input placeholder="Menüde ara..." />
        </label>

        <div className="mk-tabs">
          <button className={activeCategory==='all'?'is-active':''} onClick={()=>setActiveCategory('all')}>Popüler</button>
          {categories.slice(0,5).map(c=><button key={c.id} className={activeCategory===c.id?'is-active':''} onClick={()=>setActiveCategory(c.id)}>{c.name}</button>)}
        </div>

        {hero && <section className="mk-hero">
          <div className="mk-hero-copy">
            <span>MAKARİLLA</span>
            <h1>GERÇEK<br/>İTALYAN<br/>LEZZETİ.</h1>
            <p>{hero.name}<br/><b>Şimdi keşfet →</b></p>
          </div>
          <img src={hero.image} alt={hero.name}/>
        </section>}

        <section className="mk-products">
          <div className="mk-section-title">
            <h2>Popüler Ürünler</h2>
            <button>Tümünü Gör <ChevronRight size={15}/></button>
          </div>
          <div className="mk-grid">
            {popular.map(p=><button className="mk-card" key={p.id}>
              <img src={p.image} alt={p.name}/>
              <div className="mk-card-body">
                <strong>{p.name}</strong>
                <p>{p.description}</p>
                <b>₺{p.price}</b>
              </div>
            </button>)}
          </div>
        </section>
      </div>

      <nav className="mk-bottom-nav">
        <button className="is-active"><Home size={20}/><span>Ana Sayfa</span></button>
        <button><List size={20}/><span>Menü</span></button>
        <button><Utensils size={20}/><span>Garson</span></button>
        <button><MessageCircle size={20}/><span>İletişim</span></button>
      </nav>
    </section>
  </main>;
}
