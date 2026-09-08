import Image from 'next/image';
import { ArrowRight, CheckCircle2, Instagram, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

export default function FinalCtaSection(){
  return (
    <>
      <section className="finalCta" id="analiz">
        <style>{`
          .finalCta{background:#031722;color:#fff;padding:92px 0 82px;overflow:hidden}.finalCtaShell{width:min(1120px,calc(100% - 64px));margin:0 auto}.finalCtaPanel{position:relative;overflow:hidden;border-radius:34px;padding:58px 60px;background:radial-gradient(circle at 85% 15%,rgba(33,216,246,.2),transparent 34%),linear-gradient(135deg,#075675,#063247 58%,#052534);border:1px solid rgba(33,216,246,.2);box-shadow:0 24px 70px rgba(0,0,0,.22)}.finalCtaPanel:after{content:'';position:absolute;width:330px;height:330px;border:1px solid rgba(143,234,248,.12);border-radius:50%;right:-120px;bottom:-190px}.finalCtaKicker{display:flex;align-items:center;gap:10px;color:#91eafa;font-size:11px;font-weight:900;letter-spacing:2.8px;margin-bottom:14px}.finalCtaKicker:before{content:'';width:36px;height:1px;background:#21d8f6}.finalCta h2{position:relative;z-index:1;margin:0;max-width:780px;font-size:clamp(44px,5.4vw,70px);line-height:.96;letter-spacing:-2.7px;font-weight:950}.finalCta h2 span{display:block;color:#21d8f6}.finalCtaLead{position:relative;z-index:1;max-width:650px;margin:19px 0 0;color:#c6d9e0;font-size:16px;line-height:1.55}.finalCtaActions{position:relative;z-index:1;display:flex;align-items:center;gap:12px;margin-top:29px}.finalCtaButton{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:16px 22px;border-radius:14px;background:#21d8f6;color:#03202d;text-decoration:none;font-size:14px;font-weight:950}.finalCtaWhatsApp{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:15px 19px;border-radius:14px;border:1px solid rgba(255,255,255,.2);color:#fff;text-decoration:none;font-size:13px;font-weight:850;background:rgba(255,255,255,.05)}.finalCtaTrust{position:relative;z-index:1;display:flex;gap:18px;flex-wrap:wrap;margin-top:25px;color:#a9c4ce;font-size:12px}.finalCtaTrust span{display:flex;align-items:center;gap:6px}.finalCtaTrust svg{color:#68e3f6}
          .nariboFooter{background:#02131d;color:#fff;padding:35px 0 25px}.nariboFooterShell{width:min(1120px,calc(100% - 64px));margin:0 auto}.nariboFooterTop{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:45px;padding-bottom:30px;border-bottom:1px solid rgba(255,255,255,.08)}.nariboFooterLogo{width:145px;height:auto;object-fit:contain}.nariboFooterBrand p{max-width:370px;margin:12px 0 0;color:#8faab5;font-size:13px;line-height:1.5}.nariboFooterCol strong{display:block;margin-bottom:12px;font-size:12px;letter-spacing:1.2px;color:#d8e8ed}.nariboFooterCol a{display:flex;align-items:center;gap:7px;width:max-content;margin:8px 0;color:#8faab5;text-decoration:none;font-size:12.5px}.nariboFooterCol a:hover{color:#21d8f6}.nariboFooterBottom{display:flex;justify-content:space-between;gap:20px;padding-top:20px;color:#688792;font-size:11px}.nariboFooterBottom b{color:#9cb6bf;font-weight:700}
          @media(max-width:760px){
            .finalCta{padding:40px 0 34px}.finalCtaShell{width:calc(100% - 24px)}.finalCtaPanel{border-radius:23px;padding:29px 20px 25px}.finalCtaKicker{font-size:10px;letter-spacing:2.2px;margin-bottom:12px}.finalCtaKicker:before{width:29px}.finalCta h2{font-size:clamp(34px,9.1vw,42px);line-height:.98;letter-spacing:-1.45px}.finalCtaLead{margin-top:14px;font-size:14px;line-height:1.5}.finalCtaActions{display:grid;grid-template-columns:1fr;margin-top:21px;gap:9px}.finalCtaButton,.finalCtaWhatsApp{width:100%;padding:14px 15px}.finalCtaTrust{margin-top:19px;gap:9px 14px;font-size:11px}.nariboFooter{padding:29px 0 21px}.nariboFooterShell{width:calc(100% - 30px)}.nariboFooterTop{grid-template-columns:1fr;gap:22px;padding-bottom:24px}.nariboFooterLogo{width:125px}.nariboFooterBrand p{font-size:12.5px}.nariboFooterBottom{display:block;line-height:1.7}.nariboFooterBottom span{display:block}
          }
        `}</style>
        <div className="finalCtaShell">
          <div className="finalCtaPanel">
            <div className="finalCtaKicker">ÜCRETSİZ RESTORAN ANALİZİ</div>
            <h2>RESTORANINIZDA<span>NEREDEN BÜYÜYEBİLİRİZ?</span></h2>
            <p className="finalCtaLead">Menünüzü, fiyatlarınızı, kampanyalarınızı ve dijital satış yapınızı birlikte inceleyelim. Siparişi ve gerçek kazancı artırabilecek fırsatları netleştirelim.</p>
            <div className="finalCtaActions"><a className="finalCtaButton" href="#iletisim">Ücretsiz Analiz İstiyorum <ArrowRight size={19}/></a><a className="finalCtaWhatsApp" href="#iletisim"><MessageCircle size={18}/> WhatsApp'tan Görüşelim</a></div>
            <div className="finalCtaTrust"><span><CheckCircle2 size={16}/> Ücretsiz ön analiz</span><span><ShieldCheck size={16}/> Restoranınıza özel değerlendirme</span><span><CheckCircle2 size={16}/> Satış + kârlılık odaklı</span></div>
          </div>
        </div>
      </section>
      <footer className="nariboFooter" id="iletisim">
        <div className="nariboFooterShell">
          <div className="nariboFooterTop">
            <div className="nariboFooterBrand"><Image src="/naribo-logo.png" alt="Naribo" width={265} height={110} className="nariboFooterLogo"/><p>Restoranların dijital satışını, sipariş sayısını ve gerçek kazancını birlikte büyüten büyüme ortağı.</p></div>
            <div className="nariboFooterCol"><strong>NARİBO</strong><a href="#hizmetler">Hizmetler</a><a href="#nasil">Nasıl Çalışıyoruz?</a><a href="#naribo-modeli">Naribo Modeli</a><a href="#analiz">Ücretsiz Analiz</a></div>
            <div className="nariboFooterCol"><strong>İLETİŞİM</strong><a href="#iletisim"><MessageCircle size={15}/> WhatsApp</a><a href="#iletisim"><Mail size={15}/> E-posta</a><a href="#iletisim"><Instagram size={15}/> Instagram</a></div>
          </div>
          <div className="nariboFooterBottom"><span>© 2026 <b>Naribo</b>. Tüm hakları saklıdır.</span><span>Ajansınız değil. <b>Büyüme ortağınız.</b></span></div>
        </div>
      </footer>
    </>
  );
}
