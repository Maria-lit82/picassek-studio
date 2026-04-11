import Image from "next/image";
import Link from "next/link";
import { Zap, Layout, Sparkles, Rocket, CheckCircle2, ChevronRight, Image as ImageIcon, Copy, Download, Share2, Target, History, Settings2, AlertCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between px-4 sm:px-8 mx-auto">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter group">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary transition-transform group-hover:rotate-12">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="gradient-text">Picassek AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-white transition-colors">Возможности</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">Как это работает</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Цены</Link>
          </nav>
          <div className="flex items-center gap-4">
            {session ? (
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-white text-black px-6 text-sm font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                В кабинет
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden sm:block">
                  Войти
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-primary px-6 text-sm font-bold text-white shadow-xl glow-primary transition-all hover:scale-105 active:scale-95"
                >
                  Начать бесплатно
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
          <div className="container px-4 md:px-8 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 glass-pill mb-8 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">Профессиональный ИИ-художник</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] animate-fade-in">
                Создавайте <span className="gradient-text">Цепляющий</span> <br /> 
                Контент за Секунды
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:200ms]">
                Персональная ИИ-студия в вашем браузере. От идеальных каруселей до уникальных артов в стиле <span className="text-white font-semibold italic">Пикассек</span>.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in [animation-delay:400ms]">
                <Link
                  href="/auth/register"
                  className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white text-black text-lg font-black shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  Создать карусель
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/dashboard/create?type=image"
                  className="w-full sm:w-auto h-16 px-10 rounded-2xl glass text-white text-lg font-black transition-all hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  Сгенерировать арт
                  <ImageIcon className="h-5 w-5 opacity-70" />
                </Link>
              </div>
            </div>

            {/* Hero Asset */}
            <div className="mt-24 relative max-w-6xl mx-auto animate-float">
               <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-20" />
               <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/20 blur-[120px] rounded-full animate-pulse-glow" />
               <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 blur-[120px] rounded-full animate-pulse-glow" />
               <div className="glass rounded-[3rem] p-4 overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)] ring-1 ring-white/10">
                 <Image 
                   src="/picassek_interface_preview_1775336238677.png" 
                   alt="Picassek AI Studio Interface" 
                   width={1200} 
                   height={800} 
                   className="rounded-[2.5rem] w-full h-auto object-cover opacity-90"
                 />
               </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-[#08081a]/50">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Всё для вашего контента</h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Забудьте о часах в дизайнерах и копирайтинге. ИИ сделает всю грязную работу за вас.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "ИИ-Генерация",
                  desc: "Мгновенное создание контента из идеи. Наш ИИ понимает тренды и создаёт вовлекающие крючки.",
                  icon: Sparkles,
                  color: "blue"
                },
                {
                  title: "Универсальность",
                  desc: "Идеально подходит для Instagram, VK, Telegram и других соцсетей. Любые форматы.",
                  icon: Layout,
                  color: "purple"
                },
                {
                  title: "Стиль Пикассек",
                  desc: "Уникальные одиночные арты любой сложности по вашему простому описанию.",
                  icon: ImageIcon,
                  color: "cyan"
                }
              ].map((f, i) => (
                <div key={i} className="glass p-10 rounded-[2.5rem] group hover:bg-white/[0.03] transition-all duration-500">
                  <div className={`h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform glow-primary`}>
                    <f.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black mb-4">{f.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Branding Quote */}
        <section className="py-20 border-y border-white/5">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-3xl md:text-4xl font-semibold italic text-white/90 leading-tight mb-8">
                «Я создала Пикассек, чтобы каждый мог стать цифровым художником, не изучая сложные инструменты годами».
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-primary shadow-lg" />
                <div className="text-left">
                  <div className="font-bold text-lg">@mary_lit</div>
                  <div className="text-sm text-muted-foreground tracking-widest uppercase font-black opacity-50">Создатель сервиса</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
          <div className="container px-4 md:px-8 mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-20">Простая математика</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {[
                { 
                  name: "Одиночные Арты", 
                  price: "40₽", 
                  unit: "/арт",
                  desc: "Идеально для уникальных постов и аватарок",
                  features: ["Стиль Пикассек", "Высокое разрешение", "Любые соотношения сторон", "Пакет 10 шт: 330₽"], 
                  cta: "Создать арт",
                  popular: false 
                },
                { 
                  name: "Карусели", 
                  price: "75₽", 
                  unit: "/карусель",
                  desc: "Для виральных постов и обучающего контента",
                  features: ["1 карусель (5 слайдов)", "ИИ-тексты и промпты", "Скачать архивом", "Пакет 15 шт: 990₽ (по 5 слайдов)"], 
                  cta: "Создать карусель",
                  popular: true 
                }
              ].map((p, i) => (
                <div key={i} className={`relative p-12 rounded-[3.5rem] glass ${p.popular ? 'ring-2 ring-primary glow-primary' : ''} flex flex-col text-left transition-all hover:scale-[1.02]`}>
                  {p.popular && (
                    <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                      Хит продаж
                    </div>
                  )}
                  <div className="mb-10">
                    <h3 className="text-2xl font-black mb-2">{p.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{p.desc}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black">{p.price}</span>
                      <span className="text-muted-foreground font-semibold">{p.unit}</span>
                    </div>
                  </div>
                  <div className="space-y-4 mb-12 flex-1">
                    {p.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3 text-lg font-medium text-white/80">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/dashboard/billing"
                    className={`w-full h-16 rounded-2xl flex items-center justify-center text-lg font-black transition-all ${p.popular ? 'bg-gradient-primary text-white shadow-xl glow-primary' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    Пополнить баланс
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Section */}
        <section id="ecosystem" className="py-32 bg-black/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -mr-48 -mt-48" />
          <div className="container px-4 md:px-8 mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 glass-pill mb-6">
                 <Sparkles className="h-4 w-4 text-primary" />
                 <span className="text-[10px] font-black tracking-widest uppercase text-primary">Mary Litv Universe</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-6 italic">Экосистема Продуктов</h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto italic font-medium">
                Инструменты, которые превращают идеи в медиа-активы. Всё для вашего бренда и комфорта.
              </p>
            </div>

            {/* Telegram Bots Category */}
            <div className="space-y-12 mb-32">
              <div className="flex items-center gap-4">
                 <div className="h-px flex-1 bg-white/5" />
                 <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/30">Мир Telegram-Ботов</h3>
                 <div className="h-px flex-1 bg-white/5" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: "Визитка Мари", desc: "Твой цифровой гид по моим услугам. Здесь всегда можно забрать подарки и записаться на консультацию.", link: "https://t.me/Mary_zavod_bot", icon: Target },
                  { name: "Писака", desc: "Твой ИИ-сторителлер. Пишет живые, цепляющие посты на любую тему, сохраняя твою душу в тексте.", link: "https://t.me/PasakaMary_bot", icon: Copy },
                  { name: "Пикассек", desc: "Мощный ИИ в твоем кармане. Генерация любых артов и визуальных образов прямо в мессенджере.", link: "https://t.me/Picassek_bot", icon: Sparkles },
                  { name: "Парсер Новостей", desc: "Твой личный новостной редактор. Собирает тренды со всего мира и упаковывает их в твой канал.", link: "https://t.me/ParsepPost_bot", icon: Rocket },
                  { name: "Astro Mary", desc: "Звездные подсказки на каждый день. Индивидуальные прогнозы и энергия Вселенной для твоего успеха.", link: "https://t.me/astroved_Marybot", icon: Target },
                  { name: "Баланс 365", desc: "Твой куратор по женской гармонии. Программа восстановления и наполнения жизненной силой день за днем.", link: "https://t.me/Balans365_bot", icon: CheckCircle2 }
                ].map((item, i) => (
                  <Link key={i} href={item.link} target="_blank" className="glass p-10 rounded-[3rem] border-white/5 group hover:border-primary/50 transition-all flex flex-col h-full shadow-2xl hover:shadow-primary/10">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-black mb-4">{item.name}</h3>
                    <p className="text-white/40 leading-relaxed italic mb-8 font-medium flex-1">{item.desc}</p>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                      Запустить бота <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* GPT Assistants Category */}
            <div className="space-y-12 mb-32">
              <div className="flex items-center gap-4">
                 <div className="h-px flex-1 bg-white/5" />
                 <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/30">ИИ-Ассистенты GPT</h3>
                 <div className="h-px flex-1 bg-white/5" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Нутрициолог", desc: "Твой персональный повар-диетолог. Идеальное меню на основе твоих параметров и целей за пару секунд.", link: "https://chatgpt.com/g/g-690f185585bc8191b5f6e9dbfca14574-nutritsiolog-test", icon: Zap },
                  { name: "Код Ядра", desc: "Цифровая рентгенография личности. Глубокая расшифровка твоих талантов и предназначения по нумерологии.", link: "https://chatgpt.com/g/g-690f896de7c88191bbb09c9e075d0c21-kod-iadra-copy", icon: Layout },
                  { name: "Оффермастер", desc: "Твой секретный союзник в продажах. Создает предложения, от которых невозможно отказаться.", link: "https://chatgpt.com/g/g-68eaa2941bd4819182daa93f30ee2190-prodazhnyi-zhigalo", icon: Target }
                ].map((item, i) => (
                  <Link key={i} href={item.link} target="_blank" className="glass p-10 rounded-[3rem] border-white/5 group hover:border-indigo-400/50 transition-all shadow-xl hover:shadow-indigo-500/10">
                    <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-8 group-hover:rotate-12 transition-transform">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-black mb-4">{item.name}</h3>
                    <p className="text-white/40 leading-relaxed italic mb-8 font-medium">{item.desc}</p>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 group-hover:translate-x-2 transition-transform">
                      Открыть GPT <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Media/Blog Category */}
            <div className="max-w-4xl mx-auto">
               <Link href="https://alwithouthysteria.ru/" target="_blank" className="group block relative p-1 pb-1">
                 <div className="absolute inset-0 bg-gradient-primary rounded-[4rem] opacity-20 group-hover:opacity-40 transition-opacity blur-2xl" />
                 <div className="relative glass p-12 md:p-20 rounded-[3.5rem] border-white/10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left overflow-hidden">
                    <div className="h-32 w-32 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-primary shadow-2xl relative z-10">
                       <Share2 className="h-16 w-16" />
                    </div>
                    <div className="space-y-6 relative z-10 flex-1">
                       <h3 className="text-3xl md:text-5xl font-black tracking-tight">Блог "Без Истерик"</h3>
                       <p className="text-white/60 text-xl font-medium leading-relaxed italic">
                         "Твой островок адекватности в мире ИИ и медиа. Обзоры, кейсы и честный опыт Мари Литвиновой."
                       </p>
                    </div>
                    <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-black group-hover:scale-110 transition-transform shadow-2xl">
                       <ChevronRight className="h-10 w-10" />
                    </div>
                 </div>
               </Link>
            </div>
          </div>
        </section>

        {/* Social Proof / CTA */}
        <section className="py-32">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="relative rounded-[4rem] bg-gradient-primary p-12 md:p-24 text-center text-white overflow-hidden shadow-3xl group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48 animate-pulse-glow" />
              
              <h2 className="text-4xl md:text-7xl font-black relative z-10 mb-8 tracking-tighter">Готовы взлететь?</h2>
              <p className="text-white/80 text-xl md:text-2xl max-w-2xl mx-auto relative z-10 mb-12 font-medium">
                Присоединяйтесь к тысячам креаторов, которые уже используют мощь ИИ для своего контента.
              </p>
              <Link
                href="/auth/register"
                className="inline-flex h-20 items-center justify-center rounded-3xl bg-white px-12 text-2xl font-black text-primary shadow-2xl transition-transform hover:scale-105 active:scale-95 relative z-10 shadow-black/20"
              >
                Создать первый шедевр
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-24 bg-black/40 backdrop-blur-sm">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
            <div className="space-y-6 max-w-sm">
              <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="gradient-text">Picassek AI</span>
              </Link>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Сделаем создание контента простым, красивым и доступным для каждого.
              </p>
              <div className="text-sm font-black text-primary tracking-widest uppercase opacity-40">
                Created by @mary_lit
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h4 className="font-black text-sm uppercase tracking-widest text-white/30 text-glow">Продукт</h4>
                <ul className="space-y-3 text-lg font-medium text-muted-foreground">
                  <li><Link href="#features" className="hover:text-white transition-colors">Функции</Link></li>
                  <li><Link href="#pricing" className="hover:text-white transition-colors">Тарифы</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors cursor-not-allowed opacity-50">Примеры (Soon)</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-black text-sm uppercase tracking-widest text-white/30 text-glow">Помощь</h4>
                <ul className="space-y-3 text-lg font-medium text-muted-foreground">
                  <li><Link href="https://t.me/alwithouthysteria" target="_blank" className="hover:text-white transition-colors">Поддержка</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors cursor-not-allowed opacity-50">FAQ</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-black text-sm uppercase tracking-widest text-white/30 text-glow">Компания</h4>
                <ul className="space-y-3 text-lg font-medium text-muted-foreground">
                  <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Конфиденциальность</Link></li>
                  <li><Link href="/legal/offer" className="hover:text-white transition-colors">Оферта</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-medium">
            <div className="">© {new Date().getFullYear()} Picassek AI Studio. Все права защищены.</div>
            <div className="flex gap-6">
              <Link href="https://t.me/alwithouthysteria" target="_blank" className="hover:text-white">Telegram</Link>
              <Link href="https://vk.com/club234220381" target="_blank" className="hover:text-white">VK</Link>
              <Link href="https://www.instagram.com/palette1982/" target="_blank" className="hover:text-white">Instagram</Link>
              <Link href="https://www.youtube.com/@MaryLitv" target="_blank" className="hover:text-white">YouTube</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
