"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, User, Mail, Lock, AlertCircle } from "lucide-react";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, referralCode }),
      });

      if (res.ok) {
        router.push("/auth/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.message || "Ошибка регистрации");
      }
    } catch (err) {
      setError("Произошла ошибка. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex gap-3 items-center animate-fade-in">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {referralCode && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex gap-3 items-center">
          <Sparkles className="h-4 w-4 shrink-0" />
          Вы приглашены! Вас ждет бонус при регистрации.
        </div>
      )}
      
      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">
            Ваше имя
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-primary transition-colors">
              <User className="h-5 w-5" />
            </div>
            <input
              id="name"
              type="text"
              required
              className="block w-full pl-14 pr-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
              placeholder="Иван Иванов"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">
            Электронная почта
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <input
              id="email"
              type="email"
              required
              className="block w-full pl-14 pr-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">
            Пароль
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-primary transition-colors">
              <Lock className="h-5 w-5" />
            </div>
            <input
              id="password"
              type="password"
              required
              className="block w-full pl-14 pr-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-start gap-3 px-2">
          <input
            id="agreed"
            type="checkbox"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer"
          />
          <label htmlFor="agreed" className="text-xs text-muted-foreground leading-tight cursor-pointer select-none">
            Я согласен с{" "}
            <Link href="/legal/offer" target="_blank" className="text-white hover:text-primary underline transition-colors">
              публичной офертой
            </Link>{" "}
            и{" "}
            <Link href="/legal/privacy" target="_blank" className="text-white hover:text-primary underline transition-colors">
              политикой конфиденциальности
            </Link>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !agreed}
        className="w-full relative group h-16 rounded-2xl bg-white text-black font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-2xl glow-primary"
      >
        {loading ? (
          <div className="h-6 w-6 border-4 border-black/10 border-t-black rounded-full animate-spin" />
        ) : (
          <>
            Создать аккаунт
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
      
      <div className="text-center font-bold text-sm">
         <span className="text-muted-foreground">Уже есть аккаунт?</span>{" "}
        <Link href="/auth/login" className="text-white hover:text-primary transition-colors">
          Войти
        </Link>
      </div>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-4 py-12 bg-[#020205] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md p-10 space-y-10 glass rounded-[2.5rem] border-white/5 relative z-10 shadow-2xl">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-3 group mb-2">
            <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black gradient-text">Picassek Studio</span>
          </Link>
          <h2 className="text-3xl font-black tracking-tighter text-white">
            Начните творить
          </h2>
          <p className="text-muted-foreground font-medium">
            150 ₽ бонуса уже ждут вас внутри!
          </p>
        </div>

        <Suspense fallback={<div className="text-white/40 text-center py-10 italic">Загрузка формы...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
