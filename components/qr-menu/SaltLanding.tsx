'use client';

import { BellRing, ChevronDown, Clock3, Home, Info, MessageCircle, Utensils, X } from 'lucide-react';
import { useState } from 'react';
import type { QrMenuRestaurant } from '../../lib/qr-menu/types';
import './salt-landing.css';

type Modal = null | 'waiter' | 'feedback' | 'success';

export function SaltLanding({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const [modal, setModal] = useState<Modal>(null);
  const [table, setTable] = useState('');
  const [rating, setRating] = useState(0);
  const hero = restaurant.coverImage || restaurant.products.find(p => p.isFeatured && p.isActive)?.image || restaurant.products.find(p => p.isActive)?.image;

  const openMenu = () => {
    window.location.href = '/menu/salt?view=menu';
  };

  return <main className="salt-landing-stage">
    <section className="salt-landing">
      <header className="salt-topbar">
        <div className="salt-wordmark" aria-label="SALT Fried Chicken">
          <strong>SALT</strong>
          <small>FRIED CHICKEN</small>
        </div>
        <button className="salt-language" aria-label="Dil seçimi">TR <ChevronDown size={18}/></button>
      </header>

      <section className="salt-hero">
        <div className="salt-shape salt-shape-peach"/>
        <div className="salt-shape salt-shape-sage"/>
        <div className="salt-copy">
          <div className="salt-eyebrow">İYİ TAVUK<br/>İYİ İNSANLAR</div>
          <div className="salt-red-line"/>
          <h1>Lezzet<br/>her zaman<br/>daha iyisini<br/>bir araya getirir.</h1>
          <p>Taze malzemeler,<br/>keyifli anlar.</p>
        </div>
        <div className="salt-script">Good<br/>Food<br/>Good<br/>People</div>
        {hero && <img className="salt-burger" src={hero} alt="SALT burger"/>}
        <div className="salt-dots"><b/><span/><span/></div>
      </section>

      <section className="salt-actions">
        <button className="salt-action salt-action-primary" onClick={openMenu}>
          <span className="salt-action-icon"><Utensils/></span>
          <span className="salt-action-copy"><b>Menüyü Gör</b><small>Tüm lezzetleri keşfedin</small></span>
          <span className="salt-action-arrow">→</span>
        </button>

        <button className="salt-action salt-action-warm" onClick={() => setModal('waiter')}>
          <span className="salt-action-icon"><BellRing/></span>
          <span className="salt-action-copy"><b>Garson Çağır</b><small>Masanıza servis desteği isteyin</small></span>
          <span className="salt-action-arrow">→</span>
        </button>

        <button className="salt-action salt-action-cool" onClick={() => setModal('feedback')}>
          <span className="salt-action-icon"><MessageCircle/></span>
          <span className="salt-action-copy"><b>Geri Bildirim</b><small>Deneyiminizi bizimle paylaşın</small></span>
          <span className="salt-action-arrow">→</span>
        </button>
        <div className="salt-powered">Powered by <b>paneltakip</b></div>
      </section>

      <nav className="salt-bottom-nav">
        <button className="active"><Home/><span>Ana Sayfa</span></button>
        <button><Info/><span>Bilgi</span></button>
        <button onClick={() => setModal('feedback')}><MessageCircle/><span>Yorum Yap</span></button>
        <button><Clock3/><span>Saatler</span></button>
      </nav>

      {modal && <div className="salt-modal-backdrop">
        <div className="salt-modal">
          <button className="salt-modal-close" onClick={() => setModal(null)}><X/></button>
          {modal === 'waiter' && <>
            <BellRing className="salt-modal-main-icon"/>
            <h2>Garson Çağır</h2>
            <p>Masa numaranızı girin.</p>
            <input value={table} onChange={e => setTable(e.target.value.replace(/\D/g,'').slice(0,3))} inputMode="numeric" placeholder="000"/>
            <button className="salt-modal-submit" disabled={!table} onClick={() => setModal('success')}>Garson Çağır</button>
          </>}
          {modal === 'feedback' && <>
            <MessageCircle className="salt-modal-main-icon"/>
            <h2>Geri Bildirim</h2>
            <p>Deneyiminizi değerlendirir misiniz?</p>
            <div className="salt-stars">{[1,2,3,4,5].map(n => <button key={n} className={rating >= n ? 'on' : ''} onClick={() => setRating(n)}>★</button>)}</div>
            <button className="salt-modal-submit" disabled={!rating} onClick={() => setModal('success')}>Gönder</button>
          </>}
          {modal === 'success' && <>
            <div className="salt-success">✓</div><h2>Teşekkür ederiz</h2><p>Talebiniz alındı.</p><button className="salt-modal-submit" onClick={() => setModal(null)}>Tamam</button>
          </>}
        </div>
      </div>}
    </section>
  </main>;
}
