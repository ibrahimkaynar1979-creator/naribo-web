'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const platforms = [
  { src: '/ymksptpng.png', alt: 'Yemeksepeti' },
  { src: '/gtrpng.png', alt: 'Getir Yemek' },
  { src: '/ubrpng.png', alt: 'Uber Eats' },
  { src: '/mgrspng.png', alt: 'Migros Yemek' },
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
