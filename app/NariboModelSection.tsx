import Image from 'next/image';
import { ArrowRight, BarChart3, Target, TrendingUp } from 'lucide-react';

export default function NariboModelSection(){
  return (
    <section className="nm2" id="naribo-modeli">
      <style>{`
        .nm2{position:relative;overflow:hidden;background:#031722;color:#fff}.nm2Bg{position:absolute;inset:0}.nm2Bg img{object-fit:cover;object-position:center}.nm2Shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,23,34,.98) 0%,rgba(3,23,34,.93) 32%,rgba(3,23,34,.42) 55%,rgba(3,23,34,.08) 100%)}.nm2Inner{position:relative;z-index:2;width:min(1180px,calc(100% - 64px));min-height:670px;margin:0 auto;display:flex;align-items:center}.nm2Copy{width:46%;padding:72px 0}.nm2Kicker{color:#21d8f6;font-size:12px;font-weight:900;letter-spacing:4px;margin-bottom:18px}.nm2Title{margin:0;font-size:clamp(48px,5.4vw,72px);line-height:.94;letter-spacing:-3px;font-weight:950}.nm2Title span{display:block;color:#21d8f6}.nm2Lead{max-width:560px;margin:22px 0 0;color:#d6e4e9;font-size:19px;line-height:1.5}.nm2Cta{display:inline-flex;align-items:center;gap:12px;margin-top:28px;padding:16px 22px;border-radius:16px;background:#21d8f6;color:#03202d;text-decoration:none;font-size:15px;font-weight:950}.nm2Benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:42px;max-width:620px}.nm2Benefit{min-width:0}.nm2Icon{width:54px;height:54px;border:1px solid #21d8f6;border-radius:50%;display:grid;place-items:center;color:#21d8f6;background:rgba(3,23,34,.45);margin-bottom:12px}.nm2Benefit strong{display:block;font-size:15px;line-height:1.15}.nm2Benefit p{margin:7px 0 0;color:#c4d6dd;font-size:12.5px;line-height:1.4}
        @media(max-width:760px){.nm2{background:#031722}.nm2Bg{position:relative;height:390px}.nm2Bg img{object-position:64% center}.nm2Shade{background:linear-gradient(180deg,rgba(3,23,34,.04) 0%,rgba(3,23,34,.2) 62%,#031722 100%)}.nm2Inner{width:calc(100% - 28px);min-height:0;display:block;margin-top:-54px}.nm2Copy{width:100%;padding:0 0 38px}.nm2Kicker{font-size:10px;letter-spacing:3px;margin-bottom:12px}.nm2Title{font-size:38px;line-height:.96;letter-spacing:-1.7px}.nm2Lead{font-size:15px;line-height:1.48;margin-top:16px}.nm2Cta{width:100%;justify-content:center;margin-top:20px;padding:15px 18px}.nm2Benefits{grid-template-columns:1fr;gap:11px;margin-top:22px}.nm2Benefit{display:grid;grid-template-columns:48px 1fr;column-gap:12px;align-items:center;padding:12px 13px;border:1px solid rgba(33,216,246,.14);border-radius:15px;background:#062838}.nm2Icon{width:44px;height:44px;margin:0;grid-row:1/3}.nm2Benefit strong{font-size:14px}.nm2Benefit p{font-size:12px;margin-top:3px}}
      `}</style>
      <div className="nm2Bg">
        <Image src="/naribo-modeli-photo.png" alt="Naribo restoran buyume panelini inceleyen sef" fill sizes="100vw" priority={false}/>
        <div className="nm2Shade"/>
      </div>
      <div className="nm2Inner">
        <div className="nm2Copy">
          <div className="nm2Kicker">NARİBO MODELİ</div>
          <h2 className="nm2Title">Restoranınızın<br/>büyüme haritasını<span>biz çıkarıyoruz.</span></h2>
          <p className="nm2Lead">Veriye dayalı analiz, doğru strateji ve aktif panel yönetimi ile restoranınızın potansiyelini büyütüyoruz.</p>
          <a className="nm2Cta" href="#buyume-ortaginiz">Naribo Modelini Keşfet <ArrowRight size={19}/></a>
          <div className="nm2Benefits">
            <div className="nm2Benefit"><div className="nm2Icon"><BarChart3 size={24}/></div><strong>Veri Analizi</strong><p>Gerçek verilerle büyüme fırsatları</p></div>
            <div className="nm2Benefit"><div className="nm2Icon"><Target size={24}/></div><strong>Strateji</strong><p>Restoranınıza özel aksiyon planı</p></div>
            <div className="nm2Benefit"><div className="nm2Icon"><TrendingUp size={24}/></div><strong>Sürdürülebilir Artış</strong><p>Daha fazla sipariş, daha yüksek kârlılık</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
