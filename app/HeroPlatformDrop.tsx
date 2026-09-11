'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const platforms = [
  { src: '/platforms/ymksptpng-v2.png', alt: 'Yemeksepeti' },
  { src: '/platforms/gtrpng-v2.png', alt: 'Getir Yemek' },
  { src: '/platforms/ubrpng-v2.png', alt: 'Uber Eats / Trendyol Go' },
  { src: '/platforms/mgrspng-v2.png', alt: 'Migros Yemek' },
];

export default function HeroPlatformDrop() {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    const dock = document.querySelector('.heroActionDock');
    if (dock) setTarget(dock);
  }, []);

  if (!target) return null;

  return createPortal(
    <div className="heroPlatformDrop" aria-label="Sipariş platformları">
      {platforms.map((platform, index) => (
        <div
          className="heroPlatformDropItem"
          style={{ '--drop-delay': `${index * 200}ms` } as React.CSSProperties}
          key={platform.alt}
        >
          <img src={platform.src} alt={platform.alt} />
        </div>
      ))}
    </div>,
    target
  );
}
