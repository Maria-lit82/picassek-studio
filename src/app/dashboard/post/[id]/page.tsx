import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  Zap, 
  ChevronLeft, 
  Download, 
  Copy, 
  Share2, 
  Layout, 
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Wand2,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default async function PostViewPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const post = await prisma.post.findUnique({
    where: { 
      id: params.id,
      userId: session.user.id
    },
  });

  if (!post) {
    notFound();
  }

  const isCarousel = (post as any).type === "CAROUSEL";
  const content = JSON.parse(post.content || "[]");

  return (
    <div className="min-h-screen flex flex-col pb-20">
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
            <h1 className="font-black text-xl hidden sm:block line-clamp-1 max-w-[300px]">
              {post.topic}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
              <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="gradient-text hidden sm:inline">Picassek Studio</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Preview Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black flex items-center gap-4">
                  {isCarousel ? <Layout className="h-8 w-8 text-primary glow-primary" /> : <ImageIcon className="h-8 w-8 text-primary glow-primary" />}
                  {isCarousel ? "Предпросмотр Карусели" : "Генерация Арта"}
                </h2>
                <div className="px-4 py-1.5 rounded-full glass border-white/10 text-xs font-black uppercase tracking-widest text-primary">
                  {isCarousel ? `${content.length} Слайдов` : "1 Арт-объект"}
                </div>
              </div>

              {isCarousel ? (
                <div className="flex gap-8 overflow-x-auto pb-12 snap-x scroll-smooth no-scrollbar">
                  {content.map((slide: any, i: number) => (
                    <div key={i} className="min-w-[340px] md:min-w-[420px] snap-center">
                      <div className="aspect-[4/5] glass rounded-[3rem] border-white/5 p-10 flex flex-col relative overflow-hidden group shadow-2xl transition-all hover:border-primary/20 hover:scale-[1.01]">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-primary opacity-50" />
                        
                        <div className="flex justify-between items-start mb-10">
                          <div className="h-12 w-12 text-2xl font-black bg-primary/10 text-primary rounded-2xl flex items-center justify-center glow-primary">
                            {i + 1}
                          </div>
                          <Sparkles className="h-6 w-6 text-primary opacity-20" />
                        </div>

                        <div className="flex-1 space-y-8">
                          <h3 className="text-3xl font-black tracking-tighter leading-[1.1]">
                            {slide.title}
                          </h3>
                          <p className="text-white/60 text-lg leading-relaxed font-medium">
                            {slide.content}
                          </p>
                        </div>

                        <div className="mt-auto pt-10">
                          <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center gap-4 group/btn hover:bg-white/10 transition-all cursor-pointer">
                            <ImageIcon className="h-6 w-6 text-primary" />
                            <div className="flex-1 overflow-hidden">
                              <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Image Prompt (EN)</p>
                              <p className="text-[12px] text-primary/80 font-bold line-clamp-1 italic">{slide.imagePrompt}</p>
                            </div>
                            <Copy className="h-5 w-5 text-primary opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass rounded-[3rem] border-white/5 p-12 space-y-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                    <Sparkles className="h-48 w-48 text-primary" />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center mb-8">
                    <div className="h-24 w-24 rounded-[2rem] bg-gradient-primary flex items-center justify-center text-white glow-primary shrink-0">
                      <Wand2 className="h-12 w-12" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-3xl font-black tracking-tighter">Ваш идеальный Арт готов</h3>
                      <p className="text-white/60 text-lg font-medium leading-relaxed">
                        Сгенерированное изображение и детальный промпт для него.
                      </p>
                    </div>
                  </div>
                  
                  {typeof content[0] === 'object' && content[0].url ? (
                    <div className="w-full relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-10 bg-black/40 mb-8">
                      {/* Using standard img to bypass next/image remote domain restrictions */}
                      <img 
                        src={content[0].url} 
                        alt="Generated Art" 
                        className="w-full h-auto object-contain max-h-[600px] bg-black/50" 
                      />
                    </div>
                  ) : null}

                  <div className="relative z-10 p-8 rounded-[2rem] bg-black/40 border border-white/10 font-mono text-sm leading-relaxed text-primary/90 italic group/prompt">
                    <div className="absolute top-6 right-6">
                       <button className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                         <Copy className="h-4 w-4" />
                       </button>
                    </div>
                    {typeof content[0] === 'object' ? content[0].prompt : content[0]}
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Checklist Section for Carousels */}
            {isCarousel && (
              <div className="space-y-8">
                 <h2 className="text-2xl font-black flex items-center gap-4 tracking-tight">
                  <Wand2 className="h-7 w-7 text-primary glow-primary" />
                  Инструкции для генерации слайдов
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {content.map((slide: any, i: number) => (
                    <div key={i} className="p-8 glass rounded-[2rem] border-white/5 flex flex-col md:flex-row gap-8 items-start hover:border-primary/10 transition-colors">
                      <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-sm text-white/40 grow-0 shrink-0 border border-white/5">
                        {i+1}
                      </div>
                      <div className="flex-1 space-y-3">
                         <p className="text-xs font-black uppercase tracking-[0.2em] text-white/20">Slide {i+1} Prompt</p>
                         <p className="text-base font-bold leading-relaxed italic text-primary/80">
                           "{slide.imagePrompt}"
                         </p>
                      </div>
                      <button className="flex-shrink-0 h-12 w-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95 group">
                        <Copy className="h-5 w-5 text-white/40 group-hover:text-primary transition-colors" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Caption Card */}
            <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8 sticky top-32 shadow-2xl bg-gradient-to-b from-white/[0.02] to-transparent">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Описание
                </h3>
                <button className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Copy className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 rounded-[1.5rem] bg-black/40 text-[15px] leading-relaxed whitespace-pre-wrap min-h-[220px] border border-white/10 italic font-medium text-white/80">
                {post.caption}
              </div>

              <div className="flex flex-col gap-4">
                 <button className="w-full h-16 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] glow-primary">
                    <Share2 className="h-5 w-5" />
                    Поделиться
                 </button>
                 <button className="w-full h-16 rounded-2xl border border-white/10 bg-white/5 font-black flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-white/10">
                    <ExternalLink className="h-5 w-5" />
                    В Telegram
                 </button>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6">
                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary glow-primary">
                     <CheckCircle2 className="h-6 w-6" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">Старт-чек</p>
                     <p className="text-sm font-black italic">Готово к публикации</p>
                   </div>
                 </div>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10">
               <div className="text-[10px] font-black text-white/40 uppercase mb-4 tracking-[0.2em] italic">Создатель @mary_lit</div>
               <p className="text-sm font-medium text-white/70 leading-relaxed italic">
                 Используйте промпты в любом генераторе (Midjourney, Stable Diffusion, DALL-E) для получения лучших результатов.
               </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
