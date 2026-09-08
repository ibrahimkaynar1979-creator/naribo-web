import { ArrowRight, BarChart3, Layers3, Target, UsersRound } from 'lucide-react';

const pillars = [
  { no:'01', icon:Target, title:'RESTORANINIZA ÖZEL STRATEJİ', text:'Hazır paket uygulamıyoruz. Menü, fiyat, müşteri ve platform verilerinize göre restoranınıza özel büyüme planı oluşturuyoruz.' },
  { no:'02', icon:Layers3, title:'TEK EKİPTEN YÖNETİM', text:'Menüden kampanyaya, reklamdan platform performansına kadar dijital satışın parçalarını tek bir büyüme planında yönetiyoruz.' },
  { no:'03', icon:BarChart3, title:'SÜREKLİ ÖLÇÜM & GELİŞİM', text:'Sonuçları düzenli ölçüyor; sipariş sayısını ve restoranınıza kalan gerçek kazancı birlikte büyütecek yeni aksiyonlar alıyoruz.' },
] as const;

export default function NariboModelSection(){
  return (
    <section className="nariboModel" id="naribo-modeli">
      <style>{`
        .nariboModel{background:#f3f6f7;padding:88px 0 92px;color:#082b3a;overflow:hidden}.nariboModelShell{width:min(1120px,calc(100% - 64px));margin:0 auto}.nariboModelHead{text-align:center;max-width:900px;margin:0 auto 38px}.nariboModelKicker{display:flex;align-items:center;justify-content:center;gap:11px;color:#0c9fc2;font-size:11px;font-weight:900;letter-spacing:2.9px;margin-bottom:13px}.nariboModelKicker:before,.nariboModelKicker:after{content:'';width:38px;height:1px;background:#0c9fc2}.nariboModelHead h2{margin:0;font-size:clamp(42px,5vw,64px);line-height:.98;letter-spacing:-2.5px;font-weight:950}.nariboModelHead h2 span{display:block;color:#0c9fc2}.nariboModelHead p{max-width:690px;margin:17px auto 0;color:#58717c;font-size:16px;line-height:1.55}
        .nariboModelStatement{position:relative;background:#041d2a;border-radius:30px;padding:18px;box-shadow:0 22px 55px rgba(8,43,58,.12)}.nariboModelGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.nariboModelCard{position:relative;min-height:300px;padding:27px 25px 25px;border-radius:22px;background:linear-gradient(180deg,#07364e,#052a3e);border:1px solid rgba(33,216,246,.16);color:#fff;display:flex;flex-direction:column}.nariboModelTop{display:flex;align-items:center;justify-content:space-between}.nariboModelIcon{width:50px;height:50px;border-radius:15px;display:grid;place-items:center;color:#21d8f6;background:rgba(33,216,246,.1)}.nariboModelNo{font-size:30px;font-weight:950;color:rgba(143,234,248,.18);letter-spacing:-1px}.nariboModelCard h3{margin:32px 0 11px;max-width:260px;font-size:19px;line-height:1.08;letter-spacing:-.25px}.nariboModelCard p{margin:0;color:#bed0d7;font-size:14px;line-height:1.55}.nariboModelCard:first-child{background:linear-gradient(145deg,#087a9a,#07566f)}
        .nariboModelBottom{margin-top:13px;border-radius:20px;background:#fff;padding:19px 22px;display:flex;align-items:center;justify-content:space-between;gap:22px}.nariboModelBottomLead{display:flex;align-items:center;gap:12px}.nariboModelBottomIcon{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:#e9f8fb;color:#0c9fc2;flex:0 0 auto}.nariboModelBottom strong{display:block;font-size:15px}.nariboModelBottom span{display:block;margin-top:3px;color:#607984;font-size:13px}.nariboModelResult{display:flex;align-items:center;gap:8px;color:#087e9d;font-size:13px;font-weight:900;white-space:nowrap}
        @media(max-width:760px){
          .nariboModel{padding:36px 0 40px}.nariboModelShell{width:calc(100% - 24px)}.nariboModelHead{margin-bottom:23px}.nariboModelKicker{font-size:10.5px;letter-spacing:2.4px;margin-bottom:11px;gap:9px}.nariboModelKicker:before,.nariboModelKicker:after{width:32px}.nariboModelHead h2{font-size:clamp(31px,8.3vw,38px);line-height:.98;letter-spacing:-1.35px}.nariboModelHead p{margin-top:13px;max-width:405px;font-size:15px;line-height:1.5}.nariboModelStatement{padding:10px;border-radius:22px}.nariboModelGrid{grid-template-columns:1fr;gap:9px}.nariboModelCard{min-height:0;padding:17px;border-radius:17px;display:grid;grid-template-columns:48px 1fr 30px;column-gap:12px;row-gap:4px;align-items:center}.nariboModelTop{display:contents}.nariboModelIcon{grid-column:1;grid-row:1/3;width:46px;height:46px;border-radius:13px}.nariboModelIcon svg{width:23px;height:23px}.nariboModelNo{grid-column:3;grid-row:1/3;align-self:center;font-size:23px}.nariboModelCard h3{grid-column:2;grid-row:1;margin:0;align-self:end;max-width:none;font-size:14px;line-height:1.15}.nariboModelCard p{grid-column:2;grid-row:2;margin:2px 0 0;font-size:12.5px;line-height:1.4}.nariboModelBottom{margin-top:9px;padding:14px;border-radius:16px;display:block}.nariboModelBottomLead{align-items:flex-start}.nariboModelBottomIcon{width:39px;height:39px;border-radius:12px}.nariboModelBottom strong{font-size:13px;line-height:1.25}.nariboModelBottom span{font-size:12px;line-height:1.35}.nariboModelResult{margin:11px 0 0 51px;font-size:12px;white-space:normal}.nariboModelResult svg{width:17px;height:17px}
        }
      `}</style>
      <div className="nariboModelShell">
        <div className="nariboModelHead">
          <div className="nariboModelKicker">NARİBO MODELİ</div>
          <h2>AJANSINIZ DEĞİL.<span>BÜYÜME ORTAĞINIZ.</span></h2>
          <p>Biz yalnızca reklam veren ya da panel yöneten bir ekip değiliz. Restoranınızın dijital satışını bütün olarak ele alıyor, büyümeyi tek bir sistem üzerinden yönetiyoruz.</p>
        </div>
        <div className="nariboModelStatement">
          <div className="nariboModelGrid">
            {pillars.map(({no,icon:Icon,title,text})=><article className="nariboModelCard" key={no}><div className="nariboModelTop"><div className="nariboModelIcon"><Icon size={26} strokeWidth={1.8}/></div><div className="nariboModelNo">{no}</div></div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="nariboModelBottom"><div className="nariboModelBottomLead"><div className="nariboModelBottomIcon"><UsersRound size={22}/></div><div><strong>Aynı masanın iki tarafı değil, aynı tarafındayız.</strong><span>Hedefimiz daha fazla iş yapmak değil; restoranınızın daha sağlıklı büyümesini sağlamak.</span></div></div><div className="nariboModelResult">SİPARİŞ + KÂRLILIK <ArrowRight size={18}/></div></div>
        </div>
      </div>
    </section>
  );
}
