# PRO HOME — Landing Page

Qurilish kompaniyalari uchun sotuvni boshqarish platformasining marketing landing sahifasi.
Next.js 14 (App Router) + TypeScript + Tailwind CSS asosida qurilgan.

## Texnologiyalar

- **Next.js 14** (App Router, server komponentlar)
- **TypeScript** (strict mode)
- **Tailwind CSS** — dizayn tokenlari `tailwind.config.ts` da markazlashtirilgan
- **Zustand** — til tanlovi uchun global state (localStorage'da saqlanadi)
- **@fontsource-variable/inter** — offline/self-hosted shrift (tashqi tarmoqqa bog'liq emas)
- **lucide-react** — ikonlar
- IntersectionObserver asosidagi yengil scroll-reveal animatsiyasi (qo'shimcha kutubxonasiz)

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # Telegram sozlamalarini kiriting
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Kod sifatini tekshirish:

```bash
npm run lint
```

## Telegram bot integratsiyasi

"Biz bilan bog'laning" formasidagi arizalar `/api/contact` route orqali serverda qayta ishlanadi
va Telegram botga yuboriladi. Token va chat ID **faqat serverda** saqlanadi, clientga hech qachon chiqmaydi.

1. [@BotFather](https://t.me/BotFather) orqali yangi bot yarating va tokenini oling.
2. Arizalar yuboriladigan chat/kanal ID sini aniqlang (bot o'sha chatga admin/a'zo bo'lishi kerak).
3. `.env.local` faylida quyidagilarni to'ldiring:

```
TELEGRAM_BOT_TOKEN=123456:AAExample-Token
TELEGRAM_CHAT_ID=-1001234567890
```

4. Deploy qilishda (Vercel, VPS va h.k.) shu ikkala o'zgaruvchini environment variables sifatida kiriting.

## Xavfsizlik choralari

- Telegram token/chat ID faqat server-side (`server-only` paketi bilan himoyalangan)
- `/api/contact` da IP bo'yicha rate-limit (1 daqiqada 5 ta so'rov)
- Server va client tomonda validatsiya (ism, telefon formati, uzunlik chegaralari)
- XSS'ga qarshi matn tozalash (`sanitizeText`)
- Bot arizalarga qarshi honeypot maydon (`website`)
- Telegram MarkdownV2 uchun maxsus belgilar escape qilinadi
- HTTP xavfsizlik headerlari (`next.config.mjs`): X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy

## Papka tuzilishi

```
app/
  layout.tsx          Root layout, shrift va metadata
  page.tsx             Bosh sahifa — barcha sectionlarni birlashtiradi
  globals.css          Global stillar
  api/contact/route.ts Telegram'ga ariza yuborish API route'i
components/
  Header.tsx           Sticky navigatsiya + til almashtirish
  Footer.tsx
  Loader.tsx           3 soniyalik zig-zag loader
  ContactForm.tsx       Aloqa formasi (client component)
  sections/            Har bir landing bo'limi alohida komponent
  ui/                  Qayta ishlatiladigan UI qismlari (Button, SectionHeading, AnimatedSection)
lib/
  i18n/                uz/ru/en lug'atlari va useTranslation hook
  store/               Zustand — til tanlovi
  hooks/                useInView — scroll-reveal uchun
utils/
  cn.ts                Tailwind class birlashtiruvchi
  icons.tsx             Ikon nomi → lucide komponent map
  rateLimit.ts          Oddiy in-memory rate limiter
  telegram.ts            Telegram API'ga xabar yuborish
  validation.ts          Forma validatsiyasi
types/
  index.ts              Umumiy TypeScript turlari
public/images/          Qurilish loyihalari rasmlari (placeholder — o'zingiznikiga almashtiring)
```

## Rasmlarni almashtirish

`public/images/building-1.jpg` dan `building-6.jpg` gacha bo'lgan fayllar — placeholder rasmlar.
Ularni xuddi shu nomlar bilan o'z loyihalaringiz rasmlariga almashtiring, kod o'zgarishi shart emas.

## Tillarni tahrirlash

Barcha matnlar `lib/i18n/uz.ts`, `lib/i18n/ru.ts`, `lib/i18n/en.ts` fayllarida.
`uz.ts` — asosiy manba (shape'ni belgilaydi); `ru.ts`/`en.ts` xuddi shu strukturada bo'lishi shart,
aks holda TypeScript build vaqtida xato beradi (bu qasddan qilingan — tarjima to'liqligini kafolatlaydi).
