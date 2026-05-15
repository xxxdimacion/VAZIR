import React, { useState, useId, useCallback, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

const GalleryCarousel = ({ 
  images, 
  title,
  aspectClass = "aspect-[3/4]",
  itemWidthClass = "flex-[0_0_80%] sm:flex-[0_0_280px]",
  imgClass = "object-cover",
  autoWidth = false,
  autoHeightClass = "h-[220px] sm:h-[350px] lg:h-[400px]"
}: { 
  images: string[], 
  title?: React.ReactNode,
  aspectClass?: string,
  itemWidthClass?: string,
  imgClass?: string,
  autoWidth?: boolean,
  autoHeightClass?: string
}) => {
  const [emblaRef] = useEmblaCarousel({ 
    dragFree: true,
    containScroll: 'trimSnaps' 
  });

  return (
    <div className="w-full flex flex-col gap-6 mb-12 last:mb-0">
      {title && <h3 className="text-2xl font-bold px-2">{title}</h3>}
      <div className="overflow-hidden bg-white/40 rounded-3xl p-4 border border-stone-200/50" ref={emblaRef}>
        <div className="flex gap-4 items-center">
          {images.map((src, idx) => (
            <div className={autoWidth ? `flex-[0_0_auto] min-w-0 flex items-center justify-center relative ${autoHeightClass}` : `${itemWidthClass} min-w-0 relative ${aspectClass} bg-stone-100/50 rounded-2xl border border-stone-200 overflow-hidden shadow-sm`} key={idx}>
              <img 
                src={src} 
                alt={`Slide ${idx + 1}`} 
                className={autoWidth ? "block max-h-full max-w-[85vw] sm:max-w-none w-auto h-auto pointer-events-none rounded-2xl border border-stone-200 shadow-sm" : `w-full h-full pointer-events-none ${imgClass}`} 
                referrerPolicy="no-referrer" 
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-stone-200 group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, idx) => (
            <div className="flex-[0_0_100%] min-w-0" key={idx}>
              <img 
                src={src} 
                alt={`Slide ${idx + 1}`} 
                className="w-full h-auto object-cover pointer-events-none" 
                referrerPolicy="no-referrer" 
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              scrollTo(idx);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              selectedIndex === idx ? 'bg-stone-300' : 'bg-stone-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#EBEBEB] text-black font-['Montserrat'] selection:bg-[#505F52] selection:text-black relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>

      {/* Olive Glows */}
      
      {/* Top Glow */}
      <div
        aria-hidden="true"
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-[100px] sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)] pointer-events-none"
      >
        <div className="aspect-[1.5] w-[60rem] rounded-full bg-gradient-to-r from-[#505F52] to-[#7f9482] opacity-30" />
      </div>

      {/* Grey Accent Glow */}
      <div
        aria-hidden="true"
        className="absolute top-[20%] left-1/4 -z-10 transform-gpu blur-[120px] pointer-events-none"
      >
        <div className="aspect-square w-[40rem] rounded-full bg-gradient-to-tr from-stone-400 to-stone-500 opacity-20" />
      </div>
      
      {/* Middle Glow */}
      <div
        aria-hidden="true"
        className="absolute top-[40%] right-0 -z-10 transform-gpu blur-[120px] pointer-events-none translate-x-1/3"
      >
        <div className="aspect-square w-[50rem] rounded-full bg-gradient-to-l from-[#505F52] to-[#607262] opacity-20" />
      </div>

      {/* Cases Glow */}
      <div
        aria-hidden="true"
        className="absolute top-[60%] left-0 -z-10 transform-gpu blur-[120px] pointer-events-none -translate-x-1/3 w-[60rem] aspect-square rounded-full bg-gradient-to-tr from-[#505F52] to-[#7f9482] opacity-20"
      />

      {/* Large Grey Glow */}
      <div
        aria-hidden="true"
        className="absolute top-[75%] right-1/4 -z-10 transform-gpu blur-[140px] pointer-events-none translate-x-1/4"
      >
        <div className="aspect-square w-[55rem] rounded-full bg-gradient-to-l from-stone-400 to-stone-500 opacity-20" />
      </div>
      
      {/* Bottom Glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 -z-10 transform-gpu blur-[120px] pointer-events-none -translate-x-1/4 translate-y-1/4"
      >
        <div className="aspect-square w-[50rem] rounded-full bg-gradient-to-tr from-[#505F52] to-[#7f9482] opacity-20" />
      </div>

      {/* Block 1: Hero Section */}
      <section 
        id="hero" 
        className="relative py-12 min-h-[100svh] flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto"
      >
        {/* Orange Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 transform-gpu blur-[120px] pointer-events-none"
        >
          <div className="aspect-[1.5] w-[45rem] rounded-full bg-[#D9520E] opacity-[0.15]" />
        </div>
        <GridBackground className="[mask-image:linear-gradient(to_bottom,white_0%,white_20%,transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 150, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 w-full relative z-0 max-w-4xl mx-auto"
        >
          <h1 className="text-[26px] sm:text-[34px] md:text-[42px] leading-[1.2] text-center font-bold tracking-tight mb-6">
            Как с нуля выйти <br />
            на <span className="relative inline-block whitespace-nowrap">
              2-3k$ в месяц
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#D9520E]" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M 2 10 Q 50 0, 98 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span> на арбитраже трафика?
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-black max-w-4xl mx-auto leading-relaxed font-medium">
            <strong className="text-black font-bold">Смотри видео ниже:</strong> внутри готовая система, которая сэкономит тебе месяцы тестов, нервов и решит 99% проблем с банами и поиском связок
          </p>
        </motion.div>
        
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full z-10 flex flex-col items-center px-4 sm:px-0"
          >
            {/* Screen Frame */}
            <div className="relative w-full aspect-[16/10] bg-[#090B0A] rounded-t-xl sm:rounded-t-3xl border-[6px] sm:border-[12px] border-stone-900 flex items-center justify-center overflow-hidden shadow-2xl shadow-[#505F52]/20">
              {/* MacBook Pro Notch */}
              <div className="absolute top-0 inset-x-0 mx-auto w-16 sm:w-24 h-2.5 sm:h-3.5 bg-stone-900 rounded-b-sm sm:rounded-b-md z-20 flex items-center justify-center">
              </div>
              
              {/* Video Player */}
              <div className="w-full h-full bg-[#FAFAFA] flex items-center justify-center overflow-hidden relative">
                <iframe 
                  className="w-full h-full"
                  src="https://player.mediadelivery.net/embed/634586/3e330e7a-3936-4d88-bb8c-cd65a30f8f25?autoplay=false&loop=false&muted=false&preload=true&responsive=true" 
                  title="Academy Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            {/* Base */}
            <div className="relative w-[115%] sm:w-[110%] h-3 sm:h-5 bg-gradient-to-b from-stone-700 to-stone-900 rounded-b-xl sm:rounded-b-2xl flex justify-center shadow-2xl">
              {/* Thumb notch */}
              <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-stone-900 rounded-b-md shadow-inner"></div>
            </div>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={(e) => scrollToSection(e, 'checkout')} 
            className="mt-24 sm:mt-36 bg-[#505F52] hover:bg-[#3D493E] text-white font-bold py-3 px-8 rounded-md text-lg sm:text-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(80,95,82,0.5)] uppercase tracking-wide w-full sm:w-auto"
          >
            ВСТУПИТЬ В АКАДЕМИЮ
          </motion.button>
        </div>
      </section>

      

      {/* Block 3: Accordion */}
      <motion.section 
        id="program" 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-12 pb-16 md:pt-16 md:pb-24 px-6 max-w-4xl mx-auto"
      >
        <div className="bg-white/60 backdrop-blur-xl border border-stone-200 p-6 md:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-sm">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Что внутри?</h2>
        <div className="space-y-2">
          <AccordionItem 
            title="Платный трафик: Meta ADS и TikTok Ads" 
            content={
              <div className="space-y-4">
                <p>Несколько часов лекций, в которых наглядно разобраны все технические моменты, лайфхаки и тд</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>От регистрации кабинетов до первых конверсий</li>
                  <li>Полный сетап: антидетекты, прокси, трекеры, документы</li>
                  <li>Обход банов и проблем с верификацией</li>
                  <li>Примеры залива трафика на разные вертикали с их разбором</li>
                </ul>
              </div>
            } 
          />
          <AccordionItem 
            title="Гайды по Вайбкодингу" 
            content="С нуля собираем сайты, Telegram-ботов и мини-игрушки с помощью нейросетей — для этого вам не нужно знать языки программирования или уметь кодить." 
          />
          <AccordionItem 
            title="Гайды по Нейроконтенту" 
            content="Показываю как делать ИИ видео и фото для креативов с минимальными вложениями + показываю свои ИИ креативы которые приводят мне дешевый трафик на вертикали БАДов и здоровья" 
          />
          <AccordionItem 
            title="Гайды по поиску клиентов" 
            content="Показываю как настраиваю рекламу на свои услуги как таргетолога и палю креативы + делюсь записями созвонов с ними" 
          />
          <AccordionItem 
            title="Доп. Материалы" 
            content={
              <ul className="list-disc pl-5 space-y-2">
                <li>Гайд по выбору ниши</li>
                <li>Шаблон таблиц для отчетов</li>
                <li>Шаблон поиска киллер-оффера</li>
                <li>Шаблон креативов в Figma для лидогенирации</li>
              </ul>
            } 
          />
          <AccordionItem 
            title="1000$-5000$ челлендж" 
            content="Показываю как с полного нуля в прямом эфире делаю из 1000 долларов 5000 долларов за месяц на трафике (Прошлый челлендж 100$-1000$ я проводил в публичном канале)" 
          />
          <AccordionItem 
            title="Моя личная поддержка" 
            content="Я всегда на связи: помогу разобрать вашу ситуацию на практике, отвечу на все вопросы и помогу решить любую проблему, возникшую в процессе работы" 
          />
        </div>
        </div>
      </motion.section>

      {/* Block: About Me */}
      <motion.section id="about" initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-16 md:py-24 px-4 sm:px-6 relative pt-12">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 relative z-10 bg-white/60 backdrop-blur-xl border border-stone-200 py-12 sm:py-20 rounded-[2rem] sm:rounded-[3rem] shadow-sm">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Кто я?</h2>
          
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-12">
            <div className="w-full md:w-1/2">
              <div className="w-full aspect-square max-w-[400px] mx-auto bg-stone-100 rounded-[2rem] border border-stone-200 overflow-hidden relative shadow-sm">
                <img src="https://i.ibb.co/5x2jD1T9/image-734.png" alt="Вазир" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col gap-6 text-lg md:text-xl text-black leading-relaxed">
              <p>
                Меня зовут Вазир. Мне 21 год. Я занимаюсь переливом трафика с Meta ADS. 
              </p>
              <p>
                Последние пол года делаю 7-10к$ в месяц. В основном лью на БАДы, но также есть опыт залива трафика на другие ниши:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Цветочные магазины</li>
                <li>Детейлинги</li>
                <li>Ремонт</li>
                <li>Бьюти</li>
                <li>Парфюмерия</li>
                <li>ММА клубы</li>
              </ul>
              <p>
                Ниже прикрепил несколько скриншотов моих успехов
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full mt-8 overflow-hidden">
            <GalleryCarousel 
              title="Результаты" 
              images={[
                "https://i.ibb.co/TDkkWqDD/photo-2026-05-07-19-48-14.jpg",
                "https://i.ibb.co/2YtC2BsD/photo-2026-05-07-19-48-14-3.jpg",
                "https://i.ibb.co/35BJdwRb/photo-2026-05-07-19-48-14-2.jpg",
                "https://i.ibb.co/tw4LxmQ7/photo-2026-05-07-20-12-38.jpg",
                "https://i.ibb.co/cSSqLvQg/photo-2026-05-07-20-12-39.jpg",
                "https://i.ibb.co/m5zNDCLt/Group-1000011032.png"
              ]} 
              autoWidth={true}
              autoHeightClass="h-[180px] sm:h-[350px] lg:h-[400px]"
            />
            <GalleryCarousel 
              title={<>Выплаты с трафика <span className="block sm:inline sm:ml-2 mt-1 sm:mt-0 text-sm font-normal text-[#D9520E]">(20к$ за март-апрель)</span></>}
              images={[
                "https://i.ibb.co/hRfm4190/photo-1-2026-05-08-21-56-25-1.png",
                "https://i.ibb.co/Y4rpRspp/photo-2-2026-05-08-21-56-25-1.png",
                "https://i.ibb.co/FkbtV55c/photo-3-2026-05-08-21-56-25-1.png"
              ]} 
              autoWidth={true}
              autoHeightClass="h-[380px] sm:h-[550px] lg:h-[650px]"
            />
          </div>
        </div>
      </motion.section>

      {/* Block: FAQ */}
      <motion.section 
        id="faq" 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 md:py-24 px-6 max-w-4xl mx-auto"
      >
        <div className="bg-white/60 backdrop-blur-xl border border-stone-200 p-6 md:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-sm">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Частые вопросы</h2>
        <div className="space-y-4">
          <FaqItem 
            title="Нужен ли бюджет на старт?" 
            content="На старте можно обойтись минимальными вложениями. Для первой рекламной кампании в Meta ADS или TikTok ADS вполне хватит 30-50$" 
          />
          <FaqItem 
            title="Сколько времени нужно уделять в день?" 
            content="На старте достаточно 2-3 часов в день. Когда набьете руку и поймете алгоритмы, многие процессы можно будет автоматизировать" 
          />
          <FaqItem 
            title="Подойдет ли мне, если я полный ноль?" 
            content="Да. Обучение построено пошагово - от правильной регистрации первого аккаунта до вывода первых заработанных денег" 
          />
          <FaqItem 
            title="Будет ли помощь с банами?" 
            content="Да. В закрытом чате мы помогаем вытаскивать кабинеты из банов и проходить проверки" 
          />
          <FaqItem 
            title="Инфа по Meta ADS актуальная?" 
            content="Максимально. Как только Фейсбук начинает штормить, мы сразу тестим и выкатываем в канал новые рабочие сетапы." 
          />
          <FaqItem 
            title="Где брать аккаунты и карты?" 
            content="Внутри даем контакты cервисов. Только проверенные шопы авторегов/фармов и надежные платежки" 
          />
          <FaqItem 
            title="Я новичок в техничке, справлюсь?" 
            content="Да. В приватке есть пошаговые видео-гайды по настройке всей технички: от пикселей до клоак и трекеров" 
          />
          <FaqItem 
            title="Как быстро я окуплю подписку?" 
            content="Обычно стоимость отбивается с первого же плюсового залива или при подписании первого клиента на таргет" 
          />
        </div>
        </div>
      </motion.section>

      {/* Block 4: Checkout */}
      <motion.section 
        id="checkout" 
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 px-6 flex items-center justify-center min-h-[80vh] relative"
      >
        
        <div className="text-center w-full max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-stone-200 p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-sm">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Выбери свой тариф:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
            <div className="bg-white border border-stone-200 p-8 flex flex-col hover:border-[#505F52]/50 transition-colors border-[2px] rounded-3xl">
              <h3 className="text-3xl font-bold mb-2">Подписка</h3>
              <div className="mt-4 mb-6">
                <span className="text-6xl font-black tracking-tighter">39$</span>
                <span className="text-black ml-2">/ месяц</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-lg">
                <li className="flex items-start gap-3"><span className="text-[#505F52] font-bold text-xl shrink-0">✓</span> <span className="text-black font-bold">Полный доступ ко всем материалам</span></li>
                <li className="flex items-start gap-3"><span className="text-[#505F52] font-bold text-xl shrink-0">✓</span> <span className="text-black font-bold">Обновления и новые связки</span></li>
                <li className="flex items-start gap-3"><span className="text-[#505F52] font-bold text-xl shrink-0">✓</span> <span className="text-black font-bold">Доступ в закрытое комьюнити</span></li>
              </ul>
            </div>
            
            <div className="bg-[#D9520E]/5 border-[#D9520E]/50 p-8 flex flex-col border-[2px] relative overflow-hidden rounded-3xl">
              <h3 className="text-3xl font-bold mb-2 text-[#D9520E]">Навсегда</h3>
              <div className="mt-4 mb-6">
                <span className="text-6xl font-black tracking-tighter text-black">199$</span>
                              </div>
              <ul className="space-y-4 mb-8 flex-1 text-lg">
                <li className="flex items-start gap-3"><span className="text-[#505F52] font-bold text-xl shrink-0">✓</span> <span className="text-black font-bold">Бессрочный доступ к Академии</span></li>
                <li className="flex items-start gap-3"><span className="text-[#505F52] font-bold text-xl shrink-0">✓</span> <span className="text-black font-bold">Все будущие обновления бесплатно</span></li>
              </ul>
            </div>
          </div>
          
          <div className="text-black text-lg md:text-xl mb-12 space-y-6 max-w-2xl mx-auto">
            <div className="px-3 sm:px-4 py-3 my-4">
              <p className="m-0">
                <strong>Если остались вопросы, пиши мне - <a href="https://t.me/vazirbbv" target="_blank" rel="noopener noreferrer" className="text-[#505F52] hover:underline">@vazirbbv</a></strong>
              </p>
            </div>
            <p className="text-black font-normal text-xl md:text-2xl pt-6">
              Вступай в <strong className="font-bold">Академию</strong> и начни зарабатывать свои <strong className="font-bold">первые <span className="relative inline-block whitespace-nowrap">2-3к$<svg className="absolute w-full h-2 -bottom-1 left-0 text-[#D9520E]" viewBox="0 0 100 12" preserveAspectRatio="none"><path d="M 2 10 Q 50 0, 98 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" /></svg></span></strong>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mt-6">
            <a href="https://t.me/m/kc7c6c7WMmI6" target="_blank" rel="noopener noreferrer" className="bg-[#505F52] hover:bg-[#3D493E] text-white font-bold py-2 px-6 rounded-md transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(80,95,82,0.4)] w-full sm:w-auto text-center flex flex-col items-center justify-center">
              <span className="text-sm font-bold uppercase tracking-wide">ОПЛАТИТЬ ПЕРЕВОДОМ</span>
              <span className="text-[10px] text-white/80 mt-0.5 uppercase tracking-wide block">(КАРТА И КРИПТА)</span>
            </a>
            <a href="https://t.me/tribute/app?startapp=ep_8xoiSrvBZ2HvEGCdxAbb6xp7cq4GU6hVUA7QJnwIVS0l1yI1hO" target="_blank" rel="noopener noreferrer" className="bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold py-2 px-6 rounded-md transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(42,171,238,0.4)] w-full sm:w-auto text-center flex flex-col items-center justify-center">
              <span className="text-sm font-bold uppercase tracking-wide">ОПЛАТИТЬ ЧЕРЕЗ TRIBUTE</span>
              <span className="text-[10px] text-white/80 mt-0.5 uppercase tracking-wide block">(Любые карты)</span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Block 5: Footer */}
      <footer className="py-8 px-6 border-t border-stone-200 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 text-black text-sm text-center">
            <Link to="/disclaimer" className="hover:text-black transition-colors">Дисклеймер</Link>
            <Link to="/offer" className="hover:text-black transition-colors">Договор оферты</Link>
            <Link to="/privacy" className="hover:text-black transition-colors">Политика конфиденциальности</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AccordionItem({ title, content }: { title: string, content: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white hover:bg-stone-50 border border-stone-200 mb-4 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 px-6 md:px-8 flex justify-between items-center text-left focus:outline-none group cursor-pointer"
      >
        <span className="text-xl md:text-2xl font-medium group-hover:text-[#505F52] transition-colors">{title}</span>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-stone-100 group-hover:bg-[#505F52]/10 transition-colors`}>
          <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-[#505F52] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 pb-8 px-6 md:px-8' : 'max-h-0 opacity-0 px-6 md:px-8'}`}
      >
        <div className="text-black text-lg leading-relaxed pt-2 border-t border-stone-200">{content}</div>
      </div>
    </div>
  );
}

function FaqItem({ title, content }: { title: string, content: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white hover:bg-stone-50 border border-stone-200 mb-4 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 px-6 md:px-8 flex justify-between items-center text-left focus:outline-none group cursor-pointer"
      >
        <span className="text-lg md:text-xl font-medium group-hover:text-[#505F52] transition-colors">{title}</span>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-stone-100 group-hover:bg-[#505F52]/10 transition-colors shrink-0 ml-4`}>
          <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-[#505F52] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 pb-6 px-6 md:px-8' : 'max-h-0 opacity-0 px-6 md:px-8'}`}
      >
        <div className="text-black text-base leading-relaxed pt-2 border-t border-stone-200">{content}</div>
      </div>
    </div>
  );
}

function SectionDivider() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-32 relative flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_50%,transparent)]">
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full stroke-stone-200">
            <defs>
              <pattern id="divider-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M.5 32V.5H32" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#divider-grid)" />
          </svg>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#505F52] to-transparent"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-16 bg-[#505F52]/10 blur-3xl rounded-full pointer-events-none"></div>
    </motion.div>
  );
}

function GridBackground({ className = "[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" }: { className?: string }) {
  const patternId = useId();
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 -z-10 h-full w-full stroke-stone-200 ${className}`}
    >
      <defs>
        <pattern
          x="50%"
          y="0"
          id={patternId}
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="0" className="overflow-visible fill-stone-100/50">
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          strokeWidth="0"
        />
      </svg>
      <rect fill={`url(#${patternId})`} width="100%" height="100%" strokeWidth="0" />
    </svg>
  );
}
