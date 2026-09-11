'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const platforms = [
  { src: '/platforms/yemek-sepeti-logo-png_seeklogo-155131.png', alt: 'Yemeksepeti' },
  { src: '/platforms/getiryemek-logo-png_seeklogo-397395.png', alt: 'Getir Yemek' },
  { src: '/platforms/uber-eats-trendyolgo-logo-png_seeklogo-677055.png', alt: 'Uber Eats' },
  { src: '/platforms/migros-yemek-logo-png_seeklogo-454008.png', alt: 'Migros Yemek' },
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
