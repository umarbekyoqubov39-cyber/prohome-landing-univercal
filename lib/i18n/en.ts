import type uz from "./uz";

const en: typeof uz = {
  nav: {
    home: "Home",
    problems: "Problems",
    solution: "Solution",
    dashboard: "Dashboard",
    trust: "Trust",
    offer: "Offer",
    cta: "Submit request",
  },
  hero: {
    eyebrow: "Attention construction companies!",
    title: "Your construction company has homes to sell.\nBut no sales system?",
    subtitle:
      "Did you know that every month hundreds of clients choose another developer instead of you?",
    cta: "Free sales diagnostic",
  },
  problems: {
    title:
      "The core problems of unsystematic sales in new construction projects",
    subtitle:
      "If your sales process isn't systematized, these problems show up in almost every project:",
    cards: [
      {
        icon: "userX",
        title: "Leads exist, sales don't",
        description:
          "Clients show interest, but without a systematic follow-up process they disappear before becoming buyers.",
      },
      {
        icon: "eyeOff",
        title: "No visibility into manager activity",
        description:
          "How many leads each manager is handling, how many deals they closed, what the conversion rate is — none of it is visible.",
      },
      {
        icon: "grid",
        title: "Confusing sales status",
        description:
          "Which unit is sold, which is reserved — manual spreadsheets mean the data constantly gets mixed up.",
      },
      {
        icon: "phoneOff",
        title: "No call center system",
        description:
          "Without tracking calls and inquiries, even your hottest leads can go unanswered.",
      },
      {
        icon: "barChart",
        title: "Insufficient financial control",
        description:
          "Revenue isn't visible in real time, making it hard for leadership to assess sales and plan ahead.",
      },
    ],
    solutionCard: {
      brand: "PRO HOME",
      title: "How can these problems be solved?",
      cta: "Start fixing these problems",
    },
  },
  consequences: {
    title: "What happens without a system?",
    problemCard: {
      title: "What happens without a system?",
      items: [
        "An inexperienced manager cools off even a ready-to-buy client",
        "No call center — hot leads go unanswered",
        "No analytics — a loss can look like a profit",
        "No financial control — cash flow goes unmonitored",
        "Sales team doesn't grow — a 10-50% growth opportunity is lost",
      ],
    },
    consequenceCard: {
      title: "The real consequence",
      items: [
        "Construction timelines drag on",
        "Client dissatisfaction increases",
        "Negative reviews pile up",
        "Investor confidence drops",
        "Company reputation declines",
      ],
    },
    warning:
      "These problems don't appear overnight — they quietly erode your business before you even notice.",
  },
  calculator: {
    title:
      "Do you know how much a small drop in conversion actually costs you?",
    example:
      "Example: 1 unit averages 600M UZS. If conversion drops by just 5%:",
    point1: "You lose 5 sales out of every 100 leads.",
    point2: "That's 5 × 600M = 3 billion UZS in lost revenue.",
    question: "Question: do you want a system to prevent this loss?",
    cta: "Yes, stop the losses",
  },
  platform: {
    title: "A professional platform for full control over construction sales",
    subtitle:
      "Based on real construction sales offices, call center processes, and mystery-shopper research, we deliver a practical, proven, working solution.",
    modules: [
      {
        icon: "layoutGrid",
        badge: "SALES",
        title: "PRO HOME SALES",
        points: [
          "Manage every unit and sales status in real time through a visual grid",
          "Monitor every stage of the sales process through the system",
          "Automatically generate reservations and contracts as PDFs",
          "A statistics panel that clearly shows each manager's performance",
          "A 2D and 3D visual sales module that speeds up client decisions",
          "A tracking system that keeps a full history of every sale",
        ],
      },
      {
        icon: "users",
        badge: "CRM",
        title: "PRO HOME CRM",
        url: "https://kotibam.uz/",
        points: [
          "Keep every lead tracked in the system without losing any",
          "Call center integration with monitoring of every call",
          "Automate callbacks and follow-up processes",
          "View conversion metrics in real time",
          "Transparent analysis of manager KPI performance",
          "A clear statistical dashboard for leadership",
        ],
      },
      {
        icon: "trendingUp",
        badge: "MARKETING",
        title: "Marketing + Lead Generation",
        points: [
          "A systematic traffic model that ensures a steady flow of clients",
          "Clear visibility into the cost of every lead and ad performance",
          "Analytics that identify which ad channel actually drives sales",
          "Optimization strategies focused on boosting conversion",
          "Tracking every marketing lead all the way through to a sale",
        ],
      },
    ],
    process: {
      title: "Implementation process",
      steps: [
        "Fully set up your call center workflow",
        "Integrate the CRM platform to match your company's process",
        "Train sales managers using real-world scenarios",
        "Implement a KPI and monitoring system",
        "Set up a real-time monitoring panel for leadership",
        "Optimize the entire sales funnel from start to finish",
      ],
      result:
        "As a result, every lead is tracked, manager performance is measured, and leadership runs the business on real numbers. The system reduces losses, boosts conversion, and brings sales under organized management.",
    },
  },
  dashboard: {
    title: "A real-time control panel for leadership",
    browserUrl: "app.prohome.uz/dashboard",
    chartTitle: "Monthly sales dynamics",
    metrics: [
      {
        icon: "users",
        value: "247",
        label: "Clients",
        delta: "+12%",
        accent: "blue",
      },
      {
        icon: "trendingUp",
        value: "23%",
        label: "Conversion",
        delta: "+5%",
        accent: "green",
      },
      {
        icon: "dollar",
        value: "45M",
        label: "Revenue",
        delta: "+18%",
        accent: "purple",
      },
      {
        icon: "barChart2",
        value: "18",
        label: "Sales",
        delta: "+3",
        accent: "teal",
      },
    ],
    facts: [
      "See how many clients each manager is handling — live",
      "See who closed how many sales — in exact statistics",
      "Conversion rate — calculated automatically",
      "Top manager rankings — updated in real time",
      "Monthly revenue — fully under financial control",
      "Total value of unsold units — visible at a glance",
      "Compare with last month — with growth dynamics",
    ],
    footer: "Leadership makes decisions based on real numbers, not guesswork.",
  },
  reputation: {
    title: "Reputation is your most valuable business asset",
    without: {
      title: "The consequences of sales without a system:",
      items: [
        "Delivery deadlines drag on",
        "Client trust declines",
        "Negative reviews increase online",
        "Investors start asking questions",
      ],
    },
    with: {
      title: "The results of systematic sales:",
      items: [
        "Cash flow speeds up",
        "Client trust strengthens",
        "Referrals bring in new clients",
        "Working with investors becomes easier",
      ],
    },
  },
  audit: {
    title:
      "A free 30-minute sales audit — we uncover the hidden losses in your business",
    subtitle: "During the diagnostic, you'll find out exactly:",
    points: [
      "The 3 biggest weak points in your sales system",
      "Where exactly you're losing conversion",
      "How much money you're losing every month without noticing",
    ],
    included: [
      "A professional visual management system for your sales office",
      "Full call center and CRM integration",
      "Real-time monitoring of manager KPIs and results",
      "A 30-day free trial period",
      "1 month of free CRM access",
      "A dedicated analytics dashboard for leadership",
    ],
    guarantee:
      "If your sales process hasn't sped up within 21 days, we'll continue the service for free.",
    cta: "Sign up for a free diagnostic",
  },
  contact: {
    phoneLabel: "",
    address: "Fergana city, Tadbirkorlar street, house 167",
    mapLink: "Open in Maps",
    brand: "PRO HOME",
    title: "Get in touch",
    form: {
      name: "Your name",
      namePlaceholder: "Abdullayev Sardor",
      phone: "Phone number",
      phonePlaceholder: "90 123 45 67",
      email: "Your email",
      emailPlaceholder: "sardor@example.com",
      company: "Company name",
      companyPlaceholder: "PRO HOME",
      submit: "Submit",
      submitting: "Sending...",
      success: "Your request has been received! We'll contact you soon.",
      error: "Something went wrong. Please try again or call us.",
    },
  },
  footer: {
    rights: "All rights reserved.",
  },
};

export default en;
