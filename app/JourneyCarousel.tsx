'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  { no: '01', title: 'REKLAMI GÖRÜR', pos: 'left 60%' },
  { no: '02', title: 'PLATFORMUNU SEÇER', pos: 'center 60%' },
  { no: '03', title: 'SİPARİŞİNİ VERİR', pos: 'right 60%' },
];

export default function JourneyCarousel() {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);

  const go = (next: number) => {
    setActive(Math.max(0, Math.min(slides.length - 1, next)));
  };

  return (
    <div className="journeyCarousel">
      <div className="journeyCarouselFixedHead">
        <div className="journeyCarouselKicker"><span /> REKLAMDAN SİPARİŞE <span /></div>
        <h2>REKLAMI GÖSTERMEK YETMEZ.<br /><em>SİPARİŞE</em> GÖTÜRMEK GEREKİR.</h2>
        <p>Instagram’da başlayan ilgiyi, müşterinin tercih ettiği sipariş kanalına taşıyoruz.</p>
      </div>

      <div
        className="journeyCarouselViewport"
        onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (startX.current === null) return;
          const diff = e.changedTouches[0].clientX - startX.current;
          if (diff < -45) go(active + 1);
          if (diff > 45) go(active - 1);
          startX.current = null;
        }}
      >
        {slides.map((slide, index) => (
          <article
            key={slide.no}
            className={`journeyCarouselSlide ${index === active ? 'isActive' : ''}`}
            aria-hidden={index !== active}
          >
            <div
              className="journeyCarouselArtwork"
              style={{ backgroundPosition: slide.pos }}
            />
            <div className="journeyCarouselShade" />
            <div className="journeyCarouselLabel">
              <strong>{slide.no}</strong>
              <span>{slide.title}</span>
            </div>
          </article>
        ))}

        {active > 0 && (
          <button className="journeyCarouselNav prev" onClick={() => go(active - 1)} aria-label="Önceki adım">
            <ArrowLeft size={20} />
          </button>
        )}
        {active < slides.length - 1 && (
          <button className="journeyCarouselNav next" onClick={() => go(active + 1)} aria-label="Sonraki adım">
            <ArrowRight size={20} />
          </button>
        )}
      </div>

      <div className="journeyCarouselDots" aria-label={`${active + 1}. adım / 3`}>
        {slides.map((slide, index) => (
          <button
            key={slide.no}
            className={index === active ? 'active' : ''}
            onClick={() => go(index)}
            aria-label={`${slide.no}. adıma git`}
          />
        ))}
      </div>
    </div>
  );
}
