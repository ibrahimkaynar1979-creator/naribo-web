import Image from 'next/image';

export default function NariboModelSection(){
  return (
    <section className="nmPremium" id="naribo-modeli">
      <style>{`
        .nmPremium{background:#031722;padding:0;overflow:hidden}.nmPremiumInner{width:100%;margin:0 auto}.nmPremiumImage{display:block;width:100%;height:auto}
        @media(max-width:760px){.nmPremium{background:#031722}.nmPremiumInner{width:100%;overflow:hidden}.nmPremiumImage{width:100%;height:auto}}
      `}</style>
      <div className="nmPremiumInner">
        <Image
          src="/naribo-modeli-premium.png"
          alt="Naribo Modeli - restoran buyume haritasi, veri analizi, strateji ve surdurulebilir artis"
          width={1872}
          height={768}
          className="nmPremiumImage"
          priority={false}
          sizes="100vw"
        />
      </div>
    </section>
  );
}
