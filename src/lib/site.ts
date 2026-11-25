import type { Locale } from "@/i18n/locales";
import type { SiteConfig, SiteCopy } from "./site-config";

/**
 * Who this site is about, and the home page copy.
 *
 * The committed values are Dimah's public profile (https://github.com/dimah-kz)
 * and are the demo content of the template. Replace them to make the site yours.
 * Every field is described in `src/lib/site-config.ts`.
 *
 * Everything else that is about you lives in `content/`:
 * projects in `content/projects`, work history in `content/experience`,
 * and posts in `content/blog`.
 */
export const site: SiteConfig = {
  name: "dimah",
  url: "https://dimah.dev",

  author: {
    name: "Dimah",
    avatar: "/avatar.png",
  },

  profiles: {
    telegram: "https://t.me/dimahkz",
    github: "https://github.com/dimah-kz",
    x: "https://x.com/dimahkzx",
    email: "dimahkz.dev@gmail.com",
  },

  contact: {
    primary: "telegram",
  },

  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "shadcn/ui",
    "Better Auth",
    "Drizzle",
    "PostgreSQL",
    "oRPC",
    "AWS SDK",
    "Turborepo",
    "WordPress",
  ],

  repository: "https://github.com/dimah-kz/dimah-portfolio",

  copy: {
    en: {
      description:
        "Full-stack developer building open-source tools for React and Next.js.",
      tagline: "Full-stack TypeScript developer",
      contact:
        "Have a question, an idea, or a project in mind? Telegram is the quickest way to reach me. For a bug or a feature request, open an issue on the project's repository.",
      home: {
        headline: "Open-source building blocks",
        headlineAccent: "for React and Next.js.",
        intro:
          "My main project is dimah-s3, a full-stack S3 toolkit for React: the server signs each upload and the browser sends the file straight to the bucket. I also maintain dimah-starter, dimah-survey, and the template behind this site.",
      },
      about: {
        paragraphs: [
          "I'm Dimah, a full-stack developer born in 2006. I write TypeScript from end to end, from React interfaces to the servers and databases behind them, and I publish most of what I build as open source under dimah-kz.",
          "I like software that is easy to understand and easy to own: logic that stays on the server, documentation that people and coding agents can both read, and interfaces that work in English and Persian, left to right and right to left.",
        ],
        journey: [
          {
            period: "Growing up",
            title: "Games and business on a phone",
            description:
              "I was a gamer without a computer, so everything happened on a phone: the games, and a few small businesses that earned me an income. The ideas and packages behind them kept pulling me toward the web.",
          },
          {
            period: "16–18",
            title: "Math, science, and the Konkur",
            description:
              "Math and the basic sciences were what I loved most at school. I spent two years studying hard for the Konkur, the national university entrance exam.",
          },
          {
            period: "17",
            title: "My first computer",
            description: "I finally bought a computer of my own.",
          },
          {
            period: "After the Konkur",
            title: "First websites, with WordPress",
            description: "I started building websites with WordPress.",
          },
          {
            period: "Today",
            title: "Programming and open source",
            description:
              "From WordPress I moved into programming. Now I build and maintain open-source tools for React and Next.js.",
          },
        ],
      },
    },

    fa: {
      name: "دیماه",
      description:
        "توسعه‌دهنده فول‌استک و سازنده ابزارهای متن‌باز برای React و Next.js.",
      tagline: "توسعه‌دهنده فول‌استک TypeScript",
      contact:
        "سؤال، ایده یا پروژه‌ای در ذهن دارید؟ سریع‌ترین راه ارتباط با من تلگرام است. برای گزارش باگ یا پیشنهاد قابلیت، در مخزن همان پروژه یک issue باز کنید.",
      home: {
        headline: "ابزارهای متن‌باز",
        headlineAccent: "برای React و Next.js.",
        intro:
          "پروژه اصلی‌ام dimah-s3 است، جعبه‌ابزار فول‌استک S3 برای React: سرور هر آپلود را امضا می‌کند و مرورگر فایل را مستقیم به باکت می‌فرستد. در کنارش dimah-starter، dimah-survey و قالب همین سایت را هم نگهداری می‌کنم.",
      },
      about: {
        paragraphs: [
          "دیماه هستم، متولد ۱۳۸۵ و توسعه‌دهنده فول‌استک. از رابط کاربری React تا سرور و پایگاه داده پشت آن را با TypeScript می‌نویسم و بیشتر کارهایم را با نام dimah-kz متن‌باز منتشر می‌کنم.",
          "نرم‌افزاری را دوست دارم که فهمیدن و نگه‌داشتنش ساده باشد: منطقی که روی سرور می‌ماند، مستنداتی که هم آدم‌ها و هم ایجنت‌های برنامه‌نویسی بتوانند بخوانند، و رابطی که به فارسی و انگلیسی، راست‌به‌چپ و چپ‌به‌راست، درست کار کند.",
        ],
        journey: [
          {
            period: "از کودکی",
            title: "بازی و کسب‌وکار با یک گوشی",
            description:
              "گیمر بودم اما کامپیوتر نداشتم، پس همه‌چیز روی گوشی می‌گذشت: بازی‌ها، و چند کسب‌وکار کوچک که با همان گوشی از آن‌ها درآمد داشتم. ایده‌ها و پکیج‌هایی که برایشان داشتم، کم‌کم مرا به سمت وب کشاند.",
          },
          {
            period: "۱۶ تا ۱۸ سالگی",
            title: "ریاضی، علوم پایه و کنکور",
            description:
              "در مدرسه عاشق ریاضی و علوم پایه بودم و دو سال تمام، جدی برای کنکور درس خواندم.",
          },
          {
            period: "۱۷ سالگی",
            title: "اولین کامپیوتر",
            description: "بالاخره توانستم اولین کامپیوتر خودم را بخرم.",
          },
          {
            period: "بعد از کنکور",
            title: "اولین سایت‌ها با وردپرس",
            description: "ساختن وب‌سایت را با وردپرس شروع کردم.",
          },
          {
            period: "امروز",
            title: "برنامه‌نویسی و متن‌باز",
            description:
              "از وردپرس به برنامه‌نویسی رسیدم و حالا ابزارهای متن‌باز برای React و Next.js می‌سازم و نگهداری می‌کنم.",
          },
        ],
      },
    },
  },
};

/** The copy of one language. */
export function siteCopy(locale: Locale): SiteCopy {
  return site.copy[locale];
}

/** The author's name in a language: `copy.<locale>.name`, else `author.name`. */
export function authorName(locale: Locale): string {
  return siteCopy(locale).name ?? site.author.name;
}

/** The whole hero title, for browser titles and share cards. */
export function headline(locale: Locale): string {
  const { home } = siteCopy(locale);
  return `${home.headline} ${home.headlineAccent}`;
}
