import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  Zap, 
  Plus, 
  Layout, 
  History, 
  Settings2, 
  LogOut, 
  CreditCard,
  ChevronRight,
  Share2,
  Sparkles,
  Image as ImageIcon,
  Copy,
  Users
} from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: { 
      posts: {
        orderBy: { createdAt: 'desc' }
      } 
    }
  }) as any;

  if (!user) {
    redirect("/auth/login");
  }

  const referralLink = `${process.env.NEXTAUTH_URL}/auth/register?ref=${user.referralCode || ''}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#020205] text-white">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020205]/80 backdrop-blur-2xl">
        <div className="container flex h-20 items-center justify-between px-6 mx-auto">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter gradient-text">Picassek Studio</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Твой бюджет</span>
              <span className="text-xl font-black text-primary">{user.balance.toLocaleString()} ₽</span>
            </div>
            
            <Link 
              href="/dashboard/billing"
              className="h-11 px-6 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-primary/10"
            >
              <Zap className="h-4 w-4 fill-current" />
              Пополнить
            </Link>

            <button className="h-11 w-11 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
              <Settings2 className="h-5 w-5 text-white/40" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl px-6 py-12 mx-auto space-y-16">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white/[0.03] to-transparent p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Layout className="h-64 w-64" />
           </div>
           
           <div className="space-y-4 relative z-10 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                Привет, {user.name?.split(' ')[0] || "Мария"}! ✨
              </h1>
              <p className="text-lg text-white/40 font-medium italic">Создавайте контент, который захватывает внимание.</p>
           </div>

           <Link
              href="/dashboard/create"
              className="relative z-10 h-20 px-10 rounded-[2rem] bg-primary text-white font-black text-xl flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all glow-primary shadow-2xl"
            >
              <Plus className="h-6 w-6" />
              Новая работа
            </Link>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-4 group transition-all hover:bg-white/[0.02]">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:glow-primary transition-all">
                 <Layout className="h-6 w-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Всего создано</p>
                 <p className="text-3xl font-black">{user.posts.length} <span className="text-sm text-white/20 font-medium lowercase">работ</span></p>
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-4 group transition-all hover:bg-white/[0.02]">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:glow-secondary transition-all">
                 <Users className="h-6 w-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Рефералы</p>
                 <p className="text-3xl font-black">{user.referralsCount || 0} <span className="text-sm text-white/20 font-medium lowercase">людей</span></p>
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-4 group transition-all hover:bg-white/[0.02]">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                 <CreditCard className="h-6 w-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Ваш баланс</p>
                 <p className="text-3xl font-black">{user.balance.toLocaleString()} ₽</p>
              </div>
           </div>
        </section>

        {/* Post Grid */}
        <section className="space-y-10">
           <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black tracking-tighter flex items-center gap-4">
                 <History className="h-8 w-8 text-primary" />
                 Архив работ
              </h2>
           </div>

           {user.posts.length === 0 ? (
             <div className="glass h-[400px] rounded-[3.5rem] border-white/5 flex flex-col items-center justify-center text-center p-12">
               <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                 <Sparkles className="h-10 w-10 text-white/10" />
               </div>
               <h3 className="text-2xl font-black mb-3">Здесь пока пусто</h3>
               <p className="text-white/30 font-medium mb-10 max-w-sm italic">
                  Нажмите кнопку выше, чтобы запустить магию ИИ и создать первую карусель.
               </p>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {user.posts.map((post: any) => {
                 let firstImage = null;
                 try {
                   const content = JSON.parse(post.content || "[]");
                   if (post.type === "IMAGE") {
                      firstImage = content[0]?.url || content[0];
                   } else {
                      firstImage = content[0]?.imageUrl;
                   }
                 } catch (e) {}

                 return (
                   <Link 
                     key={post.id}
                     href={`/dashboard/post/${post.id}`}
                     className="group flex flex-col glass rounded-[2.5rem] border-white/5 overflow-hidden transition-all hover:border-primary/20 hover:scale-[1.02] shadow-xl"
                   >
                     <div className="aspect-[4/5] relative bg-black/40 overflow-hidden border-b border-white/5">
                        {firstImage ? (
                          <img src={firstImage} alt={post.topic} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/10 font-black italic uppercase tracking-widest text-xs">
                             <ImageIcon className="h-12 w-12" />
                             No Preview
                          </div>
                        )}
                        <div className="absolute top-6 right-6">
                           <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-primary italic">
                              {post.type}
                           </div>
                        </div>
                     </div>
                     <div className="p-8 space-y-3">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
                           {new Date(post.createdAt).toLocaleDateString('ru-RU')}
                        </div>
                        <h4 className="text-xl font-black leading-tight line-clamp-2 group-hover:text-primary transition-colors italic">
                           {post.topic}
                        </h4>
                        <div className="pt-4 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-opacity">
                           <span className="text-[10px] font-black uppercase tracking-widest">Просмотр</span>
                           <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                     </div>
                   </Link>
                 );
               })}
             </div>
           )}
        </section>

        {/* Sidebar Mini Blocks */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
           <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6 flex flex-col items-center text-center md:items-start md:text-left">
              <h3 className="text-2xl font-black flex items-center gap-3">
                 <Share2 className="h-6 w-6 text-secondary" />
                 Реферальная программа
              </h3>
              <p className="text-white/40 font-medium italic text-sm">
                 Получайте 200 ₽ за каждого приглашенного друга. Ссылка копируется автоматически.
              </p>
              <button 
                className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  alert("Ссылка скопирована!");
                }}
              >
                Копировать ссылку
              </button>
           </div>
           
           <div className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent border border-white/5 space-y-4">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] italic">Поддержка @mary_lit</p>
              <h3 className="text-xl font-black italic italic">Нужна помощь с промптами?</h3>
              <p className="text-sm text-white/40 leading-relaxed font-medium mb-6">Пишите нам в Telegram, если у вас возникли вопросы по генерации или оплате.</p>
              <Link href="https://t.me/alwithouthysteria" target="_blank" className="font-black text-primary hover:underline italic">Связаться в ТГ →</Link>
           </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/5 italic">
        Picassek Content Studio • High-End Generation Platform
      </footer>
    </div>
  );
}
