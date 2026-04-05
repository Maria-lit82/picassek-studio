import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  Users, 
  History, 
  BarChart3, 
  Trash2, 
  CreditCard, 
  Sparkles,
  Search,
  ChevronRight,
  TrendingUp,
  Layout,
  Image as ImageIcon
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [totalUsers, totalPosts, users, recentPosts] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5
    }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { user: true }
    })
  ]);

  const totalBalance = await prisma.user.aggregate({
    _sum: { balance: true }
  });

  return (
    <div className="min-h-screen bg-[#020205] text-white">
      {/* Admin Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-8 mx-auto">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="gradient-text uppercase">Picassek Admin</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-black tracking-widest uppercase">
            <Link href="/dashboard" className="text-white/40 hover:text-white transition-colors">Личный кабинет</Link>
            <div className="h-4 w-px bg-white/10" />
            <div className="text-primary">{session.user.name}</div>
          </nav>
        </div>
      </header>

      <main className="container px-8 py-10 mx-auto space-y-10">
        <h1 className="text-4xl font-black tracking-tighter">Мастер-панель</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-muted-foreground text-xs font-black uppercase tracking-widest mb-1">Всего пользователей</div>
              <div className="text-3xl font-black">{totalUsers}</div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <History className="h-6 w-6" />
            </div>
            <div>
              <div className="text-muted-foreground text-xs font-black uppercase tracking-widest mb-1">Всего работ в системе</div>
              <div className="text-3xl font-black">{totalPosts}</div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <div className="text-muted-foreground text-xs font-black uppercase tracking-widest mb-1">Баланс всех пользователей</div>
              <div className="text-3xl font-black">{totalBalance._sum.balance?.toLocaleString() || 0} ₽</div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2rem] border-white/5 space-y-4 ring-1 ring-primary/20 bg-primary/5">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <div className="text-muted-foreground text-xs font-black uppercase tracking-widest mb-1">Статус Оплаты</div>
              <div className="text-3xl font-black text-emerald-400">OK</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Activity / Generations */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-primary" />
                Последние генерации
              </h2>
            </div>

            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="glass p-6 rounded-[1.5rem] border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-xl bg-zinc-900 flex items-center justify-center text-white/20 border border-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      {post.type === "IMAGE" ? <ImageIcon className="h-6 w-6" /> : <Layout className="h-6 w-6" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg leading-tight truncate max-w-[300px]">{post.topic}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/10 text-muted-foreground shrink-0">{post.type === "IMAGE" ? "Арт" : "Карусель"}</span>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="font-bold text-white/40">{post.user.name || post.user.email}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleString("ru-RU")}</span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    href={`/dashboard/post/${post.id}`} 
                    className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* New Users */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              Новые люди
            </h2>
            <div className="glass p-6 rounded-[2rem] border-white/5 space-y-6">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4 text-left">
                    <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center font-black text-xs text-primary">
                      {user.name?.[0] || user.email?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm truncate max-w-[150px]">{user.name || user.email?.split("@")[0]}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black leading-none mt-1">{user.balance.toLocaleString()} ₽</div>
                    </div>
                  </div>
                  <button className="text-white/20 hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="pt-4 border-t border-white/5 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">© mari_lit exclusive access</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
