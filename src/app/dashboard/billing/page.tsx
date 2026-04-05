"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Zap, 
  ChevronLeft, 
  CreditCard, 
  Sparkles, 
  Wallet,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function BillingPage() {
  const [amount, setAmount] = useState<string>("75");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const presets = [
    { value: "40", label: "1 Арт", desc: "Простой тест" },
    { value: "75", label: "1 Карусель", desc: "Популярно" },
    { value: "330", label: "Пакет 10 Артов", desc: "-17% выгода" },
    { value: "990", label: "Пакет 15 Каруселей", desc: "-12% выгода" },
  ];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Имитация перехода на ЮKassa
    setTimeout(() => {
      alert("ЮKassa: Платежный шлюз проходит модерацию. Кнопка будет активирована после проверки ресурса банком.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between px-4 sm:px-8 mx-auto">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="h-10 w-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-black text-xl">Пополнение баланса</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Main Form */}
          <div className="md:col-span-3 space-y-10">
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                 <Wallet className="h-6 w-6" />
                 <h2 className="text-2xl font-black italic">Укажите сумму</h2>
              </div>
              
              <div className="relative group">
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-24 bg-white/5 border-2 border-white/10 rounded-[2rem] px-8 text-5xl font-black outline-none focus:border-primary transition-all pr-24"
                  placeholder="0.00"
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl font-black text-white/20 group-focus-within:text-primary transition-colors">
                  ₽
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {presets.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setAmount(p.value)}
                    className={`p-6 rounded-2xl border transition-all text-left group ${amount === p.value ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                  >
                    <div className="text-xl font-black mb-1">{p.value} ₽</div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{p.label}</div>
                  </button>
                ))}
              </div>
            </section>

            <form onSubmit={handlePay} className="space-y-8">
               <button
                 disabled={loading || !amount || parseFloat(amount) <= 0}
                 className="w-full h-20 bg-white text-black rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 shadow-2xl shadow-primary/20"
               >
                 {loading ? (
                   <div className="h-6 w-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                 ) : (
                   <>
                     <CreditCard className="h-6 w-6" />
                     <span>Перейти к оплате</span>
                   </>
                 )}
               </button>

               <div className="flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
                  <div className="text-xs font-black">VISA</div>
                  <div className="text-xs font-black">MASTERCARD</div>
                  <div className="text-xs font-black">МИР</div>
                  <div className="text-xs font-black">SBP</div>
               </div>
            </form>
          </div>

          {/* Info Side */}
          <div className="md:col-span-2 space-y-8">
             <div className="glass p-8 rounded-[2.5rem] border-white/5 space-y-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black">Безопасная оплата</h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  Ваши данные защищены по стандарту PCI DSS. Мы не храним данные ваших карт, платежи проходят через зашифрованный шлюз ЮKassa.
                </p>
             </div>

             <div className="p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 space-y-4">
                <div className="flex items-center gap-3 text-emerald-400">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-black text-sm uppercase tracking-widest">Моментально</span>
                </div>
                <p className="text-sm text-emerald-400/80 font-medium leading-relaxed">
                  Средства зачисляются на ваш внутренний баланс сразу после подтверждения транзакции.
                </p>
             </div>

             <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white/30">
                  <AlertCircle className="h-4 w-4" />
                  Вопросы по оплате?
                </div>
                <Link 
                  href="https://t.me/alwithouthysteria" 
                  target="_blank"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                >
                  <span className="text-sm font-bold">Написать Мари в TG</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                </Link>
             </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
        Picassek AI Studio • Secure Billing System v2.0
      </footer>
    </div>
  );
}
