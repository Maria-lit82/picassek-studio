"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Zap, 
  ChevronLeft, 
  Sparkles, 
  Wand2, 
  Layout, 
  Target, 
  Settings2,
  AlertCircle,
  Image as ImageIcon,
  CheckCircle2
} from "lucide-react";

function CreatePostForm() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "image" ? "IMAGE" : "CAROUSEL";
  
  const [type, setType] = useState<"IMAGE" | "CAROUSEL">(initialType);
  const [topic, setTopic] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [referenceDesc, setReferenceDesc] = useState("");
  const [slideCount, setSlideCount] = useState(5);
  const [tone, setTone] = useState("viral");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/carousel/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, topic, slideCount, tone, referenceUrl, referenceDesc }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Ошибка генерации");
      }

      const { post } = await res.json();
      router.push(`/dashboard/post/${post.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Недостаточно средств или ошибка сервера.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Type Selection Cards */}
      <section className="space-y-8 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-black tracking-tighter">Что создадим сегодня?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => setType("IMAGE")}
            className={`glass p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 group ${type === "IMAGE" ? "border-primary bg-primary/10" : "border-white/5 hover:border-white/20"}`}
          >
            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-all ${type === "IMAGE" ? "bg-primary text-white glow-primary" : "bg-white/5 text-white/20"}`}>
              <ImageIcon className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <div className="font-black text-xl leading-none">Идеальный Арт</div>
              <div className="text-sm font-bold opacity-50 uppercase tracking-widest italic">40 ₽ за шедевр</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setType("CAROUSEL")}
            className={`glass p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 group ${type === "CAROUSEL" ? "border-secondary bg-secondary/10" : "border-white/5 hover:border-white/20"}`}
          >
            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-all ${type === "CAROUSEL" ? "bg-secondary text-white glow-secondary" : "bg-white/5 text-white/20"}`}>
              <Layout className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <div className="font-black text-xl leading-none">Карусель</div>
              <div className="text-sm font-bold opacity-50 uppercase tracking-widest italic">75 ₽ за серию</div>
            </div>
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Form Side */}
        <div className="lg:col-span-3 space-y-12 animate-fade-in [animation-delay:200ms]">
          <form onSubmit={handleGenerate} className="space-y-10">
            {error && (
              <div className="p-5 rounded-[1.5rem] bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex gap-4 items-center">
                <AlertCircle className="h-6 w-6 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-8">
              {/* Main Topic */}
              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Описание задумки
                </label>
                <textarea
                  required
                  placeholder={type === "IMAGE" ? "Пример: Кот-космонавт в неоновом Токио, 8k, детально" : "Пример: 5 секретов продуктивности для фрилансеров"}
                  className="w-full min-h-[140px] p-6 rounded-[2rem] border border-white/10 bg-white/5 transition-all focus:ring-4 focus:ring-primary/20 focus:border-primary/50 outline-none resize-none text-lg leading-relaxed placeholder:opacity-30"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Reference Section */}
              <div className="space-y-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 mb-2">
                   <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Sparkles className="h-4 w-4" />
                   </div>
                   <span className="font-black text-lg">Работа по референсу (опционально)</span>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest text-white/40">Ссылка на картинку-референс</label>
                  <input
                    type="url"
                    placeholder="Вставьте ссылку на Pinterest, облако или соцсеть"
                    className="w-full p-5 rounded-2xl border border-white/10 bg-white/5 outline-none font-medium focus:ring-2 focus:ring- emerald-500/30 transition-all"
                    value={referenceUrl}
                    onChange={(e) => setReferenceUrl(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest text-white/40">Описание стиля (вдохновение)</label>
                  <input
                    type="text"
                    placeholder="Напр: 'Как у Apple', 'Мрачно и стильно', 'Много неона'"
                    className="w-full p-5 rounded-2xl border border-white/10 bg-white/5 outline-none font-medium focus:ring-2 focus:ring-emerald-500/30 transition-all"
                    value={referenceDesc}
                    onChange={(e) => setReferenceDesc(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {type === "CAROUSEL" && (
                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase tracking-widest text-white/40">Количество слайдов</label>
                    <select
                      className="w-full p-5 rounded-2xl border border-white/10 bg-white/5 outline-none font-bold appearance-none hover:bg-white/10 transition-colors"
                      value={slideCount}
                      onChange={(e) => setSlideCount(parseInt(e.target.value))}
                      disabled={loading}
                    >
                      {[3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map(n => (
                        <option key={n} value={n} className="bg-[#050510] font-black">{n} слайдов</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest text-white/40">Тональность текста</label>
                  <select
                    className="w-full p-5 rounded-2xl border border-white/10 bg-white/5 outline-none font-bold appearance-none hover:bg-white/10 transition-colors"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    disabled={loading}
                  >
                    <option value="viral" className="bg-[#050510]">Цепляющий / Хайповый</option>
                    <option value="professional" className="bg-[#050510]">Профессиональный</option>
                    <option value="minimalist" className="bg-[#050510]">Минимализм</option>
                    <option value="storytelling" className="bg-[#050510]">Сторителлинг</option>
                    <option value="dark" className="bg-[#050510]">Стильный Темный</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !topic}
              className={`w-full h-20 rounded-[2rem] font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-4 glow-primary ${loading ? "bg-white/10 text-white/20" : "bg-white text-black hover:scale-[1.02] active:scale-[0.98]"}`}
            >
              {loading ? (
                <>
                  <div className="h-6 w-6 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                  <span>ИИ творит магию по референсу...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-6 w-6" />
                  <span>Сгенерировать</span>
                </>
              )}
            </button>
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 italic">© mari_lit exclusive generation engine v4.5</span>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-8 animate-fade-in [animation-delay:400ms]">
           <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8 sticky top-32">
              <div className="h-16 w-16 rounded-[1.5rem] bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 rotate-3">
                <ImageIcon className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">Подсказки Мари</h3>
                <p className="text-white/40 text-sm font-medium">Как получить лучший результат:</p>
              </div>
              
              <ul className="space-y-6">
                {[
                  "Вставьте ссылку на любую картинку, и ИИ подстроит стиль под неё.",
                  "Пишите подробно: детали решают всё.",
                  "Используйте референсы для поддержания единого стиля ленты.",
                  "Цепляющий тон — лучший выбор для охватов."
                ].map((tip, i) => (
                  <li key={i} className="flex gap-4 group">
                    <div className="h-6 w-6 rounded-lg bg-emerald-500/10 flex-shrink-0 flex items-center justify-center text-[10px] font-black text-emerald-400 border border-emerald-500/10 group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <span className="text-white/70 font-medium leading-snug text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-8 border-t border-white/5 space-y-4">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Твой бюджет</div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                   <div className="font-black text-xl">150.00 ₽</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Бонус Active</div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-black uppercase tracking-widest opacity-50">Умная Модерация</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Все запросы проходят автоматическую проверку. Насилие и запрещенный контент не допускаются.
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatePostPage() {
  return (
    <div className="min-h-screen flex flex-col">
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
            <h1 className="font-black text-xl hidden sm:block">Создание контента</h1>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="gradient-text hidden sm:inline">Picassek Studio</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl px-4 py-12 mx-auto">
        <Suspense fallback={<div className="text-white flex items-center justify-center py-20 font-black uppercase tracking-widest text-xs opacity-50 italic">Загрузка магии...</div>}>
          <CreatePostForm />
        </Suspense>
      </main>
    </div>
  );
}
