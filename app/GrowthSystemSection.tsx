import { BarChart3, BadgePercent, Megaphone, RefreshCw, Settings2, TrendingUp } from 'lucide-react';

const items = [
  { icon: Settings2, title: 'MENÜ & FİYAT', text: 'Menüyü, ürün sıralamasını ve fiyatları satış verisine göre düzenliyoruz.' },
  { icon: BadgePercent, title: 'KAMPANYA', text: 'İndirimi rastgele değil; sipariş ve kârlılık etkisine göre yönetiyoruz.' },
  { icon: Megaphone, title: 'REKLAM', text: 'Reklam bütçesini doğru ürün ve doğru sipariş kanalına yönlendiriyoruz.' },
  { icon: BarChart3, title: 'PERFORMANS', text: 'Sipariş, sepet ve net kazancı düzenli takip edip aksiyon alıyoruz.' },
] as const;

export default function GrowthSystemSection(){
  return (
    <section className="growthSystemSection" id="surekli-buyume">
      <style>{`
        .growthSystemSection{background:#031722;color:#fff;padding:84px 0 88px;overflow:hidden}.growthSystemShell{width:min(1120px,calc(100% - 64px));margin:0 auto}.growthSystemHead{text-align:center;max-width:850px;margin:0 auto 36px}.growthSystemKicker{display:flex;align-items:center;justify-content:center;gap:11px;color:#8feaf8;font-size:11px;font-weight:800;letter-spacing:2.8px;margin-bottom:13px}.growthSystemKicker:before,.growthSystemKicker:after{content:'';width:38px;height:1px;background:#20cbe9}.growthSystemHead h2{margin:0;font-size:clamp(38px,4.4vw,58px);line-height:1;letter-spacing:-2px;font-weight:900}.growthSystemHead h2 span{color:#21d8f6}.growthSystemHead p{max-width:700px;margin:16px auto 0;color:#b9ccd4;font-size:16px;line-height:1.55}
        .growthSystemGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.growthSystemCard{min-height:235px;padding:24px;border-radius:22px;background:linear-gradient(180deg,#07334d,#05273c);border:1px solid rgba(33,216,246,.16);display:flex;flex-direction:column}.growthSystemIcon{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:rgba(33,216,246,.1);color:#27d7f3}.growthSystemNo{margin:24px 0 8px;color:#4e7585;font-size:11px;font-weight:800;letter-spacing:1.4px}.growthSystemCard h3{margin:0 0 9px;font-size:17px}.growthSystemCard p{margin:0;color:#b8cbd3;font-size:13px;line-height:1.5}.growthSystemLoop{margin-top:18px;padding:18px 20px;border-radius:18px;background:#0a3349;border:1px solid rgba(33,216,246,.14);display:flex;align-items:center;justify-content:center;gap:12px;text-align:center}.growthSystemLoop svg{color:#24d7f4;flex:0 0 auto}.growthSystemLoop strong{font-size:14px}.growthSystemLoop span{color:#bcd0d8;font-size:13px}
        @media(max-width:760px){
          .growthSystemSection{padding:34px 0 38px}.growthSystemShell{width:calc(100% - 24px)}.growthSystemHead{margin-bottom:22px}.growthSystemKicker{font-size:10.5px;letter-spacing:2.4px;margin-bottom:11px;gap:9px}.growthSystemKicker:before,.growthSystemKicker:after{width:32px}.growthSystemHead h2{font-size:29px;line-height:1.03;letter-spacing:-1px}.growthSystemHead p{margin-top:12px;font-size:15px;line-height:1.5;max-width:405px}.growthSystemGrid{grid-template-columns:1fr;gap:9px}.growthSystemCard{min-height:0;padding:16px;border-radius:17px;display:grid;grid-template-columns:46px 1fr;column-gap:12px;row-gap:3px;align-items:center}.growthSystemIcon{grid-row:1/4;width:44px;height:44px;border-radius:13px}.growthSystemIcon svg{width:22px;height:22px}.growthSystemNo{display:none}.growthSystemCard h3{margin:0;font-size:14px;line-height:1.15}.growthSystemCard p{margin:2px 0 0;font-size:13px;line-height:1.4}.growthSystemLoop{margin-top:11px;padding:14px;border-radius:15px;gap:9px;align-items:flex-start}.growthSystemLoop strong{font-size:13px}.growthSystemLoop span{display:block;margin-top:2px;font-size:12px;line-height:1.35}
        }
      `}</style>

      <div className="growthSystemShell">
        <div className="growthSystemHead">
          <div className="growthSystemKicker">SATIŞ SONRASI YÖNETİM</div>
          <h2>SATIŞA AÇILMAK BAŞLANGIÇ.<br/><span>BÜYÜMEYİ SÜREKLİ YÖNETİYORUZ.</span></h2>
          <p>Mağazanız yayına girdikten sonra işi bırakmıyoruz. Menü, fiyat, kampanya ve reklam performansını birlikte izleyip satış ve gerçek kazancı büyütmeye devam ediyoruz.</p>
        </div>

        <div className="growthSystemGrid">
          {items.map(({icon:Icon,title,text},i)=><article className="growthSystemCard" key={title}><div className="growthSystemIcon"><Icon size={24}/></div><div className="growthSystemNo">0{i+1}</div><h3>{title}</h3><p>{text}</p></article>)}
        </div>

        <div className="growthSystemLoop"><RefreshCw size={20}/><div><strong>Analiz → Aksiyon → Ölçüm → Yeniden optimizasyon.</strong><span> Naribo'nun işi tek seferlik kurulum değil, sürekli büyüme yönetimidir.</span></div><TrendingUp size={20}/></div>
      </div>
    </section>
  );
}
