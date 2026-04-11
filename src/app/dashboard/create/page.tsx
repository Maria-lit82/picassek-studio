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
  CheckCircle2,
  Plus
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
      const res = await fetch("/picassek/api/carousel/generate", {
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
      setError(err.message || "Ошибка на стороне сервера. Проверьте баланс.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 animate-fade-in">
      <section className="space-y-8 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-black tracking-tighter">Что создадим сегодня?</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setType("IMAGE")}
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${type === "IMAGE" ? "border-primary bg-primary/10" : "border-white/5 bg-white/5 opacity-50 hover:opacity-100"}`}
          >
            <ImageIcon className={`h-8 w-8 ${type === "IMAGE" ? "text-primary" : "text-white/20"}`} />
            <span className="font-black text-sm uppercase tracking-wider italic">Арт</span>
          </button>
          <button
            type="button"
            onClick={() => setType("CAROUSEL")}
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${type === "CAROUSEL" ? "border-primary bg-primary/10" : "border-white/5 bg-white/5 opacity-50 hover:opacity-100"}`}
          >
            <Layout className={`h-8 w-8 ${type === "CAROUSEL" ? "text-primary" : "text-white/20"}`} />
            <span className="font-black text-sm uppercase tracking-wider italic">Карусель</span>
          </button>
        </div>
      </section>

      <form onSubmit={handleGenerate} className="max-w-3xl mx-auto space-y-10">
        {error && (
          <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex gap-4 items-center italic">
            <AlertCircle className="h-6 w-6 shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-8 glass p-10 rounded-[3rem] border-white/5 shadow-2xl">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary italic">1. Тема вашего контента</label>
            <textarea
              required
              placeholder={type === "IMAGE" ? "Например: Королевский лев в стиле киберпанк" : "Например: 7 способов эксперту начать зарабатывать"}
              className="w-full min-h-[160px] p-8 rounded-3xl border border-white/10 bg-black/40 outline-none focus:border-primary/50 transition-all text-xl font-medium italic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 italic">2. Референс (URL)</label>
              <input 
                 type="url"
                 placeholder="Ссылка..."
                 className="w-full p-5 rounded-2xl border border-white/10 bg-black/40 outline-none text-sm"
                 value={referenceUrl}
                 onChange={(e) => setReferenceUrl(e.target.value)}
              />
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 italic">3. Тональность</label>
               <select className="w-full p-5 rounded-2xl border border-white/10 bg-black/40 outline-none font-bold italic" value={tone} onChange={(e) => setTone(e.target.value)}>
                 <option value="viral">Viral / Viral</option>
                 <option value="professional">Expert</option>
                 <option value="minimalist">Minimalism</option>
               </select>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading || !topic} className={`w-full h-24 rounded-[2.5rem] font-black text-2xl uppercase italic flex items-center justify-center gap-4 transition-all ${loading ? "bg-white/10 text-white/20" : "bg-white text-black hover:scale-105 active:scale-95 glow-primary"}`}>
          {loading ? "Творим магию..." : "Запустить генерацию"}
        </button>
      </form>
    </div>
  );
}

export default function CreatePostPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020205] text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020205]/80 backdrop-blur-2xl">
        <div className="container flex h-20 items-center justify-between px-6 mx-auto">
          <Link href="/dashboard" className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10"><ChevronLeft className="h-5 w-5" /></Link>
          <Link href="/dashboard" className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary"><Sparkles className="h-6 w-6 text-white" /></div><span className="text-2xl font-black tracking-tighter gradient-text">Picassek Studio</span></Link>
        </div>
      </header>
      <main className="flex-1 container max-w-5xl px-6 py-12 mx-auto"><Suspense><CreatePostForm /></Suspense></main>
    </div>
  );
}
