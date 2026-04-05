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
    <div className="min-h-screen flex flex-col bg-[#050510] text-white">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between px-4 sm:px-8 mx-auto">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="gradient-text hidden sm:inline">Picassek Studio</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Баланс</span>
              <span className="text-xl font-black gradient-text">{user.balance.toLocaleString()} ₽</span>
            </div>
            
            <Link 
              href="/dashboard/billing"
              className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
            >
              <Zap className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">Пополнить</span>
            </Link>

            <button className="h-10 w-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <Settings2 className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl px-4 py-8 sm:py-12 mx-auto space-y-12">
        {/* Welcome & Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <div className="glass p-8 rounded-[2.5rem] border-white/5 md:col-span-1">
             <h1 className="text-2xl font-black tracking-tight mb-2">Привет, {user.name?.split(' ')[0] || "Творец"}!</h1>
             <p className="text-sm text-muted-foreground font-medium italic">Готовы создавать шедевры сегодня?</p>
             <Link
                href="/dashboard/create"
                className="mt-6 h-12 w-full rounded-2xl bg-white text-black font-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                <Plus className="h-5 w-5" />
                Создать работу
              </Link>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border-white/5 flex items-center gap-6 group hover:bg-white/[0.03] transition-all">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary glow-primary group-hover:scale-110 transition-transform">
              <Layout className="h-7 w-7" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Всего работ</div>
              <div className="text-2xl font-black">{user.posts.length}</div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border-white/5 flex items-center gap-6 group hover:bg-white/[0.03] transition-all">
            <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary glow-secondary group-hover:scale-110 transition-transform">
              <CreditCard className="h-7 w-7" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Твой баланс</div>
              <div className="text-2xl font-black">{user.balance.toLocaleString()} ₽</div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Area: Recent Works */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in [animation-delay:200ms]">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <History className="h-6 w-6 text-primary" />
                Последние работы
              </h2>
            </div>
            
            {user.posts.length === 0 ? (
              <div className="glass h-[400px] rounded-[3rem] border-white/5 flex flex-col items-center justify-center text-center p-8">
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-white/10" />
                </div>
                <h3 className="text-xl font-black mb-2">Здесь пока пусто</h3>
                <p className="text-muted-foreground mb-8 max-w-sm text-sm">
                  Ваши шедевры появятся тут сразу после первой генерации.
                </p>
                <Link
                  href="/dashboard/create"
                  className="h-12 px-8 rounded-xl bg-white text-black font-black flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                >
                  Создать первую работу
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {user.posts.map((post: any) => (
                  <Link 
                    key={post.id}
                    href={`/dashboard/post/${post.id}`}
                    className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between group hover:bg-white/[0.03] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {post.type === 'IMAGE' ? <ImageIcon className="h-6 w-6" /> : <Layout className="h-6 w-6" />}
                      </div>
                      <div>
                        <div className="font-bold text-lg leading-none mb-1 line-clamp-1">{post.topic}</div>
                        <div className="text-xs text-white/30 font-medium">Сгенерировано {new Date(post.createdAt).toLocaleDateString('ru-RU')}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/10 group-hover:text-white/30 transition-colors" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8 animate-fade-in [animation-delay:400ms]">
            {/* Admin Quick Link */}
            {user.role === 'ADMIN' && (
              <Link 
                href="/admin" 
                className="glass p-8 rounded-[2.5rem] border-primary/20 bg-primary/5 flex items-center gap-4 group hover:bg-primary/10 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white glow-primary group-hover:scale-110 transition-transform">
                  <Settings2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Доступ владельца</div>
                  <div className="font-bold text-lg">Админ-панель</div>
                </div>
              </Link>
            )}

            {/* Support / Tip Block */}
            <div className="glass p-10 rounded-[3.5rem] border-white/5 space-y-6 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Sparkles className="h-20 w-20" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 italic">TIP @MARY_LIT</div>
              <p className="relative z-10 text-white/70 font-medium leading-relaxed italic text-sm">
                «Добавляйте в свои новые работы ссылку на ботов моей экосистемы, чтобы повысить охваты и узнаваемость личного бренда».
              </p>
              <div className="flex flex-col gap-3 pt-4">
                 <Link href="https://t.me/alwithouthysteria" target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                    <span className="text-xs font-black uppercase tracking-widest text-primary">Поддержка</span>
                    <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                 </Link>
              </div>
            </div>

            {/* Invite Block */}
            <div className="glass p-10 rounded-[3.5rem] border-white/5 space-y-6">
              <h3 className="text-xl font-black flex items-center gap-3">
                <Share2 className="h-5 w-5 text-secondary" />
                Приглашай друзей
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                Получи <strong>200 ₽</strong> на баланс за каждого, кто зарегистрируется по твоей ссылке.
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group">
                <code className="text-[10px] font-bold opacity-30 truncate mr-2">
                  ...ref={user.referralCode || 'PICASSEK'}
                </code>
                <Copy className="h-4 w-4 text-white/20" />
              </div>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-black opacity-20">Link is active</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
        Picassek Studio • Created by @mary_lit
      </footer>
    </div>
  );
}
