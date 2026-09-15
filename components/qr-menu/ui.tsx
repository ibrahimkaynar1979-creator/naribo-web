'use client';

import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export function QrCard({ children, className='' }: { children: ReactNode; className?: string }) {
  return <div className={`qr-card ${className}`}>{children}</div>;
}

export function QrButton({ children, className='', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`qr-button ${className}`} {...props}>{children}</button>;
}

export function QrChip({ active=false, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return <button className={`qr-chip ${active ? 'is-active' : ''}`} {...props}>{children}</button>;
}

export function QrInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="qr-input" {...props} />;
}

export function QrSheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return <div className="qr-sheet-backdrop" onClick={onClose}><div className="qr-sheet" onClick={e=>e.stopPropagation()}>{children}</div></div>;
}
