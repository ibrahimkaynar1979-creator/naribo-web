import Image from 'next/image';
import { ArrowRight, BarChart3, Target, TrendingUp } from 'lucide-react';

export default function NariboModelSection(){
  return (
    <section className="nm2" id="naribo-modeli">
      <style>{`
        .nm2{background:#f3f6f7;padding:54px 0;color:#fff}.nm2Wrap{position:relative;width:min(1180px,calc(100% - 64px));height:540px;margin:0 auto;border-radius:30px;overflow:hidden;background:#031722;box-shadow:0 22px 55px rgba(8,43,58,.12)}.nm2Bg{position:absolute;inset:0}.nm2Bg img{object-fit:cover;object-position:center}.nm2Shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,23,34,.98) 0%,rgba(3,23,34,.93) 31%,rgba(3,23,34,.58) 46%,rgba(3,23,34,.08) 68%,rgba(3,23,34,.02) 100%)}.nm2Inner{position:relative;z-index:2;height:100%;display:flex;align-items:center}.nm2Copy{width:46%;padding:42px 0 38px 48px}.nm2Kicker{color:#21d8f6;font-size:10px;font-weight:900;letter-spacing:3.2px;margin-bottom:13px}.nm2Title{margin:0;font-size:clamp(39px,3.6vw,52px);line-height:.96;letter-spacing:-2px;font-weight:950}.nm2Title span{display:block;color:#21d8f6}.nm2Lead{max-width:480px;margin:16px 0 0;color:#d6e4e9;font-size:15px;line-height:1.48}.nm2Cta{display:inline-flex;align-items:center;gap:10px;margin-top:20px;padding:13px 18px;border-radius:13px;background:#21d8f6;color:#03202d;text-decoration:none;font-size:13px;font-weight:950}.nm2Benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:27px;max-width:540px}.nm2Benefit{min-width:0}.nm2Icon{width:43px;height:43px;border:1px solid #21d8f6;border-radius:50%;display:grid;place-items:center;color:#21d8f6;background:rgba(3,23,34,.5);margin-bottom:8px}.nm2Benefit strong{display:block;font-size:12.5px;line-height:1.15}.nm2Benefit p{margin:5px 0 0;color:#c4d6dd;font-size:10.5px;line-height:1.35}
        @media(max-width:760px){.nm2{padding:28px 0}.nm2Wrap{width:calc(100% - 24px);height:auto;min-height:0;border-radius:22px}.nm2Bg{position:relative;height:315px}.nm2Bg img{object-position:67% center}.nm2Shade{background:linear-gradient(180deg,rgba(3,23,34,.03) 0%,rgba(3,23,34,.16) 55%,#031722 100%)}.nm2Inner{height:auto;display:block;margin-top:-32px}.nm2Copy{width:auto;padding:0 17px 20px}.nm2Kicker{font-size:9px;letter-spacing:2.7px;margin-bottom:10px}.nm2Title{font-size:32px;line-height:.98;letter-spacing:-1.25px}.nm2Lead{font-size:13px;line-height:1.45;margin-top:13px}.nm2Cta{width:100%;justify-content:center;box-sizing:border-box;margin-top:16px;padding:13px 15px}.nm2Benefits{grid-template-columns:1fr;gap:8px;margin-top:16px;max-width:none}.nm2Benefit{display:grid;grid-template-columns:40px 1fr;column-gap:10px;align-items:center;padding:9px 10px;border:1px solid rgba(33,216,246,.14);border-radius:13px;background:#062838}.nm2Icon{width:38px;height:38px;margin:0;grid-row:1/3}.nm2Benefit strong{font-size:12.5px}.nm2Benefit p{font-size:10.5px;margin-top:2px}}
      `}</style>
      <div className="nm2Wrap">
        <div className="nm2Bg">
          <Image src="/naribo-modeli-photo.png" alt="Naribo restoran buyume panelini inceleyen sef" fill sizes="(max-width:760px) 100vw, 1180px" priority={false}/>
          <div className="nm2Shade"/>
        </div>
        <div className="nm2Inner">
          <div className="nm2Copy">
            <div className="nm2Kicker">NARİBO MODELİ</div>
            <h2 className="nm2Title">Restoranınızın<br/>büyüme haritasını<span>biz çıkarıyoruz.</span></h2>
            <p className="nm2Lead">Veriye dayalı analiz, doğru strateji ve aktif panel yönetimi ile restoranınızın potansiyelini büyütüyoruz.</p>
            <a className="nm2Cta" href="#buyume-ortaginiz">Naribo Modelini Keşfet <ArrowRight size={17}/></a>
            <div className="nm2Benefits">
              <div className="nm2Benefit"><div className="nm2Icon"><BarChart3 size={20}/></div><strong>Veri Analizi</strong><p>Gerçek verilerle büyüme fırsatları</p></div>
              <div className="nm2Benefit"><div className="nm2Icon"><Target size={20}/></div><strong>Strateji</strong><p>Restoranınıza özel aksiyon planı</p></div>
              <div className="nm2Benefit"><div className="nm2Icon"><TrendingUp size={20}/></div><strong>Sürdürülebilir Artış</strong><p>Daha fazla sipariş, daha yüksek kârlılık</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
