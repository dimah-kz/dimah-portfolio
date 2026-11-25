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
    hero: "github",
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
    "Figma",
  ],

  repository: "https://github.com/dimah-kz/dimah-portfolio",

  copy: {
    en: {
      description:
        "Full-stack developer focused on React and Next.js, building maintainable web applications and open-source tools.",
      tagline: "Full-stack TypeScript developer",
      contact:
        "Have a role, a project, or a question in mind? I'd be glad to hear about it. Telegram is the fastest way to reach me.",
      home: {
        headline: "Building modern web apps",
        headlineAccent: "with React and Next.js.",
        intro:
          "I work across the React ecosystem with Next.js as my main framework, taking products from the database to the interface. I care about clean, maintainable code, and I share much of my work as open source.",
      },
      about: {
        paragraphs: [
          "I'm Dimah, a full-stack developer born in Shiraz in 2006 and a computer engineering student at Shiraz University. Mathematics was my first love, and the same pull toward logic and problem-solving led me to programming, which has been my passion ever since.",
          "My work centers on the React ecosystem, with Next.js as my main framework. I write TypeScript end to end, from the interface to the APIs and databases behind it, and I aim for code that is clear, well structured, and easy for a team to maintain. My background in UI design with Figma helps me bring design and code together, building precise, polished interfaces that work equally well in English and Persian, left to right and right to left.",
          "I'm a firm believer in open source. Working in the open keeps code transparent, invites review and contributions, and lets others learn from it and build on it. That's why I publish most of my work under dimah-kz, with documentation written for both people and coding agents.",
        ],
        journey: [
          {
            period: "Growing up",
            title: "Games and business on a phone",
            description:
              "Without a computer, everything happened on a phone: first games, then a few small businesses that earned me an income. The ideas and packages behind them kept drawing me toward the web.",
          },
          {
            period: "16–18",
            title: "A love of mathematics",
            description:
              "Math and the basic sciences were my strongest interests at school. I spent two years preparing intensively for the Konkur, Iran's national university entrance exam.",
          },
          {
            period: "17",
            title: "My first computer",
            description:
              "I bought a computer of my own, my first step from the phone toward building for the web.",
          },
          {
            period: "After the Konkur",
            title: "WordPress and UI design",
            description:
              "I started building websites with WordPress and, at the same time, grew passionate about graphic and interface design. I learned Figma in depth and became a UI designer, a background that still shapes how I build interfaces.",
          },
          {
            period: "University",
            title: "Computer engineering at Shiraz University",
            description:
              "I study computer engineering at Shiraz University, pairing a formal foundation with hands-on projects.",
          },
          {
            period: "Today",
            title: "Full-stack development and open source",
            description:
              "From WordPress and UI design I moved into programming. Today I build full-stack applications with React and Next.js and maintain open-source tools.",
          },
        ],
      },
    },

    fa: {
      name: "دیماه",
      description:
        "توسعه‌دهنده فول‌استک با تمرکز بر React و Next.js؛ سازنده وب‌اپلیکیشن‌های قابل نگهداری و ابزارهای متن‌باز.",
      tagline: "توسعه‌دهنده فول‌استک TypeScript",
      contact:
        "فرصت همکاری، پروژه یا سؤالی دارید؟ خوشحال می‌شوم با من در میان بگذارید. سریع‌ترین راه ارتباط با من تلگرام است.",
      home: {
        headline: "ساخت وب‌اپلیکیشن‌های مدرن",
        headlineAccent: "با React و Next.js.",
        intro:
          "در اکوسیستم React کار می‌کنم و فریم‌ورک اصلی‌ام Next.js است؛ محصول را از دیتابیس تا رابط کاربری می‌سازم. به کد تمیز و قابل نگهداری اهمیت می‌دهم و بخش زیادی از کارهایم را به‌صورت متن‌باز منتشر می‌کنم.",
      },
      about: {
        paragraphs: [
          "دیماه هستم، توسعه‌دهنده فول‌استک، متولد ۱۳۸۵ در شیراز و دانشجوی مهندسی کامپیوتر دانشگاه شیراز. ریاضی اولین عشقم بود و همان علاقه به منطق و حل مسئله مرا به برنامه‌نویسی رساند؛ کاری که از آن روز تا امروز عاشقش هستم.",
          "تمرکز کارم روی اکوسیستم React است و فریم‌ورک اصلی‌ام Next.js. با TypeScript از رابط کاربری تا API و دیتابیس پشت آن را می‌نویسم و دنبال کدی هستم که خوانا، ساختارمند و برای کار تیمی قابل نگهداری باشد. سابقه‌ام در طراحی رابط کاربری با فیگما کمک می‌کند طراحی و کد را به هم نزدیک کنم و رابط‌هایی دقیق و تمیز بسازم که به فارسی و انگلیسی، راست‌به‌چپ و چپ‌به‌راست، به یک اندازه درست کار کنند.",
          "به متن‌باز باور عمیقی دارم. کدی که آشکارا منتشر می‌شود شفاف‌تر است، بازبینی و مشارکت دیگران را به همراه دارد و به همه اجازه می‌دهد از آن یاد بگیرند و رویش بسازند. برای همین بیشتر کارهایم را با نام dimah-kz متن‌باز منتشر می‌کنم، همراه با مستنداتی که هم برای آدم‌ها نوشته شده و هم برای ایجنت‌های برنامه‌نویسی.",
        ],
        journey: [
          {
            period: "از کودکی",
            title: "بازی و کسب‌وکار با یک گوشی",
            description:
              "کامپیوتر نداشتم و همه‌چیز روی گوشی می‌گذشت: اول بازی، بعد چند کسب‌وکار کوچک که از آن‌ها درآمد داشتم. ایده‌ها و پکیج‌هایی که برایشان داشتم، کم‌کم مرا به سمت وب کشاند.",
          },
          {
            period: "۱۶ تا ۱۸ سالگی",
            title: "عشق به ریاضی",
            description:
              "ریاضی و علوم پایه بیشترین علاقه‌ام در مدرسه بود و دو سال فشرده برای کنکور آماده شدم.",
          },
          {
            period: "۱۷ سالگی",
            title: "اولین کامپیوتر",
            description:
              "اولین کامپیوتر شخصی‌ام را خریدم؛ قدم اول از گوشی به سمت ساختن برای وب.",
          },
          {
            period: "بعد از کنکور",
            title: "وردپرس و طراحی رابط کاربری",
            description:
              "ساخت وب‌سایت را با وردپرس شروع کردم و هم‌زمان به گرافیک و طراحی رابط کاربری علاقه زیادی پیدا کردم. فیگما را عمیق یاد گرفتم و طراح رابط کاربری شدم؛ تجربه‌ای که هنوز در شیوه ساختن رابط‌هایم نقش دارد.",
          },
          {
            period: "دانشگاه",
            title: "مهندسی کامپیوتر در دانشگاه شیراز",
            description:
              "دانشجوی مهندسی کامپیوتر دانشگاه شیراز هستم و پایه‌های نظری را در کنار پروژه‌های عملی جلو می‌برم.",
          },
          {
            period: "امروز",
            title: "توسعه فول‌استک و متن‌باز",
            description:
              "از وردپرس و طراحی رابط کاربری به برنامه‌نویسی رسیدم. امروز با React و Next.js اپلیکیشن‌های فول‌استک می‌سازم و ابزارهای متن‌باز توسعه می‌دهم و نگهداری می‌کنم.",
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
