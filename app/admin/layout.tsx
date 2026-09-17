'use client';

import './panel-typography-v1.css';
import { useEffect, useRef, useState } from 'react';
import { KeyRound, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  return (
    <>
      {children}
      <div className="ptAdminAccount" ref={ref}>
        <button
          type="button"
          className="ptAdminAvatar"
          aria-label="Hesap menüsünü aç"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          MA
        </button>
        {open && (
          <div className="ptAdminAccountMenu">
            <div className="ptAdminAccountHead">
              <strong>Makarilla</strong>
              <span>Yönetici Hesabı</span>
            </div>
            <a href="/auth/reset-password" className="ptAdminAccountItem">
              <KeyRound size={16} />
              <span>Şifre Değiştir</span>
            </a>
            <a href="/auth/sign-out" className="ptAdminAccountItem ptAdminLogout">
              <LogOut size={16} />
              <span>Çıkış Yap</span>
            </a>
          </div>
        )}
      </div>
      <style jsx global>{`
        .ptAdminAccount{position:fixed;top:18px;right:28px;z-index:120}
        .ptAdminAvatar{width:36px;height:36px;border:0;border-radius:50%;background:#fde9d8;color:#e84f4a;display:grid;place-items:center;font:900 11px Arial,sans-serif;cursor:pointer;box-shadow:0 0 0 3px #fffdf9}
        .ptAdminAccountMenu{position:absolute;top:46px;right:0;width:220px;padding:8px;background:#fffdf9;border:1px solid #ece4da;border-radius:16px;box-shadow:0 18px 45px rgba(53,38,30,.16);overflow:hidden}
        .ptAdminAccountHead{padding:11px 12px 12px;border-bottom:1px solid #f0e7df;display:flex;flex-direction:column;gap:3px}
        .ptAdminAccountHead strong{font:800 13px Arial,sans-serif;color:#171717}
        .ptAdminAccountHead span{font:400 11px Arial,sans-serif;color:#81776f}
        .ptAdminAccountItem{height:42px;padding:0 11px;border-radius:10px;display:flex;align-items:center;gap:9px;text-decoration:none;font:700 12px Arial,sans-serif;color:#4b4541}
        .ptAdminAccountItem:hover{background:#fff3ea}
        .ptAdminLogout{color:#d94d47}
        .ptAdminLogout:hover{background:#fff0ee}
        @media(max-width:900px){.ptAdminAccount{top:18px;right:18px}}
      `}</style>
    </>
  );
}
