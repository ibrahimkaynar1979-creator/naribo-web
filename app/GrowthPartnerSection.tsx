import { ArrowRight, CheckCircle2, Handshake, MessageCircle, ShieldCheck } from 'lucide-react';

const promises = [
  'Restoranınıza özel hedef ve büyüme planı',
  'Tek seferlik değil, sürekli takip ve iyileştirme',
  'Sipariş kadar gerçek kazanca da odaklanan yönetim',
] as const;

export default function GrowthPartnerSection(){
  return (
    <section className="growthPartner" id="buyume-ortaginiz">
      <style>{`
        .growthPartner{background:#fff;padding:90px 0 94px;color:#082b3a;overflow:hidden}.growthPartnerShell{width:min(1120px,calc(100% - 64px));margin:0 auto}.growthPartnerPanel{display:grid;grid-template-columns:.9fr 1.1fr;min-height:470px;border-radius:32px;overflow:hidden;background:#eef4f5;box-shadow:0 22px 55px rgba(8,43,58,.09)}
        .growthPartnerLeft{position:relative;padding:54px 48px;background:linear-gradient(145deg,#042333,#063e57);color:#fff;display:flex;flex-direction:column;justify-content:space-between}.growthPartnerMark{width:72px;height:72px;border-radius:22px;display:grid;place-items:center;background:rgba(33,216,246,.11);border:1px solid rgba(33,216,246,.2);color:#21d8f6}.growthPartnerQuote{margin:48px 0 0;font-size:clamp(32px,3.5vw,46px);line-height:1.02;letter-spacing:-1.6px;font-weight:950}.growthPartnerQuote span{display:block;color:#21d8f6}.growthPartnerMini{margin-top:24px;color:#b9cdd5;font-size:14px;line-height:1.55;max-width:390px}.growthPartnerTrust{display:flex;align-items:center;gap:9px;margin-top:36px;color:#9eeaf6;font-size:12px;font-weight:800;letter-spacing:.4px}
        .growthPartnerRight{padding:54px 50px;display:flex;flex-direction:column;justify-content:center}.growthPartnerKicker{display:flex;align-items:center;gap:10px;color:#0c9fc2;font-size:11px;font-weight:900;letter-spacing:2.7px;margin-bottom:14px}.growthPartnerKicker:before{content:'';width:34px;height:1px;background:#0c9fc2}.growthPartnerRight h2{margin:0;font-size:clamp(35px,4vw,52px);line-height:1;letter-spacing:-1.8px;font-weight:950}.growthPartnerRight>p{margin:16px 0 0;color:#58717c;font-size:15px;line-height:1.55;max-width:520px}.growthPartnerList{display:grid;gap:10px;margin:25px 0 0}.growthPartnerItem{display:flex;align-items:center;gap:11px;padding:13px 14px;border-radius:14px;background:#fff;border:1px solid #dce8eb;color:#244957;font-size:13px;font-weight:750}.growthPartnerItem svg{color:#0c9fc2;flex:0 0 auto}.growthPartnerCta{margin-top:27px;display:inline-flex;align-items:center;justify-content:center;gap:9px;width:max-content;padding:15px 20px;border-radius:14px;background:#0a9fc1;color:#fff;text-decoration:none;font-size:13px;font-weight:900;box-shadow:0 10px 24px rgba(12,159,194,.2)}
        @media(max-width:760px){
          .growthPartner{padding:38px 0 42px}.growthPartnerShell{width:calc(100% - 24px)}.growthPartnerPanel{display:flex;flex-direction:column;min-height:0;border-radius:23px}.growthPartnerLeft{padding:24px 20px 23px}.growthPartnerMark{width:50px;height:50px;border-radius:15px}.growthPartnerMark svg{width:25px;height:25px}.growthPartnerQuote{margin-top:23px;font-size:31px;line-height:1.01;letter-spacing:-1.1px}.growthPartnerMini{margin-top:13px;font-size:13px;line-height:1.45}.growthPartnerTrust{margin-top:20px;font-size:11px}.growthPartnerRight{padding:25px 19px 22px}.growthPartnerKicker{font-size:10px;letter-spacing:2.2px;margin-bottom:11px}.growthPartnerKicker:before{width:28px}.growthPartnerRight h2{font-size:29px;line-height:1.02;letter-spacing:-1px}.growthPartnerRight>p{margin-top:12px;font-size:14px;line-height:1.48}.growthPartnerList{margin-top:18px;gap:8px}.growthPartnerItem{padding:11px 12px;font-size:12.5px;line-height:1.3}.growthPartnerItem svg{width:18px;height:18px}.growthPartnerCta{width:100%;margin-top:19px;padding:14px 16px}
        }
      `}</style>
      <div className="growthPartnerShell">
        <div className="growthPartnerPanel">
          <div className="growthPartnerLeft">
            <div><div className="growthPartnerMark"><Handshake size={36} strokeWidth={1.7}/></div><div className="growthPartnerQuote">SİZ MUTFAĞINIZA ODAKLANIN.<span>DİJİTAL BÜYÜMEYİ BİZ YÖNETELİM.</span></div><p className="growthPartnerMini">Naribo, restoranınızın yanında duran dışarıdan bir ajans değil; hedeflerinizi bilen ve sonuçları sizinle birlikte takip eden büyüme ekibidir.</p></div>
            <div className="growthPartnerTrust"><ShieldCheck size={18}/> Şeffaf takip · düzenli iletişim · ortak hedef</div>
          </div>
          <div className="growthPartnerRight">
            <div className="growthPartnerKicker">BÜYÜME ORTAĞINIZ</div>
            <h2>RESTORANINIZ BÜYÜRKEN<br/>YANINIZDA TEK BİR EKİP.</h2>
            <p>Platformların karmaşası, kampanyalar, reklamlar ve performans takibi arasında kaybolmayın. Naribo bütün dijital satış sürecini tek noktadan yönetir.</p>
            <div className="growthPartnerList">{promises.map(text=><div className="growthPartnerItem" key={text}><CheckCircle2 size={20}/><span>{text}</span></div>)}</div>
            <a className="growthPartnerCta" href="#analiz"><MessageCircle size={18}/> Restoranımı Birlikte Büyütelim <ArrowRight size={18}/></a>
          </div>
        </div>
      </div>
    </section>
  );
}
