import Link from "next/link";
import { ChevronLeft, Info } from "lucide-react";

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white/90 selection:bg-primary/30">
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
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary glow-primary mb-6">
              <Info className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              Публичная <br />
              <span className="gradient-text">Оферта</span>
            </h1>
            <p className="text-sm text-muted-foreground italic">Публичная оферта на оказание консультационно-информационных услуг</p>
          </div>

          <div className="prose prose-invert max-w-none prose-p:text-white/70 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-strong:text-white prose-strong:font-bold">
            <p><strong>Литвинова Мария Григорьевна</strong>, являющаяся налогоплательщиком на профессиональный доход (ИНН 781310624402), именуемая в дальнейшем Исполнитель или Продавец, действующая от собственного имени, адресует настоящий Договор-оферту (далее по тексту – Договор-оферта, Договор) любому лицу (неопределенному кругу лиц), чья воля будет выражена им лично либо через уполномоченного представителя (ст. 182, 185 ГК РФ), выразившему готовность купить товары/Услуги Исполнителя (далее по тексту – Заказчик).</p>

            <h3>1. ТЕРМИНЫ И ОПРЕДЕЛЕНИЯ</h3>
            <p>1.1. В целях настоящего Договора нижеприведенные термины используются в следующих значениях:</p>
            <ul>
              <li><strong>Акцепт Оферты</strong> — полное и безоговорочное принятие условий Оферты путем регистрации на Сайте или оплаты Услуг.</li>
              <li><strong>Сайт</strong> — интернет-ресурс, расположенный по адресу: localhost:3000 (включая все поддомены и страницы).</li>
              <li><strong>Услуга</strong> — предоставление доступа к инструментам искусственного интеллекта (Picassek AI) для генерации контента (артов и каруселей).</li>
            </ul>

            <h3>2. ПРЕДМЕТ ДОГОВОРА</h3>
            <p>2.1. Исполнитель обязуется оказать Заказчику консультационно-информационные услуги в сфере генерации цифрового контента с использованием ИИ-технологий, а Заказчик обязуется оплатить эти Услуги в соответствии с тарифами Исполнителя.</p>

            <h3>3. ПОРЯДОК ОКАЗАНИЯ УСЛУГ</h3>
            <p>3.1. Услуга оказывается дистанционно через личный кабинет Заказчика на Сайте.</p>
            <p>3.2. Для получения Услуги Заказчик вносит средства на внутренний баланс Сайта или оплачивает разовый пакет генераций.</p>
            <p>3.3. Результатом услуги является сформированный нейросетью цифровой объект (текст, изображение, структура карусели), доступный для скачивания или копирования Заказчиком.</p>

            <h3>4. ОСОБЕННОСТИ ИСПОЛЬЗОВАНИЯ ИИ</h3>
            <p>4.1. Заказчик признает, что Услуга предоставляется с использованием алгоритмов генеративного искусственного интеллекта.</p>
            <p>4.2. Исполнитель не гарантирует идеальное анатомическое, техническое или визуальное соответствие ожиданиям Заказчика (например: наличие артефактов, лишних элементов, неточностей в тексте).</p>
            <p>4.3. Наличие визуальных артефактов (ошибок генерации), свойственных современным ИИ-моделям, не является основанием для признания Услуги некачественной.</p>

            <h3>5. СТОИМОСТЬ И ПОРЯДОК РАСЧЕТОВ</h3>
            <p>5.1. Стоимость Услуг определяется Тарифами, размещенными на Сайте в разделе «Цены»:</p>
            <ul>
              <li><strong>Одиночный арт</strong> — 40 ₽ за 1 генерацию.</li>
              <li><strong>Карусель</strong> — 75 ₽ за 1 карусель (включает 5 тематических слайдов с изображением и текстом).</li>
              <li><strong>Пакет «15 каруселей»</strong> — 990 ₽ (включает 15 каруселей по 5 слайдов каждая).</li>
            </ul>

            <h3>6. МОМЕНТ ОКАЗАНИЯ УСЛУГИ И ВОЗВРАТЫ</h3>
            <p>6.1. Услуга считается оказанной в полном объеме в момент завершения процесса генерации контента и вывода ссылки на результат в Личном кабинете Заказчика.</p>
            <p>6.2. Возврат денежных средств за уже произведенные генерации не осуществляется, так как ресурс вычислительных мощностей ИИ был затрачен в момент Акцепта запроса.</p>

            <h3>7. РЕКВИЗИТЫ ИСПОЛНИТЕЛЯ</h3>
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
              <p className="font-bold text-lg mb-2">Индивидуальные данные</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/50">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Исполнитель</p>
                  <p className="text-white">Литвинова Мария Григорьевна</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">ИНН</p>
                  <p className="text-white">781310624402</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Почта</p>
                  <p className="text-white">palette1982@gmail.com</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Статус</p>
                  <p className="text-white">Налог на профессиональный доход</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Picassek AI Studio. Текст документа актуален на 2026 год.
      </footer>
    </div>
  );
}
