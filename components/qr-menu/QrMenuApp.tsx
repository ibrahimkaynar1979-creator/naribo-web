'use client';

import { useMemo, useState } from 'react';
import {
  Bell,
  Building2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Send,
  Settings,
  Star,
  X,
} from 'lucide-react';
import type { QrMenuProduct, QrMenuRestaurant } from '../../lib/qr-menu/types';
import { QrChip, QrInput, QrSheet } from './ui';
import './qr-menu.css';

type Tab = 'home' | 'menu' | 'branch' | 'reviews' | 'contact';

export function QrMenuApp({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const [tab, setTab] = useState<Tab>('home');
  const [categoryId, setCategoryId] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<QrMenuProduct | null>(null);

  const categories = restaurant.categories.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);

  const products = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR');
    return restaurant.products
      .filter((p) => p.isActive)
      .filter((p) => categoryId === 'all' || p.categoryId === categoryId)
      .filter((p) => !q || `${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(q))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [restaurant.products, categoryId, query]);

  const featured = restaurant.products.filter((p) => p.isActive && p.isFeatured).slice(0, 3);

  function go(next: Tab) {
    setTab(next);
    setQuery('');
    if (next !== 'menu') setCategoryId('all');
  }

  const themeVars = {
    '--qr-accent': restaurant.theme.accent,
    '--qr-bg': restaurant.theme.background,
    '--qr-surface': restaurant.theme.surface,
    '--qr-text': restaurant.theme.text,
    '--qr-muted': restaurant.theme.muted,
    '--qr-radius': `${restaurant.theme.radius}px`,
  } as React.CSSProperties;

  return (
    <main className="qr-stage" style={themeVars}>
      <section className="qr-app-shell">
        {tab === 'home' && <HomeScreen restaurant={restaurant} featured={featured} onOpenMenu={() => go('menu')} onProduct={setSelected} />}
        {tab === 'menu' && (
          <MenuScreen restaurant={restaurant} categories={categories} products={products} categoryId={categoryId} query={query} onCategory={setCategoryId} onQuery={setQuery} onProduct={setSelected} />
        )}
        {tab === 'branch' && <BranchScreen restaurant={restaurant} />}
        {tab === 'reviews' && <ReviewsScreen restaurant={restaurant} />}
        {tab === 'contact' && <ContactScreen restaurant={restaurant} onBackHome={() => go('home')} />}

        <div className="qr-powered">Powered by <b>paneltakip</b></div>
        <BottomNav tab={tab} onChange={go} />
      </section>
      <ProductSheet product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}

function HomeScreen({ restaurant, featured, onOpenMenu, onProduct }: {
  restaurant: QrMenuRestaurant;
  featured: QrMenuProduct[];
  onOpenMenu: () => void;
  onProduct: (product: QrMenuProduct) => void;
}) {
  const rating = restaurant.reviewSummary;
  const promo = featured[0] ?? restaurant.products.find((p) => p.isActive);

  return (
    <div className="qr-page qr-home">
      <header className="qr-home-head">
        <div>
          <small>Hoş geldiniz</small>
          <h1>{restaurant.shortName}</h1>
        </div>
        <div className="qr-head-actions">
          <button className="qr-icon-button" aria-label="Bildirimler"><Bell size={17} /></button>
          <button className="qr-icon-button" aria-label="Ayarlar"><Settings size={17} /></button>
        </div>
      </header>

      <div className="qr-info-grid">
        <div className="qr-info-card accent"><span>Şube</span><strong>Açık</strong><small>{restaurant.branch.openingHours}</small></div>
        <div className="qr-info-card"><span>Google</span><strong>{rating?.rating?.toFixed(1) ?? '—'} ★</strong><small>{rating?.count ?? 0} değerlendirme</small></div>
      </div>

      <div className="qr-section-head tight"><h2>Öne Çıkan Lezzet</h2></div>
      {promo && (
        <article className="qr-promo-card">
          <img src={promo.image} alt={promo.name} />
          <div className="qr-promo-copy">
            <div>
              <strong>{promo.name}</strong>
              <small>{promo.description}</small>
            </div>
            <b>₺{promo.price}</b>
          </div>
          <button onClick={() => onProduct(promo)}>Detayları Gör</button>
        </article>
      )}

      <div className="qr-mini-grid">
        <button onClick={onOpenMenu}><span>Menümüz</span><b>{restaurant.products.filter((p) => p.isActive).length} ürün</b><ChevronRight size={16} /></button>
        <button><span>Şubemiz</span><b>{restaurant.branch.name}</b><ChevronRight size={16} /></button>
      </div>

      <div className="qr-section-head"><h2>Popüler</h2><button onClick={onOpenMenu}>Tümünü gör</button></div>
      <div className="qr-home-list">
        {featured.slice(0, 2).map((product) => <ProductCard key={product.id} product={product} onClick={() => onProduct(product)} compact />)}
      </div>
    </div>
  );
}

function MenuScreen({ restaurant, categories, products, categoryId, query, onCategory, onQuery, onProduct }: {
  restaurant: QrMenuRestaurant;
  categories: QrMenuRestaurant['categories'];
  products: QrMenuProduct[];
  categoryId: string;
  query: string;
  onCategory: (id: string) => void;
  onQuery: (value: string) => void;
  onProduct: (product: QrMenuProduct) => void;
}) {
  return (
    <div className="qr-page qr-menu-page">
      <header className="qr-title-row"><div><small>{restaurant.shortName}</small><h1>Menü</h1></div><button className="qr-icon-button"><Search size={18} /></button></header>
      <label className="qr-search"><Search size={17} /><QrInput value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Menüde ara..." /></label>
      <div className="qr-chip-row">
        <QrChip active={categoryId === 'all'} onClick={() => onCategory('all')}>Tümü</QrChip>
        {categories.map((category) => <QrChip key={category.id} active={categoryId === category.id} onClick={() => onCategory(category.id)}>{category.name}</QrChip>)}
      </div>
      <div className="qr-section-head"><h2>Ürünler</h2><span>{products.length} ürün</span></div>
      <div className="qr-product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onClick={() => onProduct(product)} />)}</div>
    </div>
  );
}

function ProductCard({ product, onClick, compact = false }: { product: QrMenuProduct; onClick: () => void; compact?: boolean }) {
  return (
    <button className={`qr-product-card ${compact ? 'is-compact' : ''}`} onClick={onClick}>
      <div className="qr-product-image"><img src={product.image} alt={product.name} /><span className="qr-heart"><Heart size={14} /></span></div>
      <div className="qr-product-body"><strong>{product.name}</strong><p>{product.description}</p><div><b>₺{product.price}</b><span>İncele</span></div></div>
    </button>
  );
}

function BranchScreen({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const branch = restaurant.branch;
  return (
    <div className="qr-page">
      <header className="qr-title-row"><div><small>{restaurant.shortName}</small><h1>Şube Bilgileri</h1></div><Building2 size={20} /></header>
      <div className="qr-branch-hero"><div className="qr-logo-badge large">{restaurant.shortName}</div><h2>{restaurant.name}</h2><div className="qr-rating"><Star size={16} fill="currentColor" /> {restaurant.reviewSummary?.rating ?? '—'} <span>({restaurant.reviewSummary?.count ?? 0})</span></div></div>
      <div className="qr-list-card"><InfoRow icon={<MapPin size={18} />} label="Adres" value={`${branch.address}, ${branch.city}`} /><InfoRow icon={<Phone size={18} />} label="Telefon" value={branch.phone ?? '—'} /><InfoRow icon={<Info size={18} />} label="Çalışma Saatleri" value={branch.openingHours ?? '—'} /><InfoRow icon={<Mail size={18} />} label="E-posta" value={branch.email ?? '—'} /></div>
    </div>
  );
}

function ReviewsScreen({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const rating = restaurant.reviewSummary;
  return (
    <div className="qr-page">
      <header className="qr-title-row"><div><small>{restaurant.shortName}</small><h1>Yorumlar</h1></div><MessageCircle size={20} /></header>
      <div className="qr-review-summary"><strong>{rating?.rating?.toFixed(1) ?? '—'}</strong><div><div className="qr-stars">★★★★★</div><span>{rating?.count ?? 0} değerlendirme</span></div></div>
      <div className="qr-list-card"><div className="qr-review"><b>Ahmet Y. · 5 ★</b><p>Lezzetli, temiz ve hızlı. Tekrar geleceğim.</p><small>2 gün önce</small></div><div className="qr-review"><b>Zeynep K. · 5 ★</b><p>Çıtır tavuk ve soslar çok başarılı.</p><small>5 gün önce</small></div></div>
    </div>
  );
}

function ContactScreen({ restaurant, onBackHome }: { restaurant: QrMenuRestaurant; onBackHome: () => void }) {
  return (
    <div className="qr-page qr-contact">
      <div className="qr-contact-icon"><Send size={28} /></div><h1>Bize Ulaşın</h1><p>{restaurant.name} ile iletişim kurmak için aşağıdaki bilgileri kullanabilirsiniz.</p>
      <div className="qr-list-card full"><InfoRow icon={<Phone size={18} />} label="Telefon" value={restaurant.branch.phone ?? '—'} /><InfoRow icon={<Mail size={18} />} label="E-posta" value={restaurant.branch.email ?? '—'} /></div>
      <button className="qr-primary" onClick={onBackHome}>Ana Sayfaya Dön</button>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="qr-info-row"><span>{icon}</span><div><small>{label}</small><strong>{value}</strong></div></div>;
}

function BottomNav({ tab, onChange }: { tab: Tab; onChange: (tab: Tab) => void }) {
  const items: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Ana Sayfa', icon: <Home size={18} /> },
    { id: 'menu', label: 'Menü', icon: <Search size={18} /> },
    { id: 'branch', label: 'Şube', icon: <Building2 size={18} /> },
    { id: 'reviews', label: 'Yorumlar', icon: <MessageCircle size={18} /> },
    { id: 'contact', label: 'İletişim', icon: <Send size={18} /> },
  ];
  return <nav className="qr-bottom-nav">{items.map((item) => <button key={item.id} className={tab === item.id ? 'is-active' : ''} onClick={() => onChange(item.id)}>{item.icon}<span>{item.label}</span></button>)}</nav>;
}

function ProductSheet({ product, onClose }: { product: QrMenuProduct | null; onClose: () => void }) {
  return (
    <QrSheet open={!!product} onClose={onClose}>
      {product && <div className="qr-detail">
        <div className="qr-detail-media"><img src={product.image} alt={product.name} /><button onClick={onClose}><X size={19} /></button></div>
        <div className="qr-detail-body"><h2>{product.name}</h2><b className="qr-detail-price">₺{product.price}</b><p>{product.description}</p>{product.allergens?.length ? <div className="qr-allergens">{product.allergens.map((a) => <span key={a}>{a}</span>)}</div> : null}{product.options?.length ? <div className="qr-options"><small>Menü / Porsiyon Seçenekleri</small>{product.options.map((o) => <div key={o.id}><span>{o.name}</span><b>₺{o.price}</b></div>)}</div> : null}<button className="qr-primary" onClick={onClose}><ChevronLeft size={16} /> Menüye Dön</button></div>
      </div>}
    </QrSheet>
  );
}
