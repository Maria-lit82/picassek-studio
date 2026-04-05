import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white/90 selection:bg-emerald-500/30">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between px-4 sm:px-8 mx-auto">
          <Link 
            href="/"
            className="flex items-center gap-2 font-black text-xl tracking-tight group"
          >
            <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
            <span>Вернуться на главную</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl px-4 py-20 mx-auto">
        <div className="space-y-12">
          {/* Page Header */}
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 glow-emerald mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              Политика <br />
              <span className="text-emerald-400">конфиденциальности</span>
            </h1>
            <p className="text-sm text-muted-foreground italic tracking-tight">Политика обработки и защиты персональных данных пользователей Сайта</p>
          </div>

          <div className="prose prose-invert max-w-none prose-p:text-white/70 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-strong:text-white prose-strong:font-bold">
            <h3>1. ОБЩИЕ ПОЛОЖЕНИЯ</h3>
            <p>1.1. Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006г. № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных Литвиновой Марии Григорьевны (ИНН 781310624402).</p>
            <p>1.2. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека при обработке его персональных данных, в том числе защиту прав на неприкосновенность частной жизни.</p>

            <h3>2. ОПЕРАТОР МОЖЕТ ОБРАБАТЫВАТЬ СЛЕДУЮЩИЕ ДАННЫЕ</h3>
            <ul>
              <li>Фамилия, имя, отчество;</li>
              <li>Номер телефона и адрес электронной почты;</li>
              <li>Ник в социальных сетях и мессенджерах;</li>
              <li>Фото- и видеоизображения (если предоставлены в рамках отзывов);</li>
            </ul>
            <p>Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика, Google Analytics и других).</p>

            <h3>3. ЦЕЛИ ОБРАБОТКИ ДАННЫХ</h3>
            <p>Данные Пользователя обрабатываются для:</p>
            <ul>
              <li>Заключения, исполнения и расторжения гражданско-правовых договоров;</li>
              <li>Предоставления доступа Пользователю к Личному кабинету и цифровым инструментам ИИ;</li>
              <li>Установления с Пользователем обратной связи, включая направление уведомлений и запросов;</li>
              <li>Улучшения качества работы Сайта и удобства его использования.</li>
            </ul>

            <h3>4. ПРАВОВЫЕ ОСНОВАНИЯ ОБРАБОТКИ</h3>
            <p>4.1. Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные на Сайте.</p>
            <p>4.2. Используя Сайт, Пользователь выражает свое согласие с настоящей Политикой.</p>

            <h3>5. ПОРЯДОК СБОРА, ХРАНЕНИЯ И ПЕРЕДАЧИ ДАННЫХ</h3>
            <p>5.1. Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований законодательства.</p>
            <p>5.2. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.</p>
            <p>5.3. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.</p>

            <h3>6. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h3>
            <p>6.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору по электронной почте <strong>palette1982@gmail.com</strong>.</p>
            <p>6.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.</p>

            <div className="mt-20 p-10 rounded-[3rem] bg-white/5 border border-white/5 backdrop-blur-sm">
              <h4 className="mt-0 mb-6 text-xl font-bold text-emerald-400">Реквизиты оператора</h4>
              <p className="text-sm mb-2"><strong>Оператор:</strong> Литвинова Мария Григорьевна</p>
              <p className="text-sm mb-2"><strong>ИНН:</strong> 781310624402</p>
              <p className="text-sm mb-2"><strong>Контактный email:</strong> palette1982@gmail.com</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 flex flex-col items-center gap-4 text-xs text-muted-foreground font-medium">
        <div className="flex gap-8">
           <Link href="/legal/offer" className="hover:text-white transition-colors">Оферта</Link>
           <Link href="/legal/privacy" className="text-white">Конфиденциальность</Link>
        </div>
        <div>© {new Date().getFullYear()} Picassek AI Studio</div>
      </footer>
    </div>
  );
}
