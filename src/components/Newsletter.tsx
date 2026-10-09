import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="bg-[#F3E4C9]/40 border-t border-[#D3D4C0]/60 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-2">
          Curated Dispatch
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#0A2947] tracking-tight">
          Stay Ahead of What's Next.
        </h2>
        <p className="mt-3 text-sm text-[#0A2947]/75 max-w-xl mx-auto leading-relaxed">
          Get updates on new arrivals, selected offers, and the latest tech essentials. No spam — only curated dispatches.
        </p>

        {submitted ? (
          <div className="mt-8 p-4 bg-white border border-[#D3D4C0] rounded-lg max-w-md mx-auto flex items-center justify-center gap-3 text-emerald-800 text-xs font-semibold shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Thank you for subscribing to Vanguard Dispatch. Welcome aboard.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-2">
            <div className="flex items-stretch gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 bg-white border border-[#D3D4C0] rounded-md text-xs sm:text-sm text-[#0A2947] placeholder-[#0A2947]/40 focus:outline-hidden focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition-all shadow-2xs"
                required
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#0A2947] hover:bg-[#8B5E3C] text-white text-xs sm:text-sm font-semibold rounded-md shadow-sm transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5 text-[#F3E4C9]" />
              </button>
            </div>
            {error && <p className="text-rose-600 text-xs text-left">{error}</p>}
            <p className="text-[11px] text-[#0A2947]/50 text-left pt-1">
              By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
