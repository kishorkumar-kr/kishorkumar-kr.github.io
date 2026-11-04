// Everything on the site lives here. Most text has two versions:
//   plain: for recruiters, HR and anyone non-technical
//   tech:  for engineers
export type Dual = { plain: string; tech: string };

export const profile = {
  name: 'Kishorkumar K R',
  short: 'Kishor', // used in "The Kishor Times"
  role: 'Software Engineer II',
  years: 4,
  since: 'Jan 2023',
  // Front-page title style:
  //   'press'   = masthead with side boxes, name is "printed" in ink
  //   'classic' = the big full-width name with letters dropping in (first design)
  //   'crossword' = name as a crossword answer, letters type into the squares
  //   'times'   = "The Kishor Times" newspaper title with your name as editor
  //   'editorial' = huge left-aligned first name, initials + title in a side column
  //   'poster'  = KISHOR KUMAR K.R. in heavy block capitals, KUMAR in red
  //   'clipping' = name on a torn, taped newspaper clipping (current)
  nameplate: 'clipping' as 'clipping' | 'poster' | 'editorial' | 'times' | 'crossword' | 'press' | 'classic',
  headline: {
    plain: 'Builds the parts of apps you never see, and couldn’t live without.',
    tech: 'Backend engineer: Node.js, NestJS & TypeScript services that scale.',
  },
  summary: {
    plain: 'For 4+ years I’ve built the engine behind apps: the part that takes payments, sends WhatsApp and email updates, runs video calls and keeps people’s data safe. Today that’s healthcare software for clinics in the UK.',
    tech: 'Backend-focused engineer with 4+ years on Node.js, NestJS and TypeScript: REST APIs, real-time (WebSockets, SSE), job queues (BullMQ / Redis), PostgreSQL, Elasticsearch and AWS. Currently building HIPAA / GDPR-aware healthcare services.',
  },
  // Empty ones are hidden on the live site.
  links: {
    email: 'kishorkumar.offl@gmail.com',
    linkedin: 'https://www.linkedin.com/in/kishor-kumar14112000/',
    github: 'https://github.com/kishor-14112000',
    resume: '', // e.g. 'resume.pdf' (put the file in /public)
  },
};

// Front page: the numbers, straight from the résumé.
export const numbers = [
  { value: 4, suffix: '+', label: 'years building software', note: 'since Jan 2023' },
  { value: 30, suffix: '%', label: 'less server load', note: 'after I redesigned a backend' },
  { value: 5, suffix: 'M+', label: 'ads collected a month', note: 'by tools I wrote' },
  { value: 6, suffix: ' mo', label: 'to ship a full product', note: 'on my own, end to end' },
];

// News ticker: the kind of things my code makes happen.
export const live = [
  { title: 'Payment received', tool: 'Stripe' },
  { title: 'Doctor’s ID verified', tool: 'Onfido' },
  { title: 'Video consultation started', tool: 'Jitsi' },
  { title: 'WhatsApp reminder sent', tool: 'WhatsApp Business API' },
  { title: 'Invoice reminder queued', tool: 'n8n + BullMQ' },
  { title: 'Receipt emailed', tool: 'AWS SES' },
  { title: 'Search results in milliseconds', tool: 'Elasticsearch' },
  { title: 'Exam screen updated live', tool: 'WebSockets' },
];

export type Job = {
  company: string; role: string; from: string; to: string; field: string;
  headline: Dual; points: Dual[]; stack: string[];
};

export const jobs: Job[] = [
  {
    company: 'Daivtech Solution Pvt. Ltd.', role: 'Software Engineer II', from: 'Feb 2025', to: 'Present',
    field: 'Healthcare software for UK clinics',
    headline: {
      plain: 'Building the systems behind online doctor visits',
      tech: 'Healthcare backend on NestJS, PostgreSQL, Redis, Elasticsearch & AWS',
    },
    points: [
      { plain: 'Built the parts of a healthcare platform that handle patients, prescriptions, lab tests, scans and billing.',
        tech: 'Built backend modules for prescriptions, patient management, laboratory, medical scans, billing and notifications.' },
      { plain: 'Doctors prove who they are with an ID check, then see patients over private video calls.',
        tech: 'Integrated Onfido for doctor verification and Jitsi Meet video consultations secured with JWT.' },
      { plain: 'Payment reminders and patient updates now go out by themselves, over WhatsApp, email and SMS.',
        tech: 'Automated invoice reminders with n8n, BullMQ and Redis; notifications via WhatsApp Business API, AWS SES and SNS.' },
      { plain: 'Set up secure online card payments for UK healthcare clients.',
        tech: 'Implemented the Stripe payment gateway for UK healthcare clients.' },
      { plain: 'Test the apps for security holes and follow medical privacy rules (HIPAA, GDPR, SOC 2).',
        tech: 'Burp Suite testing, SQL-injection mitigation, .env secret management, JWT + RBAC, SOC 2 / GDPR / HIPAA practices.' },
    ],
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'Elasticsearch', 'AWS', 'Docker', 'BullMQ'],
  },
  {
    company: 'Adcanopus Digital Media Pvt. Ltd.', role: 'Software Engineer', from: 'Jul 2024', to: 'Feb 2025',
    field: 'Digital advertising',
    headline: {
      plain: 'Made an advertising platform faster, and its reports automatic',
      tech: 'Ad-tech data backend on Express.js, PostgreSQL, Elasticsearch & AWS',
    },
    points: [
      { plain: 'Redesigned the backend so data moved faster and servers did 30% less work. Delivered ahead of schedule.',
        tech: 'Designed a scalable backend architecture that sped up data processing and cut server load by 30%.' },
      { plain: 'Brought Facebook ad spending and partner-site revenue into one place, so the team could see profit at a glance.',
        tech: 'Integrated the Facebook Ads Manager API (spend) with third-party portal APIs (revenue).' },
      { plain: 'Daily reports now post themselves in Slack every morning and evening.',
        tech: 'Automated Slack workflows that generate and distribute twice-daily reports.' },
      { plain: 'Wrote tools that collect over 5 million ads every month from Facebook’s public Ads Library.',
        tech: 'Built Node.js + Puppeteer extraction tools scraping 5M+ ads a month from the Facebook Ads Library.' },
    ],
    stack: ['Node.js', 'Express.js', 'PostgreSQL', 'Elasticsearch', 'AWS'],
  },
  {
    company: 'Iamneo Edutech Pvt. Ltd.', role: 'Junior Software Engineer', from: 'Jan 2023', to: 'Jun 2024',
    field: 'Online learning & exams',
    headline: {
      plain: 'Built the “third eye” that keeps online exams fair',
      tech: 'Full-stack on Angular, Hapi.js, MySQL, Firebase, Redis & WebSockets',
    },
    points: [
      { plain: 'Worked on both the screens people use and the servers behind them, for students and for admins.',
        tech: 'Frontend and backend development for user-side and admin-side applications.' },
      { plain: 'Led a whole project on my own and delivered the complete product in 6 months.',
        tech: 'Independently led a full-stack project to delivery in 6 months: Angular, Node.js (Hapi.js), MySQL, Tailwind CSS.' },
      { plain: 'Led “Secondary Camera”, known as the third eye of online exams: an extra camera view that keeps exams honest.',
        tech: 'Spearheaded “Secondary Camera” with Angular / TypeScript, Hapi.js, WebSockets, Firebase, AWS DynamoDB, Redis and browser storage.' },
    ],
    stack: ['Angular', 'Hapi.js', 'MySQL', 'Firebase', 'Redis', 'WebSockets'],
  },
];

export const education = [
  { degree: 'Master of Science, Data Science', school: 'Vellore Institute of Technology, Vellore', years: '2021 – 2023', score: '8.54 CGPA' },
  { degree: 'Bachelor of Computer Applications', school: 'Vellore Institute of Technology, Vellore', years: '2018 – 2021', score: '8.19 CGPA' },
];

// Explainer strip: what happens behind one tap.
export const story = [
  { icon: 'tap', title: 'You tap “Pay”.',
    plain: 'The app sends a request to a server: a computer that does the real work.',
    tech: 'The client (React / Angular) calls a REST endpoint on a NestJS service.' },
  { icon: 'shield', title: 'It checks it’s really you.',
    plain: 'The server confirms you’re logged in and allowed to do this.',
    tech: 'JWT / OAuth authentication with role-based access guards.' },
  { icon: 'card', title: 'The card is charged.',
    plain: 'Through a trusted payment provider. Your card number is never stored.',
    tech: 'Stripe payment flow with server-side confirmation and webhooks.' },
  { icon: 'db', title: 'The order is saved.',
    plain: 'Stored safely in a database, even if thousands order at once.',
    tech: 'Transactional writes in PostgreSQL / MySQL, Redis caching.' },
  { icon: 'chat', title: 'Messages go out.',
    plain: 'Receipt email and WhatsApp update, sent in the background.',
    tech: 'BullMQ jobs fan out to AWS SES, SNS and WhatsApp Business API.' },
  { icon: 'check', title: '“Paid ✓” appears.',
    plain: 'Instantly, with no refresh. All of it in about a second.',
    tech: 'Status pushed over WebSockets / Server-Sent Events.' },
];

export type Skill = { name: string; desc: string };
export type Group = { id: string; plain: string; tech: string; items: Skill[] };

export const groups: Group[] = [
  {
    id: 'build', plain: 'Builds apps & websites', tech: 'Languages & Frameworks',
    items: [
      { name: 'JavaScript', desc: 'The language of the web. Almost every website uses it.' },
      { name: 'TypeScript', desc: 'JavaScript with safety checks that catch mistakes early.' },
      { name: 'Node.js', desc: 'Lets JavaScript run on servers, not just in the browser.' },
      { name: 'NestJS', desc: 'A framework for large, well-organised server applications.' },
      { name: 'Express.js', desc: 'A lightweight toolkit for building web servers.' },
      { name: 'Hapi.js', desc: 'A server framework with strong built-in data checks.' },
      { name: 'React.js', desc: 'Builds the screens and buttons people use.' },
      { name: 'Angular', desc: 'Google’s framework for big web applications.' },
      { name: 'HTML5', desc: 'The structure of every web page.' },
      { name: 'CSS3', desc: 'The look of a web page: colours, fonts and layout.' },
      { name: 'Tailwind CSS', desc: 'A faster way to style pages.' },
      { name: 'PrimeNG', desc: 'Ready-made tables, menus and forms for Angular.' },
    ],
  },
  {
    id: 'connect', plain: 'Connects payments & messaging', tech: 'Backend & APIs',
    items: [
      { name: 'REST APIs', desc: 'The standard way an app asks a server for data.' },
      { name: 'WebSockets', desc: 'An always-open connection for instant updates, as in chat.' },
      { name: 'Server-Sent Events', desc: 'A live one-way feed from server to screen.' },
      { name: 'BullMQ', desc: 'A waiting line for slow jobs so the app stays fast.' },
      { name: 'Redis Queues', desc: 'Task lists that make sure background work runs in order.' },
      { name: 'WhatsApp Business API', desc: 'Sends WhatsApp messages automatically.' },
      { name: 'Stripe', desc: 'Online card payments and subscriptions.' },
      { name: 'Jitsi Meet API', desc: 'Video calls inside an app.' },
      { name: 'Onfido API', desc: 'Checks ID documents and selfies to verify people.' },
      { name: 'n8n', desc: 'Automates repetitive steps between different apps.' },
    ],
  },
  {
    id: 'store', plain: 'Stores & finds information', tech: 'Databases & Search',
    items: [
      { name: 'PostgreSQL', desc: 'A powerful database for users, orders and payments.' },
      { name: 'MySQL', desc: 'One of the world’s most used databases.' },
      { name: 'Redis', desc: 'A very fast memory store that makes pages load quicker.' },
      { name: 'Elasticsearch', desc: 'Search across huge amounts of data in milliseconds.' },
      { name: 'Firebase Firestore', desc: 'Google’s cloud database that syncs in real time.' },
      { name: 'MongoDB (basics)', desc: 'Stores data as flexible documents.' },
    ],
  },
  {
    id: 'run', plain: 'Runs it in the cloud', tech: 'Cloud & DevOps',
    items: [
      { name: 'AWS S3', desc: 'Amazon’s cloud storage for files and images.' },
      { name: 'AWS SES', desc: 'Amazon’s email sending service.' },
      { name: 'AWS SNS', desc: 'Amazon’s notification and SMS service.' },
      { name: 'Docker', desc: 'Packs an app so it runs the same everywhere.' },
      { name: 'Docker Compose', desc: 'Starts an app and its database together.' },
      { name: 'Secret Management', desc: 'Keeps passwords and keys out of the code.' },
      { name: 'Git', desc: 'Records every change so teams can work together.' },
      { name: 'GitLab', desc: 'Stores code, reviews changes and automates releases.' },
    ],
  },
  {
    id: 'protect', plain: 'Keeps it safe & legal', tech: 'Security & Testing',
    items: [
      { name: 'Burp Suite', desc: 'Finds security holes before attackers do.' },
      { name: 'JWT', desc: 'A tamper-proof digital pass that proves you’re logged in.' },
      { name: 'OAuth', desc: '“Sign in with Google”-style login.' },
      { name: 'RBAC', desc: 'Each role sees only what it’s allowed to.' },
      { name: 'SQL Injection Testing', desc: 'Makes sure forms can’t be used to attack the database.' },
      { name: 'API Security', desc: 'Guards the connections between apps and servers.' },
      { name: 'GDPR', desc: 'Europe’s personal data protection law.' },
      { name: 'HIPAA', desc: 'US rules for keeping medical data private.' },
      { name: 'SOC 2', desc: 'A standard showing a company handles data securely.' },
    ],
  },
];

export const compliance = [
  { name: 'GDPR', plain: 'Personal data is collected fairly, kept safe and deleted on request.' },
  { name: 'HIPAA', plain: 'Medical information stays private and every access is tracked.' },
  { name: 'SOC 2', plain: 'Customer data is handled with proper controls and audits.' },
];

export const totalSkills = groups.reduce((n, g) => n + g.items.length, 0);
