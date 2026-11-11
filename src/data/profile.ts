// Everything the site says lives in this file.
// Sources: the CV (github.com/ahsanauddry027/AhsanHabib_CV, LaTeX; D:\CV\HANDOFF.md has the verified facts behind it)
// and the READMEs at github.com/ahsanauddry027.
// Rule carried over from the CV project: do not add numbers, dates or skills that those sources don't back.

import { asset } from '../lib/asset';

const GH = 'https://github.com/ahsanauddry027';

export const profile = {
  name: 'Ahsan Habib',
  first: 'Ahsan',
  last: 'Habib',
  role: 'Backend Developer',
  location: 'Dhaka, Bangladesh',
  email: 'ahsanauddry.ndc@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ahsan-habib-0b3a62230',
  linkedinLabel: 'linkedin.com/in/ahsan-habib-0b3a62230',
  github: GH,
  githubLabel: 'github.com/ahsanauddry027',
  cv: asset('Ahsan_Habib_CV.pdf'),
  status: 'Open to backend roles',
  statusDetail: 'Graduating Fall 2026',
  intro:
    'Final-year CSE student at BRAC University. I design REST APIs in Spring Boot and Node.js, model the data in PostgreSQL, MySQL and MongoDB, and secure what I ship.',
} as const;

export interface Section {
  id: string;
  label: string;
  theme: 'dark' | 'paper';
}

export const sections: Section[] = [
  { id: 'top', label: 'Home', theme: 'dark' },
  { id: 'about', label: 'About', theme: 'dark' },
  { id: 'work', label: 'Selected work', theme: 'paper' },
  { id: 'lab', label: 'API lab', theme: 'dark' },
  { id: 'experience', label: 'Experience', theme: 'paper' },
  { id: 'research', label: 'Research', theme: 'dark' },
  { id: 'principles', label: 'How I build', theme: 'dark' },
  { id: 'stack', label: 'Stack', theme: 'paper' },
  { id: 'contact', label: 'Contact', theme: 'dark' },
];

export const stats = [
  { value: 3.76, decimals: 2, suffix: '', label: 'CGPA out of 4.00 at BRAC University' },
  { value: 3.95, decimals: 2, suffix: '', label: 'GPA in 300–400 level CSE courses' },
  { value: 30, decimals: 0, suffix: '', label: 'REST endpoints across my two APIs (11 + 19)' },
  { value: 95.5, decimals: 1, suffix: '', label: 'Thesis score out of 100, grade A' },
  { value: 3, decimals: 0, suffix: '×', label: 'Vice Chancellor’s List' },
  { value: 5, decimals: 0, suffix: '', label: 'People on the TrackAlert team I led as lead architect' },
];

export const marquee = [
  'Java', 'Spring Boot', 'PostgreSQL', 'Node.js', 'Express', 'REST APIs', 'MongoDB', 'MySQL',
  'PHP', 'Spring Data JPA', 'GitHub Actions', 'POSIX threads', 'Flex & Bison', 'PyTorch',
];

// ------------------------------------------------------------------ work

export type Tag = 'Backend' | 'Systems' | 'Embedded';

export type Visual =
  | { kind: 'endpoints'; title: string; rows: [method: string, path: string][]; more?: string }
  | { kind: 'pipeline'; title: string; steps: string[]; footer?: string }
  | { kind: 'code'; title: string; lines: string[] };

export interface Project {
  id: string;
  title: string;
  kicker: string;
  outcome: string;
  tags: Tag[];
  role: string;
  context: string;
  year: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  built: string[];
  decisions: { title: string; body: string }[];
  links: { label: string; href: string }[];
  visual: Visual;
  /** shown in the row instead of Role / Year / Stack */
  facts?: { label: string; value: string }[];
  /** what the project is trying to achieve, shown at the top of the case study */
  goal?: { title: string; body: string };
  /** framework and database of the whole project */
  architecture?: { layer: string; tech: string }[];
  /** my parts that are planned but not built yet */
  next?: { title: string; body: string }[];
}

export const projects: Project[] = [
  {
    id: 'kaaj',
    title: 'Kaaj The Job',
    kicker: 'AI job matching for Bangladesh · Spring Boot & PostgreSQL',
    outcome: 'A voice-first, Bangla-first job platform: people say what they can do in their own words and get matched to verified jobs nearby. My API covers the employer side: job posts and employer verification.',
    tags: ['Backend'],
    role: 'Backend developer',
    context: 'CSE471 individual assignment',
    year: 'Fall 2026',
    stack: ['Java 25', 'Spring Boot 4.1', 'Spring Data JPA', 'PostgreSQL 18', 'Postman'],
    facts: [
      { label: 'Role', value: 'Backend developer (individual)' },
      { label: 'Framework', value: 'Spring Boot 4.1 · Java 25' },
      { label: 'Database', value: 'PostgreSQL 18' },
      { label: 'Year', value: 'Fall 2026' },
    ],
    goal: {
      title: 'My end goal with Kaaj',
      body: 'Most jobs in Bangladesh are never advertised. They move through brokers, wall notices and Facebook groups, where the wage is often missing and fake recruiters charge “processing fees”. My end goal is Kaaj (কাজ, “work”) as a full platform: a 90-second voice note in Bangla becomes a profile, people are matched to verified jobs nearby with the reasons shown, and any post that asks job seekers for money is blocked. Job seekers never pay.',
    },
    architecture: [
      { layer: 'Backend', tech: 'Java 25 · Spring Boot 4.1 · Spring Modulith (a modular monolith) · Spring Data JPA' },
      { layer: 'Database', tech: 'PostgreSQL 18, with pgvector for matching, PostGIS for distance and pg_trgm for Bangla/English search · Flyway migrations' },
      { layer: 'Frontend', tech: 'React 19 · TypeScript · Vite · Tailwind CSS' },
      { layer: 'AI', tech: 'Spring AI 2.0: Gemini Flash for drafting, Whisper on Groq for Bangla speech, BGE-M3 on Ollama for matching' },
    ],
    next: [
      { title: 'AI job-post assistant', body: 'An employer types one sentence in Bangla, Banglish or English. Gemini drafts the full post in both languages as a typed JobDraft record, and Java rules flag a missing wage, fee requests, days over 8 hours and phone numbers.' },
      { title: 'Scam screening & moderation', body: 'Every post passes Bangla and English rule checks before it goes live (block, review or publish), with user reports and an admin queue.' },
      { title: 'Platform setup', body: 'User roles, an admin account, and one file-upload service with real file-type checks for photos, documents and voice notes.' },
    ],
    metrics: [
      { value: '11', label: 'REST endpoints' },
      { value: '2', label: 'state machines' },
      { value: '10', label: 'server-side rules' },
    ],
    built: [
      'Built 11 REST endpoints for two features, job posting and employer verification, in a controller → service → repository layout over PostgreSQL.',
      'Modelled job posts as a state machine (DRAFT, PUBLISHED, PAUSED, CLOSED). Each action is allowed only from certain states; anything else gets 409 Conflict.',
      'Linked the two features: an unverified employer’s posts wait as drafts and publish themselves the moment an admin approves the business.',
      'Accepted verification documents as JPEG, PNG or PDF up to 3 MB, saved under random file names. Errors come back as RFC 9457 ProblemDetail JSON.',
      'Kept the database password out of git with a git-ignored .env, and tested all 11 endpoints in a shared Postman collection.',
    ],
    decisions: [
      { title: 'Rules live in the service layer', body: 'Wage required (400), ownership checks (403) and status transitions (409) are plain Java in the service classes, so no client can bypass them.' },
      { title: 'Publishing follows verification', body: 'Approval is the single event that turns drafts into live posts and stamps every post with "verifiedEmployer": true.' },
      { title: 'PATCH for partial edits', body: 'Employers send only the fields that change; a closed job must be reposted before it can be edited.' },
      { title: 'AI drafts, people decide', body: 'In the assistant I’m building next, the model only fills a typed record. Java rules check it, and the employer confirms before anything is saved.' },
    ],
    links: [{ label: 'Code on GitHub', href: `${GH}/SpringBoot_PostgreSQL_Api` }],
    visual: {
      kind: 'endpoints',
      title: 'localhost:1027/api/v1',
      rows: [
        ['POST', '/employer/jobs'],
        ['GET', '/employer/jobs?status='],
        ['GET', '/employer/jobs/{id}'],
        ['PATCH', '/employer/jobs/{id}'],
        ['PATCH', '/employer/jobs/{id}/status'],
        ['POST', '/employer/profile'],
        ['GET', '/employer/profile'],
        ['PUT', '/employer/profile'],
        ['POST', '/employer/profile/document'],
        ['GET', '/admin/employers?status=PENDING'],
        ['POST', '/admin/employers/{id}/verification'],
      ],
    },
  },
  {
    id: 'atmabiswas',
    title: 'ATMABISWAS',
    kicker: 'Production backend for a national NGO · PHP',
    outcome: 'The live backend of atmabiswas.org, built single-handedly during a paid remote internship.',
    tags: ['Backend'],
    role: 'Backend developer intern (paid)',
    context: 'ATMABISWAS, an NGO working across Bangladesh since 1991',
    year: '2024–2025',
    stack: ['PHP', 'MySQL (PDO)', 'HTML Purifier', 'GitHub Actions', 'Hostinger'],
    metrics: [
      { value: '1', label: 'production site' },
      { value: 'Solo', label: 'backend developer' },
      { value: 'CI/CD', label: 'deploys over FTPS' },
    ],
    built: [
      'Built the backend of atmabiswas.org in PHP and MySQL (PDO): an admin dashboard for publishing blogs, notices and job posts with auto-generated job codes.',
      'Built the careers pages with job search, and job applications with CV (PDF) upload.',
      'Secured the admin panel with session login, CSRF tokens and protected endpoints.',
      'Blocked executable file uploads and sanitized blog HTML with HTML Purifier to prevent XSS.',
      'Automated deployment to Hostinger with a GitHub Actions workflow over FTPS.',
    ],
    decisions: [
      { title: 'Defence in layers', body: 'Session auth decides who you are, CSRF tokens decide whether the request is really yours, and upload checks and HTML sanitizing decide what is allowed in.' },
      { title: 'Deploys are a pipeline, not a ritual', body: 'A push runs the GitHub Actions workflow, which ships to Hostinger over encrypted FTPS with credentials kept in repository secrets.' },
    ],
    links: [{ label: 'Live site', href: 'https://atmabiswas.org' }],
    visual: {
      kind: 'pipeline',
      title: 'Admin request path',
      steps: ['Session login', 'CSRF token', 'Upload check', 'HTML Purifier', 'PDO', 'MySQL'],
      footer: 'git push → GitHub Actions → FTPS → Hostinger',
    },
  },
  {
    id: 'routine',
    title: 'Routine Builder',
    kicker: 'MERN app with a 19-endpoint API · Node.js',
    outcome: 'Plans a BRAC University class routine and refuses any class that would overlap.',
    tags: ['Backend'],
    role: 'Solo full-stack developer',
    context: 'Personal project',
    year: 'Summer 2026',
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'React', 'Vite', 'Tailwind CSS'],
    metrics: [
      { value: '19', label: 'REST endpoints' },
      { value: '7-day', label: 'course-feed cache' },
      { value: '0', label: 'overlaps allowed' },
    ],
    built: [
      'Designed a 19-endpoint REST API in Express and Mongoose, with cascading deletes (removing a class removes its labs and exam) and auto-save.',
      'Cached the university’s USIS course feed for 7 days, with search and a force-refresh endpoint, to auto-fill sections, faculty, rooms and exam dates.',
      'Wrote real-time conflict detection that blocks overlapping classes. Theory classes book paired days (Sun↔Tue, Mon↔Wed, Thu↔Sat); labs span two slots.',
      'Added an exam tracker that flags two or more exams on one day, editable time slots, PNG export and an offline fallback.',
    ],
    decisions: [
      { title: 'Cache the slow dependency', body: 'The USIS feed changes rarely, so it is cached for a week and can be refreshed on demand instead of being fetched on every search.' },
      { title: 'Deletes cascade on the server', body: 'Deleting a class removes its linked labs and exam inside the API, so the client never has to clean up after it.' },
    ],
    links: [{ label: 'Code on GitHub', href: `${GH}/BRACU_RoutineMaker` }],
    visual: {
      kind: 'endpoints',
      title: 'localhost:5000/api',
      rows: [
        ['GET', '/routine'],
        ['POST', '/routine'],
        ['PUT', '/routine/:id'],
        ['DELETE', '/routine/:id'],
        ['GET', '/courses/catalog/search?q='],
        ['POST', '/courses/catalog/refresh'],
        ['PUT', '/settings/timeslots'],
        ['GET', '/health'],
      ],
      more: '+ 11 more',
    },
  },
  {
    id: 'process',
    title: 'Process Manager',
    kicker: 'Concurrent process simulator · C & POSIX threads',
    outcome: 'Simulates fork, exit, wait and kill on a shared process table without races or deadlocks.',
    tags: ['Systems'],
    role: 'Owner of the process lifecycle',
    context: 'CSE321 Operating Systems, team of 3',
    year: 'Spring 2026',
    stack: ['C', 'POSIX threads', 'Mutexes', 'Condition variables'],
    metrics: [
      { value: '5', label: 'core functions I owned' },
      { value: '1', label: 'global lock order' },
    ],
    built: [
      'Owned the process lifecycle: pm_fork, pm_exit, pm_wait and pm_kill on a mutex-protected process table.',
      'Wrote orphan reparenting, so children of an exiting process move to init (PID 1).',
      'Made pm_wait handle both an already-zombie child and the blocking case while holding the table mutex, so no wake-up can be missed.',
      'Each of my functions snapshots the table before releasing the mutex, so the monitor thread logs exactly the state at each event.',
    ],
    decisions: [
      { title: 'One lock order', body: 'table_mutex is always taken before monitor_mutex, and the monitor never takes table_mutex, which rules out deadlock by construction.' },
    ],
    links: [{ label: 'Code on GitHub', href: `${GH}/CSE321_project_Process_manager` }],
    visual: {
      kind: 'code',
      title: 'final.c · my part',
      lines: [
        '<k>pm_fork</k>()                    <c>// L203–252</c>',
        '<k>pm_exit</k>()                    <c>// L254–288</c>',
        '<k>pm_wait</k>()                    <c>// L290–389  blocking</c>',
        '<k>pm_kill</k>()                    <c>// L391–429</c>',
        '<k>reparent_children_to_init</k>()  <c>// L168–197</c>',
        '',
        '<c>// lock order, always:</c>',
        '<s>table_mutex</s> → <s>monitor_mutex</s>',
      ],
    },
  },
  {
    id: 'compiler',
    title: 'C-Subset Compiler',
    kicker: 'Compiler front end · C++, Flex & Bison',
    outcome: 'Takes a subset of C from source text all the way to three-address code.',
    tags: ['Systems'],
    role: 'Solo',
    context: 'CSE420 Compiler Design',
    year: 'Summer 2026',
    stack: ['C++', 'Flex', 'Bison'],
    metrics: [
      { value: '4', label: 'compiler stages' },
      { value: '2-pass', label: 'AST walk' },
    ],
    built: [
      'Wrote a Flex/Bison scanner and parser for a C subset.',
      'Built a scope-aware symbol table from hashed scope tables with parent links.',
      'Added semantic analysis that reports type, scope and call errors.',
      'Built an AST and a two-pass walk that emits three-address code.',
    ],
    decisions: [
      { title: 'Each stage builds on the last', body: 'The parser, symbol table, semantic checks and code generator were built as four labs on top of one another, each with its own build script.' },
    ],
    links: [{ label: 'Code on GitHub', href: `${GH}/CSE420_CompilerDesign` }],
    visual: {
      kind: 'pipeline',
      title: 'input.c → three-address code',
      steps: ['Flex lexer', 'Bison parser', 'Symbol table', 'Semantic checks', 'AST', 'TAC'],
    },
  },
  {
    id: 'trackalert',
    title: 'TrackAlert Vision',
    kicker: 'Patrol robot with Telegram alerts · C++',
    outcome: 'Patrols a taped route, detects fire, gas, intruders and tip-over, and sends a photo alert to Telegram.',
    tags: ['Embedded'],
    role: 'Team lead and lead architect',
    context: 'CSE461 Robotics, team of 5',
    year: 'Summer 2026',
    stack: ['C++', 'Arduino Mega 2560', 'ESP32-S3-CAM', 'MPU6050', 'Telegram Bot API'],
    metrics: [
      { value: '5', label: 'person team I led' },
      { value: '2', label: 'controllers over UART' },
      { value: '৳4,479', label: 'build cost' },
    ],
    built: [
      'Designed a two-controller system: an Arduino Mega for real-time control and an ESP32-S3-CAM for vision, Wi-Fi and alerts.',
      'Wrote the PD line follower with slew-limited steering and corner and junction handling.',
      'Built obstacle avoidance with servo and ultrasonic scanning, gyro-measured turns and route recovery.',
      'Wrote the Telegram bot that captures a photo and sends it with the alert.',
    ],
    decisions: [
      { title: 'A tiny event protocol', body: 'The boards share plain event strings over UART, so the vision board only needs to know what happened, not how the hazard was detected.' },
    ],
    links: [{ label: 'Code on GitHub', href: `${GH}/CSE461_project_TrackAlert` }],
    visual: {
      kind: 'code',
      title: 'UART · Mega → ESP32-S3-CAM',
      lines: [
        '<s>EVT:FIRE</s>      <c>// flame sensor</c>',
        '<s>EVT:GAS</s>       <c>// MQ-2, after 60 s warm-up</c>',
        '<s>EVT:INTRUDER</s>  <c>// PIR, chassis still</c>',
        '<s>EVT:TILT</s>      <c>// MPU6050 Z-axis</c>',
        '<s>EVT:CLEAR</s>',
        '',
        '<c>// ESP32: capture frame → Telegram photo + caption</c>',
      ],
    },
  },
];

export const moreProjects = [
  { title: 'VangtiChai', tech: 'Android · Kotlin', body: 'Taka change calculator. Its greedy breakdown is unit-tested against a dynamic-programming solution.', href: `${GH}/VhangtiChai_AndroidApp_CSE489` },
  { title: 'BRACU Voting Machine', tech: '8086 Assembly · team of 3', body: 'Admin and voter logins, lock-out after failed attempts, and double-vote prevention.', href: `${GH}/CSE341_Project_Fall2025` },
  { title: 'Dual-Arduino Tic-Tac-Toe', tech: 'C++ · UART', body: 'Master and slave boards synchronised over a 9600-baud serial link.', href: `${GH}/CSE350_project_bracu` },
  { title: 'Git & GitHub guide', tech: 'Writing · 189-page PDF', body: 'A free guide from a first repository to running a team project, with 97 features explained.', href: `${GH}/githubGuide_By_Ahsan` },
  { title: 'Advanced Java & DSA book', tech: 'Java · in progress', body: 'Every listing is compiled with -Werror and checked against brute force on random inputs.', href: `${GH}/Java_Advance` },
];

// ------------------------------------------------------------------ experience

export interface Job {
  title: string;
  org: string;
  orgHref?: string;
  where: string;
  when: string;
  summary: string;
  bullets: string[];
  stack: string[];
}

export const experience: Job[] = [
  {
    title: 'Backend Developer',
    org: 'BRACU Cultural Club, BRAC University',
    where: 'Dhaka',
    when: 'Aug 2025 – Mar 2026',
    summary: 'Built the whole backend of the club’s website.',
    bullets: [
      'Built the club website’s entire backend in PHP.',
      'Awarded a certificate signed by the club’s faculty advisors for the work.',
    ],
    stack: ['PHP'],
  },
  {
    title: 'Backend Developer Intern (Paid)',
    org: 'ATMABISWAS (NGO)',
    orgHref: 'https://atmabiswas.org',
    where: 'Remote',
    when: 'Jun 2024 – Sep 2025',
    summary: 'Sole backend developer of atmabiswas.org, the website of an NGO working across Bangladesh since 1991.',
    bullets: [
      'Built the admin dashboard for blogs, notices and job posts with auto-generated job codes, in PHP and MySQL (PDO).',
      'Secured it with session login, CSRF tokens, protected endpoints, upload checks and HTML Purifier.',
      'Automated deployment to Hostinger with GitHub Actions over FTPS.',
    ],
    stack: ['PHP', 'MySQL', 'PDO', 'GitHub Actions'],
  },
];

// ------------------------------------------------------------------ research

export const research = {
  name: 'InsightLens',
  title: 'Lecture-to-notes pipeline for code-mixed Bengali-English lectures',
  thesis: 'A Vision-Language Based Framework for Extracting and Understanding Classroom Content in Dual Languages',
  meta: 'Undergraduate thesis · team of 3 · 2026',
  grade: 'A (95.5/100)',
  paper: 'InsightLens: Generating Checkable Lecture Notes from Code-Mixed Bengali-English Whiteboard Lectures',
  authors: 'S. A. Rafi, A. I. Khan, A. Habib, M. G. R. Alam, M. T. Reza',
  paperStatus: 'Manuscript in preparation for an IEEE journal',
  stack: ['Python', 'PyTorch', 'LoRA', 'Whisper', 'Qwen2.5-VL'],
  results: [
    {
      label: 'Speech recognition · character error rate',
      how: 'Fine-tuned Whisper with LoRA on Bengali-English lectures',
      from: 67.7,
      to: 15.8,
      better: 'lower' as const,
    },
    {
      label: 'Whiteboard reading · board-content recall',
      how: 'Built the whiteboard-reading stage with Qwen2.5-VL',
      from: 31.2,
      to: 88.8,
      better: 'higher' as const,
    },
  ],
};

// ------------------------------------------------------------------ principles

export const principles = [
  {
    title: 'Rules belong on the server',
    body: 'In Kaaj, the wage, ownership and status rules sit in the service layer and answer with 400, 403 or 409. The client can’t skip them.',
    proof: 'Kaaj · Spring Boot',
  },
  {
    title: 'Secure the boring parts',
    body: 'Session login, CSRF tokens, upload checks and HTML sanitizing protect the ATMABISWAS admin panel. Kaaj reads its database password from a git-ignored .env file.',
    proof: 'ATMABISWAS · Kaaj',
  },
  {
    title: 'Automate the path to production',
    body: 'A GitHub Actions workflow deploys atmabiswas.org over FTPS, so a release is one push, not a checklist.',
    proof: 'GitHub Actions',
  },
  {
    title: 'Check fast code against slow truth',
    body: 'VangtiChai’s greedy algorithm is unit-tested against a dynamic-programming solution. My Java book checks every example against brute force on random inputs.',
    proof: 'VangtiChai · Java book',
  },
  {
    title: 'Concurrency by construction',
    body: 'One lock order and a snapshot before every unlock. In the process manager, race-freedom comes from the design, not from luck.',
    proof: 'Process Manager · C',
  },
];

// ------------------------------------------------------------------ stack

export const stack: { group: string; items: string[]; core?: string[] }[] = [
  { group: 'Backend', items: ['Spring Boot', 'Spring Data JPA', 'Node.js', 'Express', 'REST APIs', 'Caching'], core: ['Spring Boot', 'Node.js', 'Express', 'REST APIs'] },
  { group: 'Databases', items: ['PostgreSQL', 'MySQL (PDO)', 'MongoDB (Mongoose)'], core: ['PostgreSQL', 'MySQL (PDO)'] },
  { group: 'Languages', items: ['Java', 'PHP', 'JavaScript', 'SQL', 'Python', 'C', 'C++', 'Kotlin', 'x86 Assembly'], core: ['Java', 'PHP', 'JavaScript', 'SQL'] },
  { group: 'Security & DevOps', items: ['Session auth', 'CSRF / XSS prevention', 'Input validation', 'Git', 'GitHub Actions (CI/CD)', 'Postman', 'Maven'], core: ['GitHub Actions (CI/CD)'] },
  { group: 'Frontend & Mobile', items: ['React', 'Tailwind CSS', 'Vite', 'HTML & CSS', 'Android (Kotlin)', 'Jetpack Compose'] },
  { group: 'Systems & ML', items: ['POSIX threads', 'Flex / Bison', 'Arduino', 'ESP32', 'PyTorch', 'LoRA', 'Whisper', 'Qwen2.5-VL'] },
];

// ------------------------------------------------------------------ education

export interface Education {
  school: string;
  degree: string;
  when: string;
  where: string;
  points: string[];
  gpa?: string;
  roll?: string;
}

export const education: Education[] = [
  {
    school: 'BRAC University',
    degree: 'B.Sc. in Computer Science and Engineering',
    when: 'Expected graduation: Fall 2026',
    where: 'Dhaka',
    points: [
      'CGPA 3.76 / 4.00, and 3.95 in 300–400 level CSE courses',
      'Vice Chancellor’s List: Summer 2024, Fall 2025 and Spring 2026',
      'Coursework: Data Structures, Algorithms, Databases, Operating Systems, Computer Networks, Software Engineering',
    ],
  },
  {
    school: 'Notre Dame College',
    degree: 'Higher Secondary Certificate (HSC)',
    when: '2021',
    where: 'Dhaka',
    points: ['GPA 5.00 / 5.00'],
    gpa: '5.00',
    roll: '12106063',
  },
];
