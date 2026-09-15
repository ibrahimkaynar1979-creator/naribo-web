'use client';

import { Bell, Check, Copy, CreditCard, Instagram, MapPin, MessageCircle, MoreHorizontal, Phone, Wifi, X } from 'lucide-react';
import { useState } from 'react';
import './makarilla-bottom-nav.css';

type Sheet = 'wifi' | 'iban' | 'directions' | 'waiter' | 'more' | 'feedback' | null;

export function MakarillaBottomNav() {
  const [sheet, setSheet] = useState<Sheet>(null);
  const [waiterSent, setWaiterSent] = useState(false);

  const close = () => {
    setSheet(null);
    setWaiterSent(false);
  };

  const openMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Karşıyaka%20İzmir', '_blank', 'noopener,noreferrer');
    close();
  };

  return <>
    <nav className="mk-bottom-nav mk-bottom-nav-5" aria-label="Hızlı işlemler">
      <button onClick={() => setSheet('wifi')}><Wifi/><span>Wi-Fi</span></button>
      <button onClick={() => setSheet('iban')}><CreditCard/><span>IBAN</span></button>
      <button className="mk-waiter-button" onClick={() => setSheet('waiter')}><span className="mk-waiter-icon"><Bell/></span><span>Garson Çağır</span></button>
      <button onClick={() => setSheet('feedback')}><MessageCircle/><span>Geri Bildirim</span></button>
      <button onClick={() => setSheet('more')}><MoreHorizontal/><span>Daha Fazla</span></button>
    </nav>

    {sheet ? <div className="mk-sheet-backdrop" onClick={close}>
      <section className="mk-action-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="mk-sheet-close" onClick={close} aria-label="Kapat"><X/></button>

        {sheet === 'wifi' && <>
          <div className="mk-sheet-icon"><Wifi/></div>
          <h3>Wi-Fi</h3>
          <p className="mk-sheet-muted">Wi-Fi bilgileri henüz tanımlanmadı.</p>
          <div className="mk-info-row"><span>Ağ adı</span><b>Yönetim panelinden eklenecek</b></div>
          <button className="mk-sheet-secondary" disabled><Copy/> Şifreyi Kopyala</button>
        </>}

        {sheet === 'iban' && <>
          <div className="mk-sheet-icon"><CreditCard/></div>
          <h3>IBAN</h3>
          <p className="mk-sheet-muted">Banka bilgileri henüz tanımlanmadı.</p>
          <div className="mk-info-row"><span>Hesap</span><b>Yönetim panelinden eklenecek</b></div>
          <button className="mk-sheet-secondary" disabled><Copy/> IBAN'ı Kopyala</button>
        </>}

        {sheet === 'directions' && <>
          <div className="mk-sheet-icon"><MapPin/></div>
          <h3>Yol Tarifi</h3>
          <p>Google Maps açılsın mı?</p>
          <div className="mk-sheet-actions">
            <button className="mk-sheet-secondary" onClick={close}>Vazgeç</button>
            <button className="mk-sheet-primary" onClick={openMaps}>Google Maps'i Aç</button>
          </div>
        </>}

        {sheet === 'waiter' && <>
          <div className="mk-sheet-icon mk-sheet-icon-red">{waiterSent ? <Check/> : <Bell/>}</div>
          <h3>{waiterSent ? 'Talebiniz Alındı' : 'Garson Çağır'}</h3>
          <p>{waiterSent ? 'Garson çağırma talebiniz ekrana iletildi.' : 'Masanıza garson çağırmak istiyor musunuz?'}</p>
          {!waiterSent ? <div className="mk-sheet-actions">
            <button className="mk-sheet-secondary" onClick={close}>Vazgeç</button>
            <button className="mk-sheet-primary" onClick={() => setWaiterSent(true)}>Garson Çağır</button>
          </div> : <button className="mk-sheet-primary mk-sheet-full" onClick={close}>Tamam</button>}
        </>}

        {sheet === 'more' && <>
          <div className="mk-sheet-icon"><MoreHorizontal/></div>
          <h3>Daha Fazla</h3>
          <div className="mk-more-grid">
            <button onClick={() => setSheet('directions')}><MapPin/><span>Yol Tarifi</span></button>
            <button><Instagram/><span>Instagram</span></button>
            <button><Phone/><span>İletişim</span></button>
          </div>
        </>}

        {sheet === 'feedback' && <>
          <div className="mk-sheet-icon"><MessageCircle/></div>
          <h3>Geri Bildirim</h3>
          <p className="mk-sheet-muted">Deneyiminizi bizimle paylaşın.</p>
          <textarea className="mk-feedback-box" placeholder="Görüşünüzü yazın..." rows={4}/>
          <button className="mk-sheet-primary mk-sheet-full" onClick={close}>Gönder</button>
        </>}
      </section>
    </div> : null}
  </>;
}
