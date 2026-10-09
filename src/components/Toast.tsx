import React from 'react';
import { CheckCircle2, Heart, ShoppingBag } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'cart' | 'wishlist' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'cart' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[#0A2947] text-white px-4 py-3 rounded-lg shadow-xl border border-[#D3D4C0]/30 flex items-center gap-3 text-xs font-medium">
        {type === 'cart' && <ShoppingBag className="w-4 h-4 text-[#F3E4C9]" />}
        {type === 'wishlist' && <Heart className="w-4 h-4 text-[#8B5E3C] fill-[#8B5E3C]" />}
        {type === 'info' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        <span>{message}</span>
      </div>
    </div>
  );
};
