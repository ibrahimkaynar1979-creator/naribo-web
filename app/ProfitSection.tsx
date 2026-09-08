import { ArrowUpRight, BadgePercent, CircleDollarSign, Percent, ReceiptText, ShoppingBasket, TrendingUp } from 'lucide-react';

const metrics = [
  { icon: ShoppingBasket, label: 'SEPET TUTARI', value: '₺428', note: 'Sipariş başı ortalama' },
  { icon: BadgePercent, label: 'KAMPANYA', value: '%14', note: 'Kontrollü indirim oranı' },
  { icon: Percent, label: 'KOMİSYON', value: '%18', note: 'Platform maliyeti takibi' },
  { icon: CircleDollarSign, label: 'NET KAZANÇ', value: '₺214', note: 'Sipariş başı net katkı' },
];

export default function ProfitSection(){
  return (
    <section className="profitSection" id="basari">
      <style>{`
        .profitSection{background:#f2f5f6;padding:86px 0 88px;overflow:hidden}
        .profitShell{width:min(1180px,calc(100% - 64px));margin:0 auto}
        .profitHead{text-align:center;max-width:850px;margin:0 auto 38px}
        .profitKicker{display:flex;align-items:center;justify-content:center;gap:11px;color:#1185a5;font-size:11px;font-weight:800;letter-spacing:2.7px;margin-bottom:13px}
        .profitKicker:before,.profitKicker:after{content:'';width:38px;height:1px;background:#19cbe9}
        .profitHead h2{margin:0;color:#092838;font-size:clamp(38px,4.4vw,58px);line-height:1;letter-spacing:-2px;font-weight:900}
        .profitHead h2 span{color:#0c9fc2}
        .profitHead p{max-width:650px;margin:16px auto 0;color:#607680;font-size:16px;line-height:1.55}
        .profitPanel{display:grid;grid-template-columns:1.05fr .95fr;gap:18px;padding:18px;border-radius:30px;background:#072535;box-shadow:0 22px 48px rgba(7,37,53,.13)}
        .profitOverview{border-radius:22px;padding:28px;background:linear-gradient(145deg,#0a3850,#082d42);color:#fff;display:flex;flex-direction:column;justify-content:space-between;min-height:360px}
        .profitOverviewTop{display:flex;align-items:flex-start;justify-content:space-between;gap:18px}.profitOverviewTop span{color:#8eeafb;font-size:10px;font-weight:800;letter-spacing:2px}.profitOverviewTop svg{color:#26d4f2}
        .profitBig{margin-top:24px}.profitBig small{display:block;color:#acc3ce;font-size:12px;margin-bottom:6px}.profitBig strong{font-size:54px;line-height:.9;letter-spacing:-2px}.profitBig em{display:inline-flex;align-items:center;gap:5px;margin-left:12px;color:#42e3b4;font-size:12px;font-style:normal;font-weight:800}
        .profitBars{display:grid;gap:10px;margin-top:28px}.profitBar{display:grid;grid-template-columns:88px 1fr 44px;align-items:center;gap:10px;font-size:10px;color:#c8dce4}.profitTrack{height:7px;border-radius:99px;background:#123f52;overflow:hidden}.profitFill{height:100%;border-radius:99px;background:#1bcbe8}.profitBar:nth-child(2) .profitFill{width:74%}.profitBar:nth-child(3) .profitFill{width:58%}.profitBar:nth-child(4) .profitFill{width:82%}.profitBar:first-child .profitFill{width:91%}.profitBar b{text-align:right;color:#fff;font-size:10px}
        .profitInsight{margin-top:22px;display:flex;align-items:flex-start;gap:11px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.055);border:1px solid rgba(95,223,244,.13)}.profitInsight svg{color:#25d5f2;flex:0 0 auto}.profitInsight strong{display:block;font-size:11px;margin-bottom:3px}.profitInsight p{margin:0;color:#a9c1cb;font-size:10px;line-height:1.4}
        .profitMetrics{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .profitMetric{min-height:174px;padding:20px;border-radius:20px;background:#fff;border:1px solid #dce6ea;box-shadow:0 10px 24px rgba(9,40,56,.05);display:flex;flex-direction:column;justify-content:space-between}.profitMetricTop{display:flex;align-items:center;justify-content:space-between}.profitMetricIcon{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:#edfafd;color:#0aa7c9}.profitMetricTop span{font-size:9px;color:#78909a;font-weight:800;letter-spacing:1px}.profitMetric strong{display:block;color:#0b3446;font-size:30px;letter-spacing:-1px}.profitMetric p{margin:4px 0 0;color:#738791;font-size:10px;line-height:1.35}
        .profitFoot{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:22px;color:#5b737e;font-size:12px}.profitFoot svg{color:#0aa7c9}

        @media(max-width:760px){
          .profitSection{padding:28px 0 30px}.profitShell{width:calc(100% - 28px)}.profitHead{margin-bottom:18px}.profitKicker{font-size:8.5px;letter-spacing:2.2px;margin-bottom:9px;gap:8px}.profitKicker:before,.profitKicker:after{width:28px}.profitHead h2{font-size:27px;line-height:1.02;letter-spacing:-1px}.profitHead p{margin-top:10px;font-size:11.5px;line-height:1.42;max-width:360px}.profitPanel{display:block;padding:10px;border-radius:22px}.profitOverview{min-height:255px;padding:18px;border-radius:16px}.profitOverviewTop span{font-size:8px}.profitBig{margin-top:16px}.profitBig small{font-size:9px}.profitBig strong{font-size:42px}.profitBig em{font-size:9px;margin-left:8px}.profitBars{gap:7px;margin-top:18px}.profitBar{grid-template-columns:72px 1fr 36px;gap:7px;font-size:8px}.profitTrack{height:5px}.profitBar b{font-size:8px}.profitInsight{margin-top:15px;padding:9px 10px}.profitInsight svg{width:18px;height:18px}.profitInsight strong{font-size:9px}.profitInsight p{font-size:8px}.profitMetrics{grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.profitMetric{min-height:115px;padding:11px;border-radius:14px}.profitMetricIcon{width:32px;height:32px;border-radius:10px}.profitMetricIcon svg{width:17px;height:17px}.profitMetricTop span{font-size:7px}.profitMetric strong{font-size:22px}.profitMetric p{font-size:8px;margin-top:2px}.profitFoot{margin-top:12px;font-size:9px;gap:5px}.profitFoot svg{width:14px;height:14px}
        }
      `}</style>

      <div className="profitShell">
        <div className="profitHead">
          <div className="profitKicker">SİPARİŞTEN KÂRA</div>
          <h2>SATIŞ ARTTIYSA İŞ BİTMEDİ.<br/><span>KÂR DA ARTMALI.</span></h2>
          <p>Sepet tutarı, kampanya maliyeti, platform komisyonu ve net kazancı birlikte izleyerek büyümeyi sadece ciroyla değil gerçek kârlılıkla yönetiyoruz.</p>
        </div>

        <div className="profitPanel">
          <article className="profitOverview">
            <div>
              <div className="profitOverviewTop"><span>NARİBO KÂRLILIK GÖRÜNÜMÜ</span><TrendingUp size={25}/></div>
              <div className="profitBig"><small>Net kârlılık</small><strong>%24,8</strong><em><ArrowUpRight size={13}/> +%6,4</em></div>
              <div className="profitBars">
                <div className="profitBar"><span>Sepet</span><div className="profitTrack"><div className="profitFill"/></div><b>91</b></div>
                <div className="profitBar"><span>Kampanya</span><div className="profitTrack"><div className="profitFill"/></div><b>74</b></div>
                <div className="profitBar"><span>Komisyon</span><div className="profitTrack"><div className="profitFill"/></div><b>58</b></div>
                <div className="profitBar"><span>Net kazanç</span><div className="profitTrack"><div className="profitFill"/></div><b>82</b></div>
              </div>
            </div>
            <div className="profitInsight"><ReceiptText size={22}/><div><strong>Karar ciroya göre değil, net kazanca göre.</strong><p>Hangi kampanyanın gerçekten kazandırdığını görün; zarar ettiren promosyonu büyütmeyin.</p></div></div>
          </article>

          <div className="profitMetrics">
            {metrics.map(({icon:Icon,label,value,note})=><article className="profitMetric" key={label}><div className="profitMetricTop"><div className="profitMetricIcon"><Icon size={21}/></div><span>{label}</span></div><div><strong>{value}</strong><p>{note}</p></div></article>)}
          </div>
        </div>

        <div className="profitFoot"><TrendingUp size={16}/> Naribo, sipariş sayısını değil sürdürülebilir kârlılığı büyütmeye odaklanır.</div>
      </div>
    </section>
  );
}
