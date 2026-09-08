import { ArrowRight, BadgePercent, CircleDollarSign, ReceiptText, ShoppingBasket, TrendingUp, UtensilsCrossed } from 'lucide-react';

const orderRows = [
  { icon: ShoppingBasket, label: 'Müşterinin ödediği', value: '₺428', kind: 'plus' },
  { icon: BadgePercent, label: 'Kampanya / indirim', value: '− ₺60', kind: 'minus' },
  { icon: ReceiptText, label: 'Platform komisyonu', value: '− ₺77', kind: 'minus' },
  { icon: UtensilsCrossed, label: 'Ürün maliyeti', value: '− ₺115', kind: 'minus' },
] as const;

const actions = ['Fiyatı optimize eder','Kampanyayı kontrol eder','Sepet tutarını büyütür','Sipariş başına kazancı artırır'];

export default function ProfitSection(){
  return (
    <section className="profitSection" id="basari">
      <style>{`
        .profitSection{background:#f2f5f6;padding:86px 0 88px;overflow:hidden}.profitShell{width:min(1120px,calc(100% - 64px));margin:0 auto}.profitHead{text-align:center;max-width:850px;margin:0 auto 38px}.profitKicker{display:flex;align-items:center;justify-content:center;gap:11px;color:#1185a5;font-size:11px;font-weight:800;letter-spacing:2.7px;margin-bottom:13px}.profitKicker:before,.profitKicker:after{content:'';width:38px;height:1px;background:#19cbe9}.profitHead h2{margin:0;color:#092838;font-size:clamp(38px,4.4vw,58px);line-height:1;letter-spacing:-2px;font-weight:900}.profitHead h2 span{color:#0c9fc2}.profitHead p{max-width:690px;margin:16px auto 0;color:#607680;font-size:16px;line-height:1.55}
        .profitStory{display:grid;grid-template-columns:1.02fr .98fr;gap:18px;padding:18px;border-radius:30px;background:#072535;box-shadow:0 22px 48px rgba(7,37,53,.13)}
        .orderCard{padding:28px;border-radius:22px;background:linear-gradient(145deg,#0a3850,#082d42);color:#fff}.orderEyebrow{display:flex;align-items:center;justify-content:space-between;color:#8eeafb;font-size:10px;font-weight:800;letter-spacing:2px}.orderEyebrow svg{color:#26d4f2}.orderTitle{margin:20px 0 7px;font-size:25px;line-height:1.05;font-weight:900}.orderHint{margin:0 0 20px;color:#a9c1cb;font-size:12px;line-height:1.45}.orderRows{display:grid;gap:8px}.orderRow{display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:11px;padding:11px 12px;border-radius:13px;background:rgba(255,255,255,.055);border:1px solid rgba(95,223,244,.1)}.orderIcon{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:rgba(33,216,246,.1);color:#2ad8f4}.orderRow span{font-size:12px;color:#d4e3e9}.orderRow strong{font-size:15px}.orderRow.minus strong{color:#f3c5b8}.netResult{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:13px;padding:17px 18px;border-radius:15px;background:#0b5268;border:1px solid rgba(52,224,247,.34)}.netResult small{display:block;color:#9cecf8;font-size:9px;font-weight:800;letter-spacing:1.5px;margin-bottom:3px}.netResult b{font-size:17px}.netResult strong{font-size:34px;letter-spacing:-1px;color:#fff}
        .nariboAction{padding:28px;border-radius:22px;background:#fff}.nariboActionKicker{display:flex;align-items:center;gap:8px;color:#0aa7c9;font-size:10px;font-weight:900;letter-spacing:1.8px}.nariboAction h3{margin:16px 0 8px;color:#092838;font-size:27px;line-height:1.05;letter-spacing:-.8px}.nariboAction>p{margin:0;color:#6c818b;font-size:12px;line-height:1.5}.actionFlow{display:grid;gap:8px;margin-top:20px}.actionItem{display:grid;grid-template-columns:28px 1fr 18px;align-items:center;gap:9px;padding:11px 12px;border-radius:13px;background:#f1f8fa;color:#153d4d;font-size:12px;font-weight:800}.actionNo{color:#0aa7c9;font-size:9px;letter-spacing:1px}.actionItem svg{color:#0aa7c9}.profitPromise{margin-top:18px;padding:15px 16px;border-radius:14px;background:#e8fafd;color:#103847;font-size:12px;line-height:1.45}.profitPromise strong{color:#078ead}.profitFoot{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:22px;color:#5b737e;font-size:12px}.profitFoot svg{color:#0aa7c9}
        @media(max-width:760px){
          .profitSection{padding:34px 0 38px}.profitShell{width:calc(100% - 24px)}.profitHead{margin-bottom:22px}.profitKicker{font-size:10.5px;letter-spacing:2.5px;margin-bottom:11px;gap:9px}.profitKicker:before,.profitKicker:after{width:32px}.profitHead h2{font-size:30px;line-height:1.03;letter-spacing:-1px}.profitHead p{margin-top:12px;font-size:14px;line-height:1.5;max-width:400px}.profitStory{display:block;padding:11px;border-radius:22px}
          .orderCard{padding:20px;border-radius:17px}.orderEyebrow{font-size:10px;letter-spacing:1.6px}.orderTitle{margin-top:17px;font-size:24px;line-height:1.08}.orderHint{font-size:13px;line-height:1.45;margin-bottom:16px}.orderRows{gap:8px}.orderRow{grid-template-columns:38px 1fr auto;gap:10px;padding:11px 11px}.orderIcon{width:34px;height:34px}.orderIcon svg{width:18px;height:18px}.orderRow span{font-size:13px;line-height:1.25}.orderRow strong{font-size:15px}.netResult{margin-top:11px;padding:14px 15px}.netResult small{font-size:9px}.netResult b{font-size:16px}.netResult strong{font-size:31px}
          .nariboAction{margin-top:10px;padding:20px;border-radius:17px}.nariboActionKicker{font-size:10px;letter-spacing:1.5px}.nariboAction h3{margin-top:13px;font-size:24px;line-height:1.08}.nariboAction>p{font-size:13px;line-height:1.45}.actionFlow{gap:8px;margin-top:16px}.actionItem{padding:11px 12px;font-size:13px;line-height:1.25}.actionNo{font-size:10px}.profitPromise{margin-top:15px;padding:13px 14px;font-size:13px;line-height:1.45}.profitFoot{margin-top:15px;font-size:12px;line-height:1.4;text-align:center}.profitFoot svg{width:16px;height:16px;flex:0 0 auto}
        }
      `}</style>

      <div className="profitShell">
        <div className="profitHead">
          <div className="profitKicker">SİPARİŞTEN KÂRA</div>
          <h2>SATIŞ ARTTIYSA İŞ BİTMEDİ.<br/><span>KÂR DA ARTMALI.</span></h2>
          <p>Bir siparişin kasaya girmesi yetmez. İndirim, komisyon ve ürün maliyeti çıktıktan sonra restoranınıza gerçekten ne kaldığını birlikte yönetiyoruz.</p>
        </div>

        <div className="profitStory">
          <article className="orderCard">
            <div className="orderEyebrow"><span>1 SİPARİŞİN GERÇEK HESABI</span><ReceiptText size={23}/></div>
            <h3 className="orderTitle">₺428'lik siparişten<br/>size ne kalıyor?</h3>
            <p className="orderHint">Sipariş tutarından gerçek maliyetleri tek tek düşelim.</p>
            <div className="orderRows">{orderRows.map(({icon:Icon,label,value,kind})=><div className={`orderRow ${kind}`} key={label}><div className="orderIcon"><Icon size={18}/></div><span>{label}</span><strong>{value}</strong></div>)}</div>
            <div className="netResult"><div><small>GERÇEK SONUÇ</small><b>Restoranınıza kalan</b></div><strong>₺176</strong></div>
          </article>

          <article className="nariboAction">
            <div className="nariboActionKicker"><TrendingUp size={18}/> NARİBO NE YAPIYOR?</div>
            <h3>Bu ₺176'yı nasıl büyütürüz?</h3>
            <p>Rakamları sadece raporlamıyoruz. Sipariş başına kazancı artıracak noktaları bulup aksiyona dönüştürüyoruz.</p>
            <div className="actionFlow">{actions.map((item,i)=><div className="actionItem" key={item}><span className="actionNo">0{i+1}</span><span>{item}</span><ArrowRight size={16}/></div>)}</div>
            <div className="profitPromise"><strong>Hedef:</strong> Daha çok sipariş ve her siparişten daha sağlıklı, sürdürülebilir kazanç.</div>
          </article>
        </div>

        <div className="profitFoot"><CircleDollarSign size={17}/> Naribo, hem sipariş sayısını hem de restoranınıza kalan gerçek kazancı büyütmeye odaklanır.</div>
      </div>
    </section>
  );
}
