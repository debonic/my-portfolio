"use client";

import { useEffect, useRef, useState } from "react";

/* ── PROJECTS DATA ── */
const featuredProjects = [
  {
    title: "STR OpsDesk",
    category: "Chrome Extension · Internal Tool",
    image: "/projects/str-opsdesk-today.png",
    description:
      "A custom Chrome extension built for real STR shift work — issue tracking, message snippets, property notes, handover generation, and shift management. Built because no existing tool fit the actual workflow.",
    tags: ["STR Operations", "Chrome Extension", "Vanilla JS", "Local-first"],
  },
  {
    title: "Invoice Generator",
    category: "Web Application · Freelancer Tool",
    image: "/projects/invoice-generator.png",
    link: "/tools/invoice-generator.html",
    description:
      "A fully featured invoice generator built for freelancers and VAs — 3 templates, custom accent colors, line items with quantity/rate/tax, discount and surcharge logic, payment info (GCash, PayPal, bank), PDF export, and local save/load. No backend, no account needed.",
    tags: ["HTML", "CSS", "JavaScript", "html2pdf", "Local-first"],
  },
  {
    title: "Personal Budget Tracker",
    category: "Web Application",
    image: "/projects/budget-tracker-budget.png",
    link: "/tools/budget-tracker.html",
    description:
      "A custom budgeting and expense-tracking app with calculations, expense categories, and a visual interface designed for practical everyday use.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

const technicalProjects = [
  {
    title: "Home Server",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=85",
    description:
      "An old laptop converted into a personal Ubuntu Server and CasaOS environment running multiple self-hosted services and serving as a personal infrastructure lab.",
    tags: ["Linux", "Docker", "Networking"],
  },
  {
    title: "n8n Automations",
    category: "Automation · AI",
    image: "/projects/n8n-automations.png",
    description:
      "Workflow automations connecting tools, APIs, webhooks, and AI-assisted steps to eliminate repetitive manual work across different systems.",
    tags: ["n8n", "APIs", "Webhooks", "AI"],
  },
  {
    title: "Custom Web Projects",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=85",
    description:
      "Custom websites, dashboards, landing pages, and utility applications built through hands-on and AI-assisted development.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "AI-Assisted Development",
    category: "AI · Development",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=85",
    description:
      "Using AI as a practical development tool to prototype, build, troubleshoot, and turn operational ideas into working projects.",
    tags: ["Claude", "ChatGPT", "Prompting"],
  },
  {
    title: "Raspberry Pi · Embedded Tech",
    category: "Technical Experimentation",
    image: "/projects/raspberry-pi-embedded.png",
    description:
      "Ongoing exploration of Raspberry Pi, Arduino, ESP32, networking, automation, and cybersecurity-related projects.",
    tags: ["Raspberry Pi", "ESP32", "Arduino"],
  },
  {
    title: "My Portfolio",
    category: "Web Development · Personal Project",
    image: "/projects/my-portfolio.png",
    description:
      "This portfolio itself is one of my personal builds, combining my STR operations background with web development, AI-assisted development, responsive UI, and practical experimentation.",
    tags: ["Next.js", "React", "UI", "AI-Assisted"],
  },
];



/* ── CLIENT-SIDE LANGUAGE TRANSLATIONS ──
   Keeps one page structure while translating the visible UI/content for each language.
   English strings remain the source keys so React state and routing stay stable. */
const LANGUAGE_DICTIONARIES: Record<string, Record<string, string>> = {
  es: {
    "About":"Acerca de","Experience":"Experiencia","Projects":"Proyectos","Technical Projects":"Proyectos técnicos","Skills & Tools":"Habilidades y herramientas","Contact":"Contacto","Language":"Idioma","Dark":"Oscuro","Light":"Claro","Paper":"Papel","Skip to content":"Saltar al contenido","See my work":"Ver mi trabajo","Open Tool":"Abrir herramienta","LIVE TOOL":"HERRAMIENTA EN VIVO","Message":"Mensaje","Email":"Correo electrónico","How I work":"Cómo trabajo","Want to know how I work?":"¿Quieres saber cómo trabajo?","Platforms I work in":"Plataformas en las que trabajo","Systems & Platforms":"Sistemas y plataformas","STR Platforms":"Plataformas STR","STR Operations":"Operaciones STR","STR Operations + Guest Services":"Operaciones STR + atención a huéspedes","Operations + Technology":"Operaciones + tecnología","400+ STR Properties":"Más de 400 propiedades STR","STR Properties":"Propiedades STR","Remote · UTC+8":"Remoto · UTC+8","Philippines · UTC+8 · Remote-Ready":"Filipinas · UTC+8 · Disponible para remoto","AVAILABLE FOR REMOTE PROJECTS · PHILIPPINES":"DISPONIBLE PARA PROYECTOS REMOTOS · FILIPINAS","STR Operations · Philippines · Remote":"Operaciones STR · Filipinas · Remoto","Guest services across 400+ properties.":"Atención a huéspedes en más de 400 propiedades.","Need someone who can operate and build?":"¿Necesitas a alguien que pueda operar y construir?","Operator who likes to build.":"Operador al que le gusta construir.","The builds behind the thinking.":"Los proyectos detrás de las ideas.","Practical projects showing how I use technology to solve real operational problems.":"Proyectos prácticos que muestran cómo uso la tecnología para resolver problemas operativos reales.","The technical side is the extra: I’m self-taught, curious, and always interested in finding a practical way to improve a process.":"La parte técnica es el extra: soy autodidacta, curioso y siempre busco una forma práctica de mejorar un proceso.","PERSONAL PROJECT · NO PUBLIC SCREENSHOT":"PROYECTO PERSONAL · SIN CAPTURA PÚBLICA","PROJECT VISUAL":"VISTA DEL PROYECTO","Your name or company":"Tu nombre o empresa","Something went wrong. Try again.":"Algo salió mal. Inténtalo de nuevo.","Sent. I'll be in touch soon.":"Enviado. Me pondré en contacto contigo pronto.","Years Work Experience":"Años de experiencia laboral","STR OPERATIONS + TECH + AUTOMATION":"OPERACIONES STR + TECNOLOGÍA + AUTOMATIZACIÓN","Comfortable inside the stack.":"Cómodo trabajando dentro de este stack.","I don't just use tools. I build with them.":"No solo uso herramientas. Construyo con ellas.","Operations came first.":"Las operaciones fueron primero.","What do you actually do?":"¿Qué haces realmente?","How do you handle guest communications?":"¿Cómo gestionas la comunicación con los huéspedes?","What does property management mean in your role?":"¿Qué significa la gestión de propiedades en tu trabajo?","How do you use automation and AI?":"¿Cómo usas la automatización y la IA?","What makes you different from a typical VA?":"¿Qué te diferencia de un VA típico?","What technical stuff are you learning?":"¿Qué cosas técnicas estás aprendiendo?","Web & Development":"Web y desarrollo","Design & Productivity":"Diseño y productividad","Infrastructure":"Infraestructura","Communication":"Comunicación","Automation & AI":"Automatización e IA",
    "Home Server":"Servidor doméstico","n8n Automations":"Automatizaciones con n8n","Custom Web Projects":"Proyectos web personalizados","AI-Assisted Development":"Desarrollo asistido por IA","Raspberry Pi · Embedded Tech":"Raspberry Pi · Tecnología embebida","My Portfolio":"Mi portafolio","Chrome Extension · Internal Tool":"Extensión de Chrome · Herramienta interna","Web Application · Freelancer Tool":"Aplicación web · Herramienta para freelancers","Web Application":"Aplicación web","Invoice Generator":"Generador de facturas","Personal Budget Tracker":"Control de presupuesto personal","STR OpsDesk":"STR OpsDesk",
  },
  fr: {
    "About":"À propos","Experience":"Expérience","Projects":"Projets","Technical Projects":"Projets techniques","Skills & Tools":"Compétences et outils","Contact":"Contact","Language":"Langue","Dark":"Sombre","Light":"Clair","Paper":"Papier","Skip to content":"Passer au contenu","See my work":"Voir mon travail","Open Tool":"Ouvrir l’outil","LIVE TOOL":"OUTIL EN LIGNE","Message":"Message","Email":"E-mail","How I work":"Comment je travaille","Want to know how I work?":"Vous voulez savoir comment je travaille ?","Platforms I work in":"Plateformes que j’utilise","Systems & Platforms":"Systèmes et plateformes","STR Platforms":"Plateformes STR","STR Operations":"Opérations STR","STR Operations + Guest Services":"Opérations STR + service client","Operations + Technology":"Opérations + technologie","400+ STR Properties":"400+ propriétés STR","STR Properties":"Propriétés STR","Remote · UTC+8":"À distance · UTC+8","Philippines · UTC+8 · Remote-Ready":"Philippines · UTC+8 · Prêt pour le travail à distance","AVAILABLE FOR REMOTE PROJECTS · PHILIPPINES":"DISPONIBLE POUR DES PROJETS À DISTANCE · PHILIPPINES","STR Operations · Philippines · Remote":"Opérations STR · Philippines · À distance","Guest services across 400+ properties.":"Service client pour plus de 400 propriétés.","Need someone who can operate and build?":"Besoin de quelqu’un capable d’opérer et de construire ?","Operator who likes to build.":"Un opérateur qui aime construire.","The builds behind the thinking.":"Les projets derrière la réflexion.","Practical projects showing how I use technology to solve real operational problems.":"Des projets pratiques montrant comment j’utilise la technologie pour résoudre de vrais problèmes opérationnels.","The technical side is the extra: I’m self-taught, curious, and always interested in finding a practical way to improve a process.":"La partie technique est un plus : je suis autodidacte, curieux et toujours à la recherche d’une façon pratique d’améliorer un processus.","PERSONAL PROJECT · NO PUBLIC SCREENSHOT":"PROJET PERSONNEL · PAS DE CAPTURE PUBLIQUE","PROJECT VISUAL":"VISUEL DU PROJET","Your name or company":"Votre nom ou entreprise","Something went wrong. Try again.":"Une erreur s’est produite. Réessayez.","Sent. I'll be in touch soon.":"Envoyé. Je vous contacterai bientôt.","Years Work Experience":"Années d’expérience professionnelle","STR OPERATIONS + TECH + AUTOMATION":"OPÉRATIONS STR + TECH + AUTOMATISATION","Comfortable inside the stack.":"À l’aise dans cet écosystème.","I don't just use tools. I build with them.":"Je ne me contente pas d’utiliser les outils. Je construis avec eux.","Operations came first.":"Les opérations sont venues en premier.","What do you actually do?":"Que faites-vous réellement ?","How do you handle guest communications?":"Comment gérez-vous les échanges avec les voyageurs ?","What does property management mean in your role?":"Que signifie la gestion immobilière dans votre rôle ?","How do you use automation and AI?":"Comment utilisez-vous l’automatisation et l’IA ?","What makes you different from a typical VA?":"Qu’est-ce qui vous distingue d’un VA classique ?","What technical stuff are you learning?":"Quelles compétences techniques apprenez-vous ?","Web & Development":"Web et développement","Design & Productivity":"Design et productivité","Infrastructure":"Infrastructure","Communication":"Communication","Automation & AI":"Automatisation et IA","Home Server":"Serveur personnel","n8n Automations":"Automatisations n8n","Custom Web Projects":"Projets web personnalisés","AI-Assisted Development":"Développement assisté par IA","Raspberry Pi · Embedded Tech":"Raspberry Pi · Technologie embarquée","My Portfolio":"Mon portfolio","Chrome Extension · Internal Tool":"Extension Chrome · Outil interne","Web Application · Freelancer Tool":"Application web · Outil freelance","Web Application":"Application web","Invoice Generator":"Générateur de factures","Personal Budget Tracker":"Suivi de budget personnel","STR OpsDesk":"STR OpsDesk",
  },
  fil: {
    "About":"Tungkol sa akin","Experience":"Karanasan","Projects":"Mga proyekto","Technical Projects":"Mga technical project","Skills & Tools":"Skills at tools","Contact":"Contact","Language":"Wika","Dark":"Madilim","Light":"Maliwanag","Paper":"Papel","Skip to content":"Laktaw sa content","See my work":"Tingnan ang mga ginawa ko","Open Tool":"Buksan ang tool","LIVE TOOL":"LIVE TOOL","Message":"Mensahe","Email":"Email","How I work":"Paano ako nagtatrabaho","Want to know how I work?":"Gusto mong malaman kung paano ako nagtatrabaho?","Platforms I work in":"Mga platform na ginagamit ko","Systems & Platforms":"Systems at platforms","STR Platforms":"STR platforms","STR Operations":"STR Operations","STR Operations + Guest Services":"STR Operations + Guest Services","Operations + Technology":"Operations + Technology","400+ STR Properties":"400+ STR Properties","STR Properties":"STR Properties","Remote · UTC+8":"Remote · UTC+8","Philippines · UTC+8 · Remote-Ready":"Philippines · UTC+8 · Ready for remote work","AVAILABLE FOR REMOTE PROJECTS · PHILIPPINES":"AVAILABLE PARA SA REMOTE PROJECTS · PILIPINAS","STR Operations · Philippines · Remote":"STR Operations · Pilipinas · Remote","Guest services across 400+ properties.":"Guest services para sa 400+ properties.","Need someone who can operate and build?":"Kailangan mo ng marunong mag-operate at mag-build?","Operator who likes to build.":"Operator na mahilig mag-build.","The builds behind the thinking.":"Mga build sa likod ng mga idea.","Practical projects showing how I use technology to solve real operational problems.":"Mga practical project na nagpapakita kung paano ko ginagamit ang tech para lutasin ang totoong operational problems.","The technical side is the extra: I’m self-taught, curious, and always interested in finding a practical way to improve a process.":"Bonus ang technical side: self-taught ako, curious, at laging naghahanap ng practical na paraan para mapaganda ang proseso.","PERSONAL PROJECT · NO PUBLIC SCREENSHOT":"PERSONAL PROJECT · WALANG PUBLIC SCREENSHOT","PROJECT VISUAL":"PROJECT VISUAL","Your name or company":"Pangalan mo o company","Something went wrong. Try again.":"May nagkaproblema. Subukan ulit.","Sent. I'll be in touch soon.":"Na-send na. Babalik ako sa iyo soon.","Years Work Experience":"Taon ng work experience","STR OPERATIONS + TECH + AUTOMATION":"STR OPERATIONS + TECH + AUTOMATION","Comfortable inside the stack.":"Komportable ako sa tools at systems na gamit sa operations.","I don't just use tools. I build with them.":"Hindi lang ako gumagamit ng tools. Nagbu-build din ako gamit ang mga ito.","Operations came first.":"Operations ang foundation ko.","What do you actually do?":"Ano ba talaga ang ginagawa mo?","How do you handle guest communications?":"Paano mo hina-handle ang guest communications?","What does property management mean in your role?":"Ano ang property management sa role mo?","How do you use automation and AI?":"Paano mo ginagamit ang automation at AI?","What makes you different from a typical VA?":"Ano ang difference mo sa typical VA?","What technical stuff are you learning?":"Anong technical stuff ang pinag-aaralan mo?","Web & Development":"Web at development","Design & Productivity":"Design at productivity","Infrastructure":"Infrastructure","Communication":"Communication","Automation & AI":"Automation at AI","Home Server":"Home Server","n8n Automations":"n8n Automations","Custom Web Projects":"Custom Web Projects","AI-Assisted Development":"AI-Assisted Development","Raspberry Pi · Embedded Tech":"Raspberry Pi · Embedded Tech","My Portfolio":"My Portfolio","Chrome Extension · Internal Tool":"Chrome Extension · Internal Tool","Web Application · Freelancer Tool":"Web Application · Freelancer Tool","Web Application":"Web Application","Invoice Generator":"Invoice Generator","Personal Budget Tracker":"Personal Budget Tracker","STR OpsDesk":"STR OpsDesk",
  },
  zh: {
    "About":"关于我","Experience":"经历","Projects":"项目","Technical Projects":"技术项目","Skills & Tools":"技能与工具","Contact":"联系我","Language":"语言","Dark":"深色","Light":"浅色","Paper":"纸张","Skip to content":"跳到内容","See my work":"查看我的作品","Open Tool":"打开工具","LIVE TOOL":"在线工具","Message":"留言","Email":"电子邮件","How I work":"我的工作方式","Want to know how I work?":"想了解我的工作方式？","Platforms I work in":"我使用的平台","Systems & Platforms":"系统与平台","STR Platforms":"STR 平台","STR Operations":"STR 运营","STR Operations + Guest Services":"STR 运营 + 客户服务","Operations + Technology":"运营 + 技术","400+ STR Properties":"400+ STR 房源","STR Properties":"STR 房源","Remote · UTC+8":"远程 · UTC+8","Philippines · UTC+8 · Remote-Ready":"菲律宾 · UTC+8 · 可远程合作","AVAILABLE FOR REMOTE PROJECTS · PHILIPPINES":"接受远程项目 · 菲律宾","STR Operations · Philippines · Remote":"STR 运营 · 菲律宾 · 远程","Guest services across 400+ properties.":"为 400+ 房源提供客户服务支持。","Need someone who can operate and build?":"需要一个既能运营又能构建系统的人？","Operator who likes to build.":"喜欢构建系统的运营人员。","The builds behind the thinking.":"思考背后的实践项目。","Practical projects showing how I use technology to solve real operational problems.":"通过实际项目展示我如何用技术解决真实的运营问题。","The technical side is the extra: I’m self-taught, curious, and always interested in finding a practical way to improve a process.":"技术能力是额外优势：我通过自学不断探索，并喜欢用实际方式优化流程。","PERSONAL PROJECT · NO PUBLIC SCREENSHOT":"个人项目 · 无公开截图","PROJECT VISUAL":"项目展示","Your name or company":"你的姓名或公司","Something went wrong. Try again.":"出了点问题，请重试。","Sent. I'll be in touch soon.":"已发送，我会尽快联系你。","Years Work Experience":"工作经验年数","STR OPERATIONS + TECH + AUTOMATION":"STR 运营 + 技术 + 自动化","Comfortable inside the stack.":"熟悉相关工具与系统。","I don't just use tools. I build with them.":"我不仅使用工具，也用它们构建系统。","Operations came first.":"运营是我的基础。","What do you actually do?":"你具体做什么？","How do you handle guest communications?":"你如何处理客户沟通？","What does property management mean in your role?":"房产管理在你的工作中意味着什么？","How do you use automation and AI?":"你如何使用自动化和 AI？","What makes you different from a typical VA?":"你与普通 VA 有什么不同？","What technical stuff are you learning?":"你正在学习哪些技术？","Web & Development":"网页与开发","Design & Productivity":"设计与效率","Infrastructure":"基础设施","Communication":"沟通","Automation & AI":"自动化与 AI","Home Server":"家庭服务器","n8n Automations":"n8n 自动化","Custom Web Projects":"定制网页项目","AI-Assisted Development":"AI 辅助开发","Raspberry Pi · Embedded Tech":"Raspberry Pi · 嵌入式技术","My Portfolio":"我的作品集","Chrome Extension · Internal Tool":"Chrome 扩展 · 内部工具","Web Application · Freelancer Tool":"网页应用 · 自由职业者工具","Web Application":"网页应用","Invoice Generator":"发票生成器","Personal Budget Tracker":"个人预算追踪器","STR OpsDesk":"STR OpsDesk",
  },
};


/* ── COMPLETE CONTENT TRANSLATIONS ── */
const EXTRA_LANGUAGE_DICTIONARIES: Record<string, Record<string, string>> = {
  "es": {
    "STR OPERATIONS + TECH + AUTOMATION": "OPERACIONES STR + TECNOLOGÍA + AUTOMATIZACIÓN",
    "Hi, I'm Von.": "Hola, soy Von.",
    "I’m an STR operations specialist focused on ": "Soy especialista en operaciones STR, enfocado en ",
    "guest communications, property management, and operational workflows": "comunicación con huéspedes, gestión de propiedades y flujos operativos",
    ", with a technical edge in automation, AI, and practical web projects. I don’t just operate software. I look for ways to make the operation work better.": ", con un enfoque técnico en automatización, IA y proyectos web prácticos. No solo manejo software. Busco formas de hacer que la operación funcione mejor.",
    "STR OPERATIONS · PHILIPPINES · REMOTE": "OPERACIONES STR · FILIPINAS · REMOTO",
    "Guest services across 400+ properties.": "Atención a huéspedes en más de 400 propiedades.",
    "U.S.-based STR operations across multiple markets — NJ Shore, Vermont, New Orleans. Handling guest-facing work and the processes behind it.": "Operaciones STR basadas en EE. UU. en varios mercados: NJ Shore, Vermont y Nueva Orleans. Gestiono el trabajo de cara al huésped y los procesos que hay detrás.",
    "Inquiry handling, reservation support, check-in coordination, issue resolution, and escalation management.": "Gestión de consultas, apoyo a reservas, coordinación del check-in, resolución de problemas y gestión de escalaciones.",
    "Pre-arrival workflows, guest verification, preparation, and coordination before check-in day.": "Flujos previos a la llegada, verificación de huéspedes, preparación y coordinación antes del día del check-in.",
    "Maintenance coordination, cleaning follow-up, troubleshooting, and operational tracking across turnovers.": "Coordinación de mantenimiento, seguimiento de limpieza, solución de problemas y control operativo durante los cambios de huéspedes.",
    "Documentation, reporting, SOPs, process organization, and operational workflow design.": "Documentación, reportes, SOP, organización de procesos y diseño de flujos operativos.",
    "Operations came first.": "Las operaciones fueron primero.",
    "I didn't leave operations to become technical. I kept working in operations while learning how to build better systems around the work.": "No dejé las operaciones para volverme técnico. Seguí trabajando en operaciones mientras aprendía a construir mejores sistemas alrededor del trabajo.",
    "Built a strong foundation in customer communication, sales, problem-solving, handling difficult conversations, and working inside structured operational environments.": "Construí una base sólida en comunicación con clientes, ventas, resolución de problemas, manejo de conversaciones difíciles y trabajo dentro de entornos operativos estructurados.",
    "Supporting U.S.-based short-term rental operations across multiple markets. Guest services, reservations, pre-arrival workflows, escalations, maintenance coordination, cleaning coordination, reporting, SOPs, and internal operations.": "Apoyo operaciones de alquileres de corta duración en EE. UU. en varios mercados. Atención a huéspedes, reservas, flujos previos a la llegada, escalaciones, coordinación de mantenimiento y limpieza, reportes, SOP y operaciones internas.",
    "Building practical automations, web applications, Chrome extensions, self-hosted systems, and AI-assisted projects alongside operations work. Start with the problem, build the simplest useful solution.": "Construyo automatizaciones prácticas, aplicaciones web, extensiones de Chrome, sistemas autoalojados y proyectos asistidos por IA junto con mi trabajo de operaciones. Empiezo por el problema y construyo la solución útil más sencilla.",
    "I don't just use tools. I build with them.": "No solo uso herramientas. Construyo con ellas.",
    "Practical projects showing how I use technology to solve real operational problems.": "Proyectos prácticos que muestran cómo uso la tecnología para resolver problemas operativos reales.",
    "These are personal experiments and self-taught projects that show what I’m interested in learning beyond day-to-day STR operations. They’re not presented as senior engineering work, but as proof that I like building and figuring things out.": "Son experimentos personales y proyectos de aprendizaje autodidacta que muestran lo que me interesa aprender más allá de las operaciones STR del día a día. No los presento como trabajo de ingeniería senior, sino como prueba de que me gusta construir y entender cómo funcionan las cosas.",
    "My core skill is STR operations. The technical side is an added capability I’m building through self-directed learning and personal projects. I’m not presenting myself as a senior software engineer or AI specialist. I’m comfortable learning new tools, troubleshooting, and building practical things when a real problem gives me a reason to.": "Mi habilidad principal son las operaciones STR. La parte técnica es una capacidad adicional que desarrollo mediante aprendizaje autodidacta y proyectos personales. No me presento como ingeniero de software senior ni como especialista en IA. Me siento cómodo aprendiendo nuevas herramientas, resolviendo problemas y construyendo cosas prácticas cuando un problema real me da una razón para hacerlo.",
    "Need someone who can operate and build?": "¿Necesitas a alguien que pueda operar y construir?",
    "Best suited for STR property managers, growing operations teams, and small businesses that need someone who understands both operations and technology.": "Ideal para administradores de propiedades STR, equipos de operaciones en crecimiento y pequeñas empresas que necesitan a alguien que entienda tanto las operaciones como la tecnología.",
    "My core work is guest communication, property management support, coordination, follow-ups, and the day-to-day workflows that keep short-term rental operations moving.": "Mi trabajo principal es la comunicación con huéspedes, el apoyo a la gestión de propiedades, la coordinación, los seguimientos y los flujos diarios que mantienen en marcha las operaciones de alquileres de corta duración.",
    "The technical side is the extra: I’m self-taught, curious, and always interested in finding a practical way to improve a process.": "La parte técnica es el extra: soy autodidacta, curioso y siempre busco una forma práctica de mejorar un proceso.",
    "Philippines · UTC+8 · Remote-Ready": "Filipinas · UTC+8 · Disponible para trabajo remoto",
    "Operate · Build · Improve · Repeat": "Operar · Construir · Mejorar · Repetir",
    "Your name or company": "Tu nombre o empresa",
    "Send Message": "Enviar mensaje",
    "Sending…": "Enviando…",
    "Sent. I'll be in touch soon.": "Enviado. Me pondré en contacto contigo pronto.",
    "Something went wrong. Try again.": "Algo salió mal. Inténtalo de nuevo.",
    "Tell me about your property or where the operation is getting stuck…": "Cuéntame sobre tu propiedad o dónde se está atascando la operación…",
    "Hey! I'm Von. Let's work together. Fill out the form →": "¡Hola! Soy Von. Trabajemos juntos. Completa el formulario →",
    "I'm reading every word — tell me about your property! 👀": "Estoy leyendo cada palabra. ¡Cuéntame sobre tu propiedad! 👀",
    "📨 Sending your message...": "📨 Enviando tu mensaje...",
    "😬 Hmm, something went wrong. Try again?": "😬 Hmm, algo salió mal. ¿Lo intentamos de nuevo?",
    "🎉 Got it! I'll be in touch soon. Salamat!": "🎉 ¡Recibido! Me pondré en contacto contigo pronto.",
    "What do you actually do?": "¿Qué haces realmente?",
    "How do you handle guest communications?": "¿Cómo gestionas la comunicación con los huéspedes?",
    "What does property management mean in your role?": "¿Qué significa la gestión de propiedades en tu trabajo?",
    "How do you use automation and AI?": "¿Cómo usas la automatización y la IA?",
    "What makes you different from a typical VA?": "¿Qué te diferencia de un VA típico?",
    "What technical stuff are you learning?": "¿Qué cosas técnicas estás aprendiendo?",
    "I work in short-term rental operations, with a strong focus on guest communications and the day-to-day work that keeps properties running smoothly. My experience includes guest inquiries, reservation support, pre-arrival communication, check-in support, troubleshooting, issue and escalation management, maintenance and cleaning coordination, follow-ups, reporting, documentation, and internal handovers. I work across the systems behind the operation too, making sure information is organized and the right people know what needs to happen next.": "Trabajo en operaciones de alquileres de corta duración, con un fuerte enfoque en la comunicación con huéspedes y el trabajo diario que mantiene las propiedades funcionando sin problemas. Mi experiencia incluye consultas de huéspedes, apoyo a reservas, comunicación previa a la llegada, apoyo en el check-in, resolución de problemas, gestión de incidencias y escalaciones, coordinación de mantenimiento y limpieza, seguimientos, reportes, documentación y handovers internos. También trabajo con los sistemas detrás de la operación, asegurándome de que la información esté organizada y de que las personas adecuadas sepan qué debe ocurrir después.",
    "I treat guest communication as part of the operation, not just customer service. I handle questions, requests, complaints, check-in concerns, troubleshooting, reservation-related issues, and situations that need escalation. I focus on being responsive, accurate, calm, and clear about the next step while keeping the relevant operational context in mind.": "Considero la comunicación con huéspedes como parte de la operación, no solo como atención al cliente. Gestiono preguntas, solicitudes, quejas, dudas de check-in, resolución de problemas, incidencias relacionadas con reservas y situaciones que requieren escalación. Me enfoco en responder con rapidez, precisión, calma y claridad sobre el siguiente paso, manteniendo presente el contexto operativo relevante.",
    "For me, property management is about keeping the moving parts of a short-term rental operation organized. That includes reservations, pre-arrival requirements, guest concerns, cleaning and maintenance coordination, open issues, follow-ups, documentation, and handovers. In a multi-property environment, consistency and good information flow matter because small details can quickly become bigger operational problems.": "Para mí, la gestión de propiedades consiste en mantener organizadas todas las piezas de una operación de alquiler de corta duración. Incluye reservas, requisitos previos a la llegada, preocupaciones de huéspedes, coordinación de limpieza y mantenimiento, problemas abiertos, seguimientos, documentación y handovers. En un entorno con varias propiedades, la consistencia y un buen flujo de información son importantes porque los pequeños detalles pueden convertirse rápidamente en problemas operativos mayores.",
    "Automation and AI are interests and practical tools I’m learning to use alongside my STR operations experience. I experiment with n8n, APIs, webhooks, AI-assisted workflows, and custom tools when they can reduce repetitive work or improve a process. I’m self-taught and still learning, so I don’t present myself as an automation or AI expert. I’m interested in understanding what technology can realistically improve and building things to learn by doing.": "La automatización y la IA son intereses y herramientas prácticas que estoy aprendiendo a usar junto con mi experiencia en operaciones STR. Experimento con n8n, APIs, webhooks, flujos asistidos por IA y herramientas personalizadas cuando pueden reducir trabajo repetitivo o mejorar un proceso. Soy autodidacta y sigo aprendiendo, así que no me presento como experto en automatización o IA. Me interesa entender qué puede mejorar realmente la tecnología y construir cosas para aprender haciendo.",
    "My foundation is STR operations. I understand guest communications, property management workflows, follow-ups, escalations, coordination, SOPs, and the realities of keeping day-to-day operations moving. My technical interest gives me another way to look at problems. If something is unnecessarily manual, scattered, or repetitive, I naturally start thinking about whether the process, documentation, or technology could be improved.": "Mi base son las operaciones STR. Entiendo la comunicación con huéspedes, los flujos de gestión de propiedades, seguimientos, escalaciones, coordinación, SOP y la realidad de mantener las operaciones diarias en marcha. Mi interés técnico me da otra forma de analizar los problemas. Si algo es innecesariamente manual, disperso o repetitivo, naturalmente empiezo a pensar si se puede mejorar el proceso, la documentación o la tecnología.",
    "Outside of my STR work, I’m teaching myself practical technology through personal projects. I’ve been exploring web development, n8n automation, AI-assisted development, Linux, Docker, self-hosting, networking, Raspberry Pi, ESP32, Arduino, and cybersecurity-related projects. I’m not claiming to be an expert in these areas yet. I’m building, experimenting, troubleshooting, and learning because I genuinely enjoy figuring out how things work.": "Fuera de mi trabajo en STR, estoy aprendiendo tecnología práctica por mi cuenta mediante proyectos personales. He estado explorando desarrollo web, automatización con n8n, desarrollo asistido por IA, Linux, Docker, autoalojamiento, redes, Raspberry Pi, ESP32, Arduino y proyectos relacionados con ciberseguridad. Todavía no me considero experto en estas áreas. Construyo, experimento, soluciono problemas y aprendo porque realmente disfruto descubrir cómo funcionan las cosas.",
    "Keep the workflow moving": "Mantener el flujo de trabajo en marcha",
    "Find friction and gaps": "Encontrar fricciones y brechas",
    "Create tools and systems": "Crear herramientas y sistemas",
    "Test and make it better": "Probar y mejorarlo",
    "I’m Von Untalan, a Filipino remote professional with a background in BPO, customer service, short-term rental operations, automation, and technology.": "Soy Von Untalan, un profesional filipino que trabaja de forma remota y tiene experiencia en BPO, atención al cliente, operaciones de alquileres de corta duración, automatización y tecnología.",
    "I started in BPO in 2015 and later moved into remote STR work, where I found I enjoyed more than just communicating with guests. I liked understanding how the operation worked, where processes were repetitive, and where information could get lost.": "Empecé en BPO en 2015 y después pasé a trabajar de forma remota en STR, donde descubrí que disfrutaba de mucho más que comunicarme con huéspedes. Me interesaba entender cómo funcionaba la operación, dónde se repetían los procesos y dónde podía perderse la información.",
    "How information moves. Where workflows break down. Why teams keep solving the same problem.": "Cómo se mueve la información. Dónde se rompen los flujos de trabajo. Por qué los equipos siguen resolviendo el mismo problema.",
    "That curiosity eventually led me to teach myself automation, AI, web development, and other technical skills through personal projects. These are interests I’m actively building, not areas where I claim to be an expert.": "Esa curiosidad me llevó a aprender por mi cuenta automatización, IA, desarrollo web y otras habilidades técnicas mediante proyectos personales. Son áreas que sigo desarrollando, no áreas en las que me presento como experto.",
    "© 2026 Von Untalan · STR Operations & Guest Services Specialist": "© 2026 Von Untalan · Especialista en Operaciones STR y Atención a Huéspedes",
    "STR OpsDesk": "STR OpsDesk",
    "Chrome Extension · Internal Tool": "Extensión de Chrome · Herramienta interna",
    "A custom Chrome extension built for real STR shift work — issue tracking, message snippets, property notes, handover generation, and shift management. Built because no existing tool fit the actual workflow.": "Una extensión de Chrome creada para el trabajo real por turnos en STR: seguimiento de problemas, fragmentos de mensajes, notas de propiedades, generación de handovers y gestión de turnos. La construí porque ninguna herramienta existente encajaba con el flujo real.",
    "Invoice Generator": "Generador de facturas",
    "Web Application · Freelancer Tool": "Aplicación web · Herramienta para freelancers",
    "A fully featured invoice generator built for freelancers and VAs — 3 templates, custom accent colors, line items with quantity/rate/tax, discount and surcharge logic, payment info (GCash, PayPal, bank), PDF export, and local save/load. No backend, no account needed.": "Un generador de facturas completo para freelancers y VAs: 3 plantillas, colores de acento personalizados, líneas con cantidad/tarifa/impuesto, descuentos y recargos, información de pago (GCash, PayPal, banco), exportación a PDF y guardado/carga local. Sin backend ni cuenta.",
    "Personal Budget Tracker": "Control de presupuesto personal",
    "Web Application": "Aplicación web",
    "A custom budgeting and expense-tracking app with calculations, expense categories, and a visual interface designed for practical everyday use.": "Una aplicación personalizada para presupuestos y control de gastos, con cálculos, categorías de gastos y una interfaz visual pensada para el uso diario.",
    "Home Server": "Servidor doméstico",
    "Infrastructure": "Infraestructura",
    "An old laptop converted into a personal Ubuntu Server and CasaOS environment running multiple self-hosted services and serving as a personal infrastructure lab.": "Un portátil antiguo convertido en un servidor Ubuntu personal y entorno CasaOS que ejecuta varios servicios autoalojados y funciona como laboratorio personal de infraestructura.",
    "n8n Automations": "Automatizaciones con n8n",
    "Automation · AI": "Automatización · IA",
    "Workflow automations connecting tools, APIs, webhooks, and AI-assisted steps to eliminate repetitive manual work across different systems.": "Automatizaciones que conectan herramientas, APIs, webhooks y pasos asistidos por IA para eliminar trabajo manual repetitivo entre distintos sistemas.",
    "Custom Web Projects": "Proyectos web personalizados",
    "Web Development": "Desarrollo web",
    "Custom websites, dashboards, landing pages, and utility applications built through hands-on and AI-assisted development.": "Sitios web, paneles, landing pages y aplicaciones utilitarias creadas mediante desarrollo práctico y asistido por IA.",
    "AI-Assisted Development": "Desarrollo asistido por IA",
    "AI · Development": "IA · Desarrollo",
    "Using AI as a practical development tool to prototype, build, troubleshoot, and turn operational ideas into working projects.": "Uso la IA como herramienta práctica de desarrollo para crear prototipos, construir, solucionar problemas y convertir ideas operativas en proyectos funcionales.",
    "Raspberry Pi · Embedded Tech": "Raspberry Pi · Tecnología embebida",
    "Technical Experimentation": "Experimentación técnica",
    "Ongoing exploration of Raspberry Pi, Arduino, ESP32, networking, automation, and cybersecurity-related projects.": "Exploración continua de Raspberry Pi, Arduino, ESP32, redes, automatización y proyectos relacionados con ciberseguridad.",
    "My Portfolio": "Mi portafolio",
    "Web Development · Personal Project": "Desarrollo web · Proyecto personal",
    "This portfolio itself is one of my personal builds, combining my STR operations background with web development, AI-assisted development, responsive UI, and practical experimentation.": "Este portafolio es uno de mis proyectos personales y combina mi experiencia en operaciones STR con desarrollo web, desarrollo asistido por IA, UI responsive y experimentación práctica.",
    "Chrome Extension": "Extensión de Chrome",
    "STR Operations": "Operaciones STR",
    "Local-first": "Local-first",
    "React / Next.js": "React / Next.js",
    "AI Workflows": "Flujos de IA",
    "Prompt Engineering": "Ingeniería de prompts",
    "Design & Productivity": "Diseño y productividad",
    "Web & Development": "Web y desarrollo",
    "Communication": "Comunicación",
    "Automation & AI": "Automatización e IA"
  },
  "fr": {
    "STR OPERATIONS + TECH + AUTOMATION": "OPÉRATIONS STR + TECH + AUTOMATISATION",
    "Hi, I'm Von.": "Bonjour, je suis Von.",
    "I’m an STR operations specialist focused on ": "Je suis spécialiste des opérations STR, avec un fort accent sur ",
    "guest communications, property management, and operational workflows": "la communication avec les voyageurs, la gestion des propriétés et les flux opérationnels",
    ", with a technical edge in automation, AI, and practical web projects. I don’t just operate software. I look for ways to make the operation work better.": ", avec une dimension technique en automatisation, IA et projets web pratiques. Je ne me contente pas d’utiliser les logiciels. Je cherche des moyens d’améliorer le fonctionnement des opérations.",
    "STR OPERATIONS · PHILIPPINES · REMOTE": "OPÉRATIONS STR · PHILIPPINES · À DISTANCE",
    "Guest services across 400+ properties.": "Service voyageurs pour plus de 400 propriétés.",
    "U.S.-based STR operations across multiple markets — NJ Shore, Vermont, New Orleans. Handling guest-facing work and the processes behind it.": "Opérations STR basées aux États-Unis sur plusieurs marchés — NJ Shore, Vermont et La Nouvelle-Orléans. Gestion du travail côté voyageurs et des processus qui le soutiennent.",
    "Inquiry handling, reservation support, check-in coordination, issue resolution, and escalation management.": "Gestion des demandes, support des réservations, coordination du check-in, résolution des problèmes et gestion des escalades.",
    "Pre-arrival workflows, guest verification, preparation, and coordination before check-in day.": "Flux avant arrivée, vérification des voyageurs, préparation et coordination avant le jour du check-in.",
    "Maintenance coordination, cleaning follow-up, troubleshooting, and operational tracking across turnovers.": "Coordination de la maintenance, suivi du nettoyage, dépannage et suivi opérationnel entre les séjours.",
    "Documentation, reporting, SOPs, process organization, and operational workflow design.": "Documentation, reporting, SOP, organisation des processus et conception des flux opérationnels.",
    "Operations came first.": "Les opérations sont venues en premier.",
    "I didn't leave operations to become technical. I kept working in operations while learning how to build better systems around the work.": "Je n’ai pas quitté les opérations pour devenir technique. J’ai continué à travailler dans les opérations tout en apprenant à construire de meilleurs systèmes autour du travail.",
    "Built a strong foundation in customer communication, sales, problem-solving, handling difficult conversations, and working inside structured operational environments.": "J’ai construit une solide base en communication client, vente, résolution de problèmes, gestion des conversations difficiles et travail dans des environnements opérationnels structurés.",
    "Supporting U.S.-based short-term rental operations across multiple markets. Guest services, reservations, pre-arrival workflows, escalations, maintenance coordination, cleaning coordination, reporting, SOPs, and internal operations.": "Je soutiens des opérations de locations courte durée basées aux États-Unis sur plusieurs marchés. Service voyageurs, réservations, flux avant arrivée, escalades, coordination maintenance et nettoyage, reporting, SOP et opérations internes.",
    "Building practical automations, web applications, Chrome extensions, self-hosted systems, and AI-assisted projects alongside operations work. Start with the problem, build the simplest useful solution.": "Je construis des automatisations pratiques, applications web, extensions Chrome, systèmes auto-hébergés et projets assistés par IA en parallèle de mon travail opérationnel. Je pars du problème et construis la solution utile la plus simple.",
    "I don't just use tools. I build with them.": "Je ne me contente pas d’utiliser les outils. Je construis avec eux.",
    "Practical projects showing how I use technology to solve real operational problems.": "Des projets pratiques qui montrent comment j’utilise la technologie pour résoudre de vrais problèmes opérationnels.",
    "These are personal experiments and self-taught projects that show what I’m interested in learning beyond day-to-day STR operations. They’re not presented as senior engineering work, but as proof that I like building and figuring things out.": "Ce sont des expériences personnelles et des projets autodidactes qui montrent ce que j’aime apprendre au-delà des opérations STR quotidiennes. Je ne les présente pas comme du travail d’ingénierie senior, mais comme la preuve que j’aime construire et comprendre les choses.",
    "My core skill is STR operations. The technical side is an added capability I’m building through self-directed learning and personal projects. I’m not presenting myself as a senior software engineer or AI specialist. I’m comfortable learning new tools, troubleshooting, and building practical things when a real problem gives me a reason to.": "Ma compétence principale est l’opérationnel STR. La partie technique est une capacité supplémentaire que je développe grâce à l’apprentissage autodidacte et aux projets personnels. Je ne me présente pas comme ingénieur logiciel senior ou spécialiste de l’IA. Je suis à l’aise pour apprendre de nouveaux outils, résoudre des problèmes et construire des choses pratiques lorsqu’un problème réel me donne une raison de le faire.",
    "Need someone who can operate and build?": "Besoin de quelqu’un capable d’opérer et de construire ?",
    "Best suited for STR property managers, growing operations teams, and small businesses that need someone who understands both operations and technology.": "Idéal pour les gestionnaires de propriétés STR, les équipes opérationnelles en croissance et les petites entreprises qui ont besoin de quelqu’un qui comprend à la fois les opérations et la technologie.",
    "My core work is guest communication, property management support, coordination, follow-ups, and the day-to-day workflows that keep short-term rental operations moving.": "Mon travail principal est la communication avec les voyageurs, le soutien à la gestion des propriétés, la coordination, les suivis et les flux quotidiens qui font avancer les opérations de location courte durée.",
    "The technical side is the extra: I’m self-taught, curious, and always interested in finding a practical way to improve a process.": "La partie technique est un plus : je suis autodidacte, curieux et toujours intéressé par une façon pratique d’améliorer un processus.",
    "Philippines · UTC+8 · Remote-Ready": "Philippines · UTC+8 · Prêt pour le travail à distance",
    "Operate · Build · Improve · Repeat": "Opérer · Construire · Améliorer · Répéter",
    "Your name or company": "Votre nom ou entreprise",
    "Send Message": "Envoyer le message",
    "Sending…": "Envoi…",
    "Sent. I'll be in touch soon.": "Envoyé. Je vous contacterai bientôt.",
    "Something went wrong. Try again.": "Une erreur s’est produite. Réessayez.",
    "Tell me about your property or where the operation is getting stuck…": "Parlez-moi de votre propriété ou de l’endroit où l’opération bloque…",
    "Hey! I'm Von. Let's work together. Fill out the form →": "Bonjour ! Je suis Von. Travaillons ensemble. Remplissez le formulaire →",
    "I'm reading every word — tell me about your property! 👀": "Je lis chaque mot — parlez-moi de votre propriété ! 👀",
    "📨 Sending your message...": "📨 Envoi de votre message...",
    "😬 Hmm, something went wrong. Try again?": "😬 Hmm, une erreur s’est produite. Réessayer ?",
    "🎉 Got it! I'll be in touch soon. Salamat!": "🎉 Reçu ! Je vous contacterai bientôt.",
    "What do you actually do?": "Que faites-vous réellement ?",
    "How do you handle guest communications?": "Comment gérez-vous les échanges avec les voyageurs ?",
    "What does property management mean in your role?": "Que signifie la gestion de propriétés dans votre rôle ?",
    "How do you use automation and AI?": "Comment utilisez-vous l’automatisation et l’IA ?",
    "What makes you different from a typical VA?": "Qu’est-ce qui vous distingue d’un VA classique ?",
    "What technical stuff are you learning?": "Quelles compétences techniques apprenez-vous ?",
    "I work in short-term rental operations, with a strong focus on guest communications and the day-to-day work that keeps properties running smoothly. My experience includes guest inquiries, reservation support, pre-arrival communication, check-in support, troubleshooting, issue and escalation management, maintenance and cleaning coordination, follow-ups, reporting, documentation, and internal handovers. I work across the systems behind the operation too, making sure information is organized and the right people know what needs to happen next.": "Je travaille dans les opérations de locations courte durée, avec un fort accent sur la communication avec les voyageurs et le travail quotidien qui permet aux propriétés de fonctionner correctement. Mon expérience comprend les demandes des voyageurs, le support des réservations, la communication avant arrivée, le support au check-in, le dépannage, la gestion des problèmes et escalades, la coordination maintenance et nettoyage, les suivis, le reporting, la documentation et les handovers internes. Je travaille aussi sur les systèmes derrière l’opération, en veillant à ce que l’information soit organisée et que les bonnes personnes sachent ce qui doit se passer ensuite.",
    "I treat guest communication as part of the operation, not just customer service. I handle questions, requests, complaints, check-in concerns, troubleshooting, reservation-related issues, and situations that need escalation. I focus on being responsive, accurate, calm, and clear about the next step while keeping the relevant operational context in mind.": "Je considère la communication avec les voyageurs comme une partie de l’opération, pas seulement du service client. Je gère les questions, demandes, plaintes, problèmes de check-in, dépannages, problèmes liés aux réservations et situations nécessitant une escalade. Je privilégie la réactivité, la précision, le calme et la clarté sur la prochaine étape tout en gardant le contexte opérationnel en tête.",
    "For me, property management is about keeping the moving parts of a short-term rental operation organized. That includes reservations, pre-arrival requirements, guest concerns, cleaning and maintenance coordination, open issues, follow-ups, documentation, and handovers. In a multi-property environment, consistency and good information flow matter because small details can quickly become bigger operational problems.": "Pour moi, la gestion de propriétés consiste à organiser les nombreuses composantes d’une opération de location courte durée. Cela comprend les réservations, les exigences avant arrivée, les préoccupations des voyageurs, la coordination du nettoyage et de la maintenance, les problèmes ouverts, les suivis, la documentation et les handovers. Dans un environnement multi-propriétés, la cohérence et un bon flux d’information sont essentiels car de petits détails peuvent rapidement devenir de gros problèmes opérationnels.",
    "Automation and AI are interests and practical tools I’m learning to use alongside my STR operations experience. I experiment with n8n, APIs, webhooks, AI-assisted workflows, and custom tools when they can reduce repetitive work or improve a process. I’m self-taught and still learning, so I don’t present myself as an automation or AI expert. I’m interested in understanding what technology can realistically improve and building things to learn by doing.": "L’automatisation et l’IA sont des centres d’intérêt et des outils pratiques que j’apprends à utiliser avec mon expérience en opérations STR. J’expérimente avec n8n, les API, les webhooks, les workflows assistés par IA et les outils personnalisés lorsqu’ils peuvent réduire le travail répétitif ou améliorer un processus. Je suis autodidacte et toujours en apprentissage, donc je ne me présente pas comme expert en automatisation ou en IA. Je cherche à comprendre ce que la technologie peut réellement améliorer et à construire pour apprendre en faisant.",
    "My foundation is STR operations. I understand guest communications, property management workflows, follow-ups, escalations, coordination, SOPs, and the realities of keeping day-to-day operations moving. My technical interest gives me another way to look at problems. If something is unnecessarily manual, scattered, or repetitive, I naturally start thinking about whether the process, documentation, or technology could be improved.": "Ma base est l’opérationnel STR. Je comprends la communication avec les voyageurs, les workflows de gestion des propriétés, les suivis, les escalades, la coordination, les SOP et la réalité de maintenir les opérations quotidiennes. Mon intérêt technique m’offre une autre façon d’aborder les problèmes. Si quelque chose est inutilement manuel, dispersé ou répétitif, je commence naturellement à réfléchir à la manière d’améliorer le processus, la documentation ou la technologie.",
    "Outside of my STR work, I’m teaching myself practical technology through personal projects. I’ve been exploring web development, n8n automation, AI-assisted development, Linux, Docker, self-hosting, networking, Raspberry Pi, ESP32, Arduino, and cybersecurity-related projects. I’m not claiming to be an expert in these areas yet. I’m building, experimenting, troubleshooting, and learning because I genuinely enjoy figuring out how things work.": "En dehors de mon travail STR, j’apprends par moi-même la technologie pratique grâce à des projets personnels. J’explore le développement web, l’automatisation n8n, le développement assisté par IA, Linux, Docker, l’auto-hébergement, le réseau, Raspberry Pi, ESP32, Arduino et des projets liés à la cybersécurité. Je ne prétends pas encore être expert dans ces domaines. Je construis, expérimente, dépanne et apprends parce que j’aime sincèrement comprendre comment les choses fonctionnent.",
    "Keep the workflow moving": "Faire avancer le workflow",
    "Find friction and gaps": "Trouver les frictions et les lacunes",
    "Create tools and systems": "Créer des outils et des systèmes",
    "Test and make it better": "Tester et améliorer",
    "I’m Von Untalan, a Filipino remote professional with a background in BPO, customer service, short-term rental operations, automation, and technology.": "Je suis Von Untalan, un professionnel philippin travaillant à distance, avec une expérience en BPO, service client, opérations de locations courte durée, automatisation et technologie.",
    "I started in BPO in 2015 and later moved into remote STR work, where I found I enjoyed more than just communicating with guests. I liked understanding how the operation worked, where processes were repetitive, and where information could get lost.": "J’ai commencé dans le BPO en 2015, puis je suis passé au travail STR à distance, où j’ai découvert que j’aimais bien plus que la simple communication avec les voyageurs. J’aimais comprendre comment l’opération fonctionnait, où les processus se répétaient et où l’information pouvait se perdre.",
    "How information moves. Where workflows break down. Why teams keep solving the same problem.": "Comment circule l’information. Où les flux de travail se cassent. Pourquoi les équipes résolvent encore et encore le même problème.",
    "That curiosity eventually led me to teach myself automation, AI, web development, and other technical skills through personal projects. These are interests I’m actively building, not areas where I claim to be an expert.": "Cette curiosité m’a finalement poussé à apprendre par moi-même l’automatisation, l’IA, le développement web et d’autres compétences techniques grâce à des projets personnels. Ce sont des domaines que je développe activement, pas des domaines dans lesquels je me présente comme expert.",
    "© 2026 Von Untalan · STR Operations & Guest Services Specialist": "© 2026 Von Untalan · Spécialiste des opérations STR et du service voyageurs",
    "STR OpsDesk": "STR OpsDesk",
    "Chrome Extension · Internal Tool": "Extension Chrome · Outil interne",
    "A custom Chrome extension built for real STR shift work — issue tracking, message snippets, property notes, handover generation, and shift management. Built because no existing tool fit the actual workflow.": "Une extension Chrome personnalisée conçue pour le vrai travail STR par shift — suivi des problèmes, extraits de messages, notes de propriétés, génération de handovers et gestion des shifts. Créée parce qu’aucun outil existant ne correspondait au workflow réel.",
    "Invoice Generator": "Générateur de factures",
    "Web Application · Freelancer Tool": "Application web · Outil freelance",
    "A fully featured invoice generator built for freelancers and VAs — 3 templates, custom accent colors, line items with quantity/rate/tax, discount and surcharge logic, payment info (GCash, PayPal, bank), PDF export, and local save/load. No backend, no account needed.": "Un générateur de factures complet pour freelances et VAs — 3 modèles, couleurs d’accent personnalisées, lignes avec quantité/tarif/taxe, remises et suppléments, informations de paiement (GCash, PayPal, banque), export PDF et sauvegarde/chargement local. Aucun backend ni compte requis.",
    "Personal Budget Tracker": "Suivi de budget personnel",
    "Web Application": "Application web",
    "A custom budgeting and expense-tracking app with calculations, expense categories, and a visual interface designed for practical everyday use.": "Une application personnalisée de budget et de suivi des dépenses, avec calculs, catégories de dépenses et interface visuelle conçue pour un usage quotidien.",
    "Home Server": "Serveur personnel",
    "Infrastructure": "Infrastructure",
    "An old laptop converted into a personal Ubuntu Server and CasaOS environment running multiple self-hosted services and serving as a personal infrastructure lab.": "Un ancien ordinateur portable transformé en serveur Ubuntu personnel et environnement CasaOS exécutant plusieurs services auto-hébergés et servant de laboratoire d’infrastructure personnel.",
    "n8n Automations": "Automatisations n8n",
    "Automation · AI": "Automatisation · IA",
    "Workflow automations connecting tools, APIs, webhooks, and AI-assisted steps to eliminate repetitive manual work across different systems.": "Des automatisations qui connectent outils, API, webhooks et étapes assistées par IA afin d’éliminer le travail manuel répétitif entre différents systèmes.",
    "Custom Web Projects": "Projets web personnalisés",
    "Web Development": "Développement web",
    "Custom websites, dashboards, landing pages, and utility applications built through hands-on and AI-assisted development.": "Sites web, dashboards, landing pages et applications utilitaires créés grâce au développement pratique et assisté par IA.",
    "AI-Assisted Development": "Développement assisté par IA",
    "AI · Development": "IA · Développement",
    "Using AI as a practical development tool to prototype, build, troubleshoot, and turn operational ideas into working projects.": "J’utilise l’IA comme outil pratique de développement pour prototyper, construire, résoudre des problèmes et transformer des idées opérationnelles en projets fonctionnels.",
    "Raspberry Pi · Embedded Tech": "Raspberry Pi · Technologie embarquée",
    "Technical Experimentation": "Expérimentation technique",
    "Ongoing exploration of Raspberry Pi, Arduino, ESP32, networking, automation, and cybersecurity-related projects.": "Exploration continue de Raspberry Pi, Arduino, ESP32, réseau, automatisation et projets liés à la cybersécurité.",
    "My Portfolio": "Mon portfolio",
    "Web Development · Personal Project": "Développement web · Projet personnel",
    "This portfolio itself is one of my personal builds, combining my STR operations background with web development, AI-assisted development, responsive UI, and practical experimentation.": "Ce portfolio est lui-même l’un de mes projets personnels, combinant mon expérience en opérations STR avec développement web, développement assisté par IA, interface responsive et expérimentation pratique.",
    "Chrome Extension": "Extension Chrome",
    "STR Operations": "Opérations STR",
    "Local-first": "Local-first",
    "React / Next.js": "React / Next.js",
    "AI Workflows": "Workflows IA",
    "Prompt Engineering": "Ingénierie des prompts",
    "Design & Productivity": "Design et productivité",
    "Web & Development": "Web et développement",
    "Communication": "Communication",
    "Automation & AI": "Automatisation et IA"
  },
  "fil": {
    "STR OPERATIONS + TECH + AUTOMATION": "STR OPERATIONS + TECH + AUTOMATION",
    "Hi, I'm Von.": "Hi, ako si Von.",
    "I’m an STR operations specialist focused on ": "Isa akong STR operations specialist na nakatuon sa ",
    "guest communications, property management, and operational workflows": "guest communications, property management, at operational workflows",
    ", with a technical edge in automation, AI, and practical web projects. I don’t just operate software. I look for ways to make the operation work better.": ", na may technical edge sa automation, AI, at practical web projects. Hindi lang ako gumagamit ng software. Naghahanap ako ng paraan para mas gumana nang maayos ang operation.",
    "STR OPERATIONS · PHILIPPINES · REMOTE": "STR OPERATIONS · PILIPINAS · REMOTE",
    "Guest services across 400+ properties.": "Guest services para sa 400+ properties.",
    "U.S.-based STR operations across multiple markets — NJ Shore, Vermont, New Orleans. Handling guest-facing work and the processes behind it.": "U.S.-based STR operations sa iba't ibang markets — NJ Shore, Vermont, at New Orleans. Humahawak ako ng guest-facing work at ng processes sa likod nito.",
    "Inquiry handling, reservation support, check-in coordination, issue resolution, and escalation management.": "Paghawak ng inquiries, reservation support, check-in coordination, pag-resolve ng issues, at escalation management.",
    "Pre-arrival workflows, guest verification, preparation, and coordination before check-in day.": "Pre-arrival workflows, guest verification, preparation, at coordination bago ang check-in day.",
    "Maintenance coordination, cleaning follow-up, troubleshooting, and operational tracking across turnovers.": "Maintenance coordination, cleaning follow-up, troubleshooting, at operational tracking sa turnovers.",
    "Documentation, reporting, SOPs, process organization, and operational workflow design.": "Documentation, reporting, SOPs, process organization, at operational workflow design.",
    "Operations came first.": "Operations ang foundation ko.",
    "I didn't leave operations to become technical. I kept working in operations while learning how to build better systems around the work.": "Hindi ako umalis sa operations para maging technical. Nagpatuloy ako sa operations habang natututo kung paano gumawa ng mas magandang systems sa paligid ng work.",
    "Built a strong foundation in customer communication, sales, problem-solving, handling difficult conversations, and working inside structured operational environments.": "Nagkaroon ako ng matibay na foundation sa customer communication, sales, problem-solving, pag-handle ng mahihirap na conversations, at pagtatrabaho sa structured operational environments.",
    "Supporting U.S.-based short-term rental operations across multiple markets. Guest services, reservations, pre-arrival workflows, escalations, maintenance coordination, cleaning coordination, reporting, SOPs, and internal operations.": "Nagsu-support ako ng U.S.-based short-term rental operations sa iba't ibang markets. Guest services, reservations, pre-arrival workflows, escalations, maintenance coordination, cleaning coordination, reporting, SOPs, at internal operations.",
    "Building practical automations, web applications, Chrome extensions, self-hosted systems, and AI-assisted projects alongside operations work. Start with the problem, build the simplest useful solution.": "Gumagawa ako ng practical automations, web applications, Chrome extensions, self-hosted systems, at AI-assisted projects kasabay ng operations work. Magsimula sa problema, tapos gumawa ng pinakasimpleng useful solution.",
    "I don't just use tools. I build with them.": "Hindi lang ako gumagamit ng tools. Nagbu-build din ako gamit ang mga ito.",
    "Practical projects showing how I use technology to solve real operational problems.": "Mga practical project na nagpapakita kung paano ko ginagamit ang tech para lutasin ang totoong operational problems.",
    "These are personal experiments and self-taught projects that show what I’m interested in learning beyond day-to-day STR operations. They’re not presented as senior engineering work, but as proof that I like building and figuring things out.": "Mga personal experiments at self-taught projects ito na nagpapakita kung ano ang gusto kong matutunan lampas sa day-to-day STR operations. Hindi ko sila pinapakita bilang senior engineering work, kundi bilang proof na mahilig akong mag-build at mag-figure out ng mga bagay.",
    "My core skill is STR operations. The technical side is an added capability I’m building through self-directed learning and personal projects. I’m not presenting myself as a senior software engineer or AI specialist. I’m comfortable learning new tools, troubleshooting, and building practical things when a real problem gives me a reason to.": "Ang core skill ko ay STR operations. Ang technical side ay dagdag na capability na binubuo ko sa self-directed learning at personal projects. Hindi ko ipinipresent ang sarili ko bilang senior software engineer o AI specialist. Komportable akong matuto ng bagong tools, mag-troubleshoot, at gumawa ng practical na bagay kapag may totoong problem na kailangan ng solution.",
    "Need someone who can operate and build?": "Kailangan mo ng marunong mag-operate at mag-build?",
    "Best suited for STR property managers, growing operations teams, and small businesses that need someone who understands both operations and technology.": "Bagay ito sa STR property managers, growing operations teams, at small businesses na kailangan ng taong naiintindihan ang operations at technology.",
    "My core work is guest communication, property management support, coordination, follow-ups, and the day-to-day workflows that keep short-term rental operations moving.": "Ang core work ko ay guest communication, property management support, coordination, follow-ups, at day-to-day workflows na nagpapatuloy sa STR operations.",
    "The technical side is the extra: I’m self-taught, curious, and always interested in finding a practical way to improve a process.": "Bonus ang technical side: self-taught ako, curious, at laging naghahanap ng practical na paraan para mapaganda ang proseso.",
    "Philippines · UTC+8 · Remote-Ready": "Pilipinas · UTC+8 · Ready for remote work",
    "Operate · Build · Improve · Repeat": "Operate · Build · Improve · Repeat",
    "Your name or company": "Pangalan mo o company",
    "Send Message": "I-send ang message",
    "Sending…": "Sini-send…",
    "Sent. I'll be in touch soon.": "Na-send na. Babalik ako sa iyo soon.",
    "Something went wrong. Try again.": "May nagkaproblema. Subukan ulit.",
    "Tell me about your property or where the operation is getting stuck…": "Sabihin mo sa akin ang tungkol sa property mo o kung saan nai-stuck ang operation…",
    "Hey! I'm Von. Let's work together. Fill out the form →": "Hi! Ako si Von. Mag-work tayo together. Fill out ang form →",
    "I'm reading every word — tell me about your property! 👀": "Binabasa ko bawat word — sabihin mo sa akin ang tungkol sa property mo! 👀",
    "📨 Sending your message...": "📨 Sini-send ang message mo...",
    "😬 Hmm, something went wrong. Try again?": "😬 Hmm, may nagkaproblema. Subukan ulit?",
    "🎉 Got it! I'll be in touch soon. Salamat!": "🎉 Got it! Babalikan kita soon. Salamat!",
    "What do you actually do?": "Ano ba talaga ang ginagawa mo?",
    "How do you handle guest communications?": "Paano mo hina-handle ang guest communications?",
    "What does property management mean in your role?": "Ano ang property management sa role mo?",
    "How do you use automation and AI?": "Paano mo ginagamit ang automation at AI?",
    "What makes you different from a typical VA?": "Ano ang difference mo sa typical VA?",
    "What technical stuff are you learning?": "Anong technical stuff ang pinag-aaralan mo?",
    "I work in short-term rental operations, with a strong focus on guest communications and the day-to-day work that keeps properties running smoothly. My experience includes guest inquiries, reservation support, pre-arrival communication, check-in support, troubleshooting, issue and escalation management, maintenance and cleaning coordination, follow-ups, reporting, documentation, and internal handovers. I work across the systems behind the operation too, making sure information is organized and the right people know what needs to happen next.": "Nagtatrabaho ako sa short-term rental operations, na malaking focus ang guest communications at day-to-day work na nagpapatakbo nang maayos sa properties. Kasama sa experience ko ang guest inquiries, reservation support, pre-arrival communication, check-in support, troubleshooting, issue at escalation management, maintenance at cleaning coordination, follow-ups, reporting, documentation, at internal handovers. Gumagamit din ako ng systems sa likod ng operation para organized ang information at alam ng tamang tao kung ano ang next step.",
    "I treat guest communication as part of the operation, not just customer service. I handle questions, requests, complaints, check-in concerns, troubleshooting, reservation-related issues, and situations that need escalation. I focus on being responsive, accurate, calm, and clear about the next step while keeping the relevant operational context in mind.": "Tinitingnan ko ang guest communication bilang bahagi ng operation, hindi lang customer service. Humahawak ako ng questions, requests, complaints, check-in concerns, troubleshooting, reservation issues, at situations na kailangan ng escalation. Focus ko ang pagiging responsive, accurate, kalmado, at malinaw sa next step habang iniisip ang buong operational context.",
    "For me, property management is about keeping the moving parts of a short-term rental operation organized. That includes reservations, pre-arrival requirements, guest concerns, cleaning and maintenance coordination, open issues, follow-ups, documentation, and handovers. In a multi-property environment, consistency and good information flow matter because small details can quickly become bigger operational problems.": "Para sa akin, ang property management ay tungkol sa pag-aayos ng lahat ng moving parts ng short-term rental operation. Kasama dito ang reservations, pre-arrival requirements, guest concerns, cleaning at maintenance coordination, open issues, follow-ups, documentation, at handovers. Kapag maraming properties, mahalaga ang consistency at maayos na information flow dahil ang maliit na detail puwedeng maging malaking operational problem.",
    "Automation and AI are interests and practical tools I’m learning to use alongside my STR operations experience. I experiment with n8n, APIs, webhooks, AI-assisted workflows, and custom tools when they can reduce repetitive work or improve a process. I’m self-taught and still learning, so I don’t present myself as an automation or AI expert. I’m interested in understanding what technology can realistically improve and building things to learn by doing.": "Ang automation at AI ay interests at practical tools na pinag-aaralan kong gamitin kasama ng STR operations experience ko. Nag-e-experiment ako sa n8n, APIs, webhooks, AI-assisted workflows, at custom tools kapag puwedeng bawasan ang repetitive work o pagandahin ang process. Self-taught ako at patuloy pa ring natututo, kaya hindi ko ipinipresent ang sarili ko bilang automation o AI expert. Gusto kong malaman kung ano ang realistic na kayang i-improve ng technology at matuto habang nagbu-build.",
    "My foundation is STR operations. I understand guest communications, property management workflows, follow-ups, escalations, coordination, SOPs, and the realities of keeping day-to-day operations moving. My technical interest gives me another way to look at problems. If something is unnecessarily manual, scattered, or repetitive, I naturally start thinking about whether the process, documentation, or technology could be improved.": "STR operations ang foundation ko. Naiintindihan ko ang guest communications, property management workflows, follow-ups, escalations, coordination, SOPs, at kung paano talaga pinapagalaw ang day-to-day operations. Ang technical interest ko ay nagbibigay sa akin ng ibang paraan para tumingin sa problems. Kapag may bagay na sobrang manual, kalat, o repetitive, natural kong naiisip kung puwedeng i-improve ang process, documentation, o technology.",
    "Outside of my STR work, I’m teaching myself practical technology through personal projects. I’ve been exploring web development, n8n automation, AI-assisted development, Linux, Docker, self-hosting, networking, Raspberry Pi, ESP32, Arduino, and cybersecurity-related projects. I’m not claiming to be an expert in these areas yet. I’m building, experimenting, troubleshooting, and learning because I genuinely enjoy figuring out how things work.": "Outside STR work, tinuturuan ko ang sarili ko ng practical technology gamit ang personal projects. Nag-e-explore ako ng web development, n8n automation, AI-assisted development, Linux, Docker, self-hosting, networking, Raspberry Pi, ESP32, Arduino, at cybersecurity-related projects. Hindi ko pa sinasabing expert ako sa mga ito. Nagbu-build, nag-e-experiment, nagta-troubleshoot, at natututo ako dahil genuinely enjoy kong alamin kung paano gumagana ang mga bagay.",
    "Keep the workflow moving": "Panatilihing gumagalaw ang workflow",
    "Find friction and gaps": "Hanapin ang friction at gaps",
    "Create tools and systems": "Gumawa ng tools at systems",
    "Test and make it better": "I-test at pagandahin",
    "I’m Von Untalan, a Filipino remote professional with a background in BPO, customer service, short-term rental operations, automation, and technology.": "Ako si Von Untalan, isang Filipino remote professional na may background sa BPO, customer service, short-term rental operations, automation, at technology.",
    "I started in BPO in 2015 and later moved into remote STR work, where I found I enjoyed more than just communicating with guests. I liked understanding how the operation worked, where processes were repetitive, and where information could get lost.": "Nagsimula ako sa BPO noong 2015 at kalaunan ay lumipat sa remote STR work. Doon ko nakita na mas gusto ko hindi lang makipag-communicate sa guests kundi maintindihan kung paano gumagana ang operation, saan paulit-ulit ang proseso, at saan nawawala ang impormasyon.",
    "How information moves. Where workflows break down. Why teams keep solving the same problem.": "Paano gumagalaw ang impormasyon. Saan nasisira ang workflow. Bakit paulit-ulit na sine-solve ng teams ang parehong problema.",
    "That curiosity eventually led me to teach myself automation, AI, web development, and other technical skills through personal projects. These are interests I’m actively building, not areas where I claim to be an expert.": "Dahil sa curiosity na iyon, natuto ako sa automation, AI, web development, at iba pang technical skills gamit ang personal projects. Mga skills ito na patuloy kong binubuo, hindi mga bagay na inaangkin kong expert na ako.",
    "© 2026 Von Untalan · STR Operations & Guest Services Specialist": "© 2026 Von Untalan · STR Operations & Guest Services Specialist",
    "STR OpsDesk": "STR OpsDesk",
    "Chrome Extension · Internal Tool": "Chrome Extension · Internal Tool",
    "A custom Chrome extension built for real STR shift work — issue tracking, message snippets, property notes, handover generation, and shift management. Built because no existing tool fit the actual workflow.": "Custom Chrome extension para sa actual STR shift work — issue tracking, message snippets, property notes, handover generation, at shift management. Ginawa ko ito dahil walang existing tool na swak sa actual workflow.",
    "Invoice Generator": "Invoice Generator",
    "Web Application · Freelancer Tool": "Web Application · Freelancer Tool",
    "A fully featured invoice generator built for freelancers and VAs — 3 templates, custom accent colors, line items with quantity/rate/tax, discount and surcharge logic, payment info (GCash, PayPal, bank), PDF export, and local save/load. No backend, no account needed.": "Fully featured invoice generator para sa freelancers at VAs — 3 templates, custom accent colors, line items na may quantity/rate/tax, discount at surcharge logic, payment info (GCash, PayPal, bank), PDF export, at local save/load. Walang backend at walang account na kailangan.",
    "Personal Budget Tracker": "Personal Budget Tracker",
    "Web Application": "Web Application",
    "A custom budgeting and expense-tracking app with calculations, expense categories, and a visual interface designed for practical everyday use.": "Custom budgeting at expense-tracking app na may calculations, expense categories, at visual interface para sa practical everyday use.",
    "Home Server": "Home Server",
    "Infrastructure": "Infrastructure",
    "An old laptop converted into a personal Ubuntu Server and CasaOS environment running multiple self-hosted services and serving as a personal infrastructure lab.": "Lumang laptop na ginawang personal Ubuntu Server at CasaOS environment na nagpapatakbo ng maraming self-hosted services at nagsisilbing personal infrastructure lab.",
    "n8n Automations": "n8n Automations",
    "Automation · AI": "Automation · AI",
    "Workflow automations connecting tools, APIs, webhooks, and AI-assisted steps to eliminate repetitive manual work across different systems.": "Workflow automations na nagko-connect ng tools, APIs, webhooks, at AI-assisted steps para mabawasan ang repetitive manual work sa iba't ibang systems.",
    "Custom Web Projects": "Custom Web Projects",
    "Web Development": "Web Development",
    "Custom websites, dashboards, landing pages, and utility applications built through hands-on and AI-assisted development.": "Custom websites, dashboards, landing pages, at utility apps na ginawa sa pamamagitan ng hands-on at AI-assisted development.",
    "AI-Assisted Development": "AI-Assisted Development",
    "AI · Development": "AI · Development",
    "Using AI as a practical development tool to prototype, build, troubleshoot, and turn operational ideas into working projects.": "Ginagamit ko ang AI bilang practical development tool para mag-prototype, mag-build, mag-troubleshoot, at gawing working projects ang operational ideas.",
    "Raspberry Pi · Embedded Tech": "Raspberry Pi · Embedded Tech",
    "Technical Experimentation": "Technical Experimentation",
    "Ongoing exploration of Raspberry Pi, Arduino, ESP32, networking, automation, and cybersecurity-related projects.": "Patuloy na pag-explore ng Raspberry Pi, Arduino, ESP32, networking, automation, at cybersecurity-related projects.",
    "My Portfolio": "My Portfolio",
    "Web Development · Personal Project": "Web Development · Personal Project",
    "This portfolio itself is one of my personal builds, combining my STR operations background with web development, AI-assisted development, responsive UI, and practical experimentation.": "Itong portfolio mismo ay isa sa personal builds ko, na pinagsasama ang STR operations background ko, web development, AI-assisted development, responsive UI, at practical experimentation.",
    "Chrome Extension": "Chrome Extension",
    "STR Operations": "STR Operations",
    "Local-first": "Local-first",
    "React / Next.js": "React / Next.js",
    "AI Workflows": "AI Workflows",
    "Prompt Engineering": "Prompt Engineering",
    "Design & Productivity": "Design at Productivity",
    "Web & Development": "Web at Development",
    "Communication": "Communication",
    "Automation & AI": "Automation at AI"
  },
  "zh": {
    "STR OPERATIONS + TECH + AUTOMATION": "STR 运营 + 技术 + 自动化",
    "Hi, I'm Von.": "你好，我是 Von。",
    "I’m an STR operations specialist focused on ": "我是 STR 运营专业人士，主要负责",
    "guest communications, property management, and operational workflows": "客户沟通、房源管理和运营工作流",
    ", with a technical edge in automation, AI, and practical web projects. I don’t just operate software. I look for ways to make the operation work better.": "，同时具备自动化、AI 和实用网页项目方面的技术能力。我不只是使用软件，也会寻找让运营做得更好的方法。",
    "STR OPERATIONS · PHILIPPINES · REMOTE": "STR 运营 · 菲律宾 · 远程",
    "Guest services across 400+ properties.": "服务超过 400 套 STR 房源的客人。",
    "U.S.-based STR operations across multiple markets — NJ Shore, Vermont, New Orleans. Handling guest-facing work and the processes behind it.": "负责美国多个市场的 STR 运营，包括 NJ Shore、Vermont 和 New Orleans，处理面向客人的工作以及背后的运营流程。",
    "Inquiry handling, reservation support, check-in coordination, issue resolution, and escalation management.": "处理咨询、预订支持、入住协调、问题解决和升级处理。",
    "Pre-arrival workflows, guest verification, preparation, and coordination before check-in day.": "入住前流程、客人验证、准备工作以及入住日前的协调。",
    "Maintenance coordination, cleaning follow-up, troubleshooting, and operational tracking across turnovers.": "维护协调、清洁跟进、故障排查以及换客期间的运营跟踪。",
    "Documentation, reporting, SOPs, process organization, and operational workflow design.": "文档、报告、SOP、流程整理和运营工作流设计。",
    "Operations came first.": "运营是我的基础。",
    "I didn't leave operations to become technical. I kept working in operations while learning how to build better systems around the work.": "我没有离开运营岗位去转向技术。我一直在做运营，同时学习如何围绕工作构建更好的系统。",
    "Built a strong foundation in customer communication, sales, problem-solving, handling difficult conversations, and working inside structured operational environments.": "建立了扎实的客户沟通、销售、问题解决、困难沟通以及结构化运营环境工作基础。",
    "Supporting U.S.-based short-term rental operations across multiple markets. Guest services, reservations, pre-arrival workflows, escalations, maintenance coordination, cleaning coordination, reporting, SOPs, and internal operations.": "支持美国多个市场的短租运营，包括客户服务、预订、入住前流程、升级处理、维护协调、清洁协调、报告、SOP 和内部运营。",
    "Building practical automations, web applications, Chrome extensions, self-hosted systems, and AI-assisted projects alongside operations work. Start with the problem, build the simplest useful solution.": "在运营工作的同时构建实用的自动化、网页应用、Chrome 扩展、自托管系统和 AI 辅助项目。从问题出发，构建最简单、真正有用的解决方案。",
    "I don't just use tools. I build with them.": "我不只是使用工具，我也用它们构建东西。",
    "Practical projects showing how I use technology to solve real operational problems.": "通过实际项目展示我如何使用技术解决真实的运营问题。",
    "These are personal experiments and self-taught projects that show what I’m interested in learning beyond day-to-day STR operations. They’re not presented as senior engineering work, but as proof that I like building and figuring things out.": "这些是个人实验和自学项目，展示了我在日常 STR 运营之外感兴趣的学习方向。它们不是以高级工程项目的形式展示，而是证明我喜欢构建和研究事物。",
    "My core skill is STR operations. The technical side is an added capability I’m building through self-directed learning and personal projects. I’m not presenting myself as a senior software engineer or AI specialist. I’m comfortable learning new tools, troubleshooting, and building practical things when a real problem gives me a reason to.": "我的核心能力是 STR 运营。技术能力是我通过自主学习和个人项目逐步建立的额外能力。我不会把自己包装成高级软件工程师或 AI 专家。我擅长学习新工具、排查问题，并在真实问题出现时构建实用的解决方案。",
    "Need someone who can operate and build?": "需要一个既能运营又能构建的人吗？",
    "Best suited for STR property managers, growing operations teams, and small businesses that need someone who understands both operations and technology.": "适合 STR 房源管理者、正在成长的运营团队，以及需要同时理解运营与技术的小型企业。",
    "My core work is guest communication, property management support, coordination, follow-ups, and the day-to-day workflows that keep short-term rental operations moving.": "我的核心工作是客户沟通、房源管理支持、协调、跟进，以及让短租运营持续运转的日常工作流。",
    "The technical side is the extra: I’m self-taught, curious, and always interested in finding a practical way to improve a process.": "技术能力是额外优势：我靠自学成长，保持好奇，并一直寻找改善流程的实用方法。",
    "Philippines · UTC+8 · Remote-Ready": "菲律宾 · UTC+8 · 可远程合作",
    "Operate · Build · Improve · Repeat": "运营 · 构建 · 改进 · 重复",
    "Your name or company": "你的姓名或公司",
    "Send Message": "发送消息",
    "Sending…": "正在发送…",
    "Sent. I'll be in touch soon.": "已发送。我会尽快联系你。",
    "Something went wrong. Try again.": "出了点问题，请再试一次。",
    "Tell me about your property or where the operation is getting stuck…": "告诉我你的房源情况，或运营卡在哪里…",
    "Hey! I'm Von. Let's work together. Fill out the form →": "你好！我是 Von。让我们一起合作。填写下面的表单 →",
    "I'm reading every word — tell me about your property! 👀": "我会认真阅读每句话——告诉我你的房源情况吧！👀",
    "📨 Sending your message...": "📨 正在发送你的消息...",
    "😬 Hmm, something went wrong. Try again?": "😬 嗯，好像出了点问题。再试一次？",
    "🎉 Got it! I'll be in touch soon. Salamat!": "🎉 收到了！我会尽快联系你。",
    "What do you actually do?": "你具体做什么？",
    "How do you handle guest communications?": "你如何处理客人沟通？",
    "What does property management mean in your role?": "房源管理在你的工作中意味着什么？",
    "How do you use automation and AI?": "你如何使用自动化和 AI？",
    "What makes you different from a typical VA?": "你和普通 VA 有什么不同？",
    "What technical stuff are you learning?": "你正在学习哪些技术？",
    "I work in short-term rental operations, with a strong focus on guest communications and the day-to-day work that keeps properties running smoothly. My experience includes guest inquiries, reservation support, pre-arrival communication, check-in support, troubleshooting, issue and escalation management, maintenance and cleaning coordination, follow-ups, reporting, documentation, and internal handovers. I work across the systems behind the operation too, making sure information is organized and the right people know what needs to happen next.": "我从事短租运营，重点是客人沟通以及让房源顺利运行的日常工作。我的经验包括客人咨询、预订支持、入住前沟通、入住支持、故障排查、问题与升级管理、维护和清洁协调、跟进、报告、文档以及内部交接。我也会处理运营背后的系统，确保信息有序，并让正确的人知道下一步该做什么。",
    "I treat guest communication as part of the operation, not just customer service. I handle questions, requests, complaints, check-in concerns, troubleshooting, reservation-related issues, and situations that need escalation. I focus on being responsive, accurate, calm, and clear about the next step while keeping the relevant operational context in mind.": "我把客人沟通视为运营的一部分，而不仅仅是客服。我会处理问题、请求、投诉、入住相关问题、故障排查、预订相关事项以及需要升级处理的情况。我注重响应速度、准确性、冷静处理以及清晰说明下一步，同时考虑相关运营背景。",
    "For me, property management is about keeping the moving parts of a short-term rental operation organized. That includes reservations, pre-arrival requirements, guest concerns, cleaning and maintenance coordination, open issues, follow-ups, documentation, and handovers. In a multi-property environment, consistency and good information flow matter because small details can quickly become bigger operational problems.": "对我来说，房源管理就是把短租运营中的各个环节组织好，包括预订、入住前要求、客人问题、清洁和维护协调、未解决事项、跟进、文档和交接。在多房源环境里，一致性和良好的信息流非常重要，因为小细节很快就可能变成更大的运营问题。",
    "Automation and AI are interests and practical tools I’m learning to use alongside my STR operations experience. I experiment with n8n, APIs, webhooks, AI-assisted workflows, and custom tools when they can reduce repetitive work or improve a process. I’m self-taught and still learning, so I don’t present myself as an automation or AI expert. I’m interested in understanding what technology can realistically improve and building things to learn by doing.": "自动化和 AI 是我正在学习的兴趣领域和实用工具，我会把它们与 STR 运营经验结合起来。当它们可以减少重复工作或改善流程时，我会尝试 n8n、API、webhook、AI 辅助工作流和自定义工具。我是自学的，也仍在持续学习，所以不会把自己称为自动化或 AI 专家。我更关注技术实际能改善什么，并通过构建项目来学习。",
    "My foundation is STR operations. I understand guest communications, property management workflows, follow-ups, escalations, coordination, SOPs, and the realities of keeping day-to-day operations moving. My technical interest gives me another way to look at problems. If something is unnecessarily manual, scattered, or repetitive, I naturally start thinking about whether the process, documentation, or technology could be improved.": "我的基础是 STR 运营。我理解客人沟通、房源管理流程、跟进、升级处理、协调、SOP，以及让日常运营持续运转的现实工作。技术兴趣让我可以从另一个角度看问题。如果某件事过于依赖人工、信息分散或重复，我会自然地思考流程、文档或技术是否可以改进。",
    "Outside of my STR work, I’m teaching myself practical technology through personal projects. I’ve been exploring web development, n8n automation, AI-assisted development, Linux, Docker, self-hosting, networking, Raspberry Pi, ESP32, Arduino, and cybersecurity-related projects. I’m not claiming to be an expert in these areas yet. I’m building, experimenting, troubleshooting, and learning because I genuinely enjoy figuring out how things work.": "除了 STR 工作之外，我还通过个人项目自学实用技术。我正在探索网页开发、n8n 自动化、AI 辅助开发、Linux、Docker、自托管、网络、Raspberry Pi、ESP32、Arduino 和网络安全相关项目。我目前还不会把自己称为这些领域的专家。我在构建、实验、排错和学习，因为我真的喜欢弄清楚事物是如何工作的。",
    "Keep the workflow moving": "让工作流继续运转",
    "Find friction and gaps": "找到阻力和缺口",
    "Create tools and systems": "创建工具和系统",
    "Test and make it better": "测试并改进",
    "I’m Von Untalan, a Filipino remote professional with a background in BPO, customer service, short-term rental operations, automation, and technology.": "我是 Von Untalan，一名菲律宾远程专业人士，拥有 BPO、客户服务、短租运营、自动化和技术方面的经验。",
    "I started in BPO in 2015 and later moved into remote STR work, where I found I enjoyed more than just communicating with guests. I liked understanding how the operation worked, where processes were repetitive, and where information could get lost.": "我于 2015 年开始从事 BPO 工作，后来进入远程 STR 工作。我发现自己喜欢的不只是与客人沟通，还喜欢了解运营是如何运作的、哪些流程重复，以及信息可能在哪里丢失。",
    "How information moves. Where workflows break down. Why teams keep solving the same problem.": "信息如何流动。工作流程在哪里出问题。为什么团队总是在解决同一个问题。",
    "That curiosity eventually led me to teach myself automation, AI, web development, and other technical skills through personal projects. These are interests I’m actively building, not areas where I claim to be an expert.": "这种好奇心让我通过个人项目自学自动化、AI、网页开发和其他技术技能。这些都是我正在持续学习的方向，并不是我声称自己已经是专家的领域。",
    "© 2026 Von Untalan · STR Operations & Guest Services Specialist": "© 2026 Von Untalan · STR 运营与客户服务专员",
    "STR OpsDesk": "STR OpsDesk",
    "Chrome Extension · Internal Tool": "Chrome 扩展 · 内部工具",
    "A custom Chrome extension built for real STR shift work — issue tracking, message snippets, property notes, handover generation, and shift management. Built because no existing tool fit the actual workflow.": "为真实 STR 轮班工作打造的 Chrome 扩展——问题跟踪、消息片段、房源备注、交接生成和班次管理。因为没有现成工具真正适合实际工作流程，所以我自己做了它。",
    "Invoice Generator": "发票生成器",
    "Web Application · Freelancer Tool": "网页应用 · 自由职业者工具",
    "A fully featured invoice generator built for freelancers and VAs — 3 templates, custom accent colors, line items with quantity/rate/tax, discount and surcharge logic, payment info (GCash, PayPal, bank), PDF export, and local save/load. No backend, no account needed.": "为自由职业者和 VA 打造的完整发票生成器——3 种模板、自定义强调色、数量/费率/税费明细、折扣与附加费逻辑、支付信息（GCash、PayPal、银行）、PDF 导出以及本地保存/加载。无需后端，也无需账户。",
    "Personal Budget Tracker": "个人预算追踪器",
    "Web Application": "网页应用",
    "A custom budgeting and expense-tracking app with calculations, expense categories, and a visual interface designed for practical everyday use.": "自定义预算与支出跟踪应用，包含计算功能、支出分类和适合日常使用的可视化界面。",
    "Home Server": "家庭服务器",
    "Infrastructure": "基础设施",
    "An old laptop converted into a personal Ubuntu Server and CasaOS environment running multiple self-hosted services and serving as a personal infrastructure lab.": "将旧笔记本改造成个人 Ubuntu Server 和 CasaOS 环境，运行多个自托管服务，并作为个人基础设施实验室。",
    "n8n Automations": "n8n 自动化",
    "Automation · AI": "自动化 · AI",
    "Workflow automations connecting tools, APIs, webhooks, and AI-assisted steps to eliminate repetitive manual work across different systems.": "连接工具、API、webhook 和 AI 辅助步骤的工作流自动化，用于减少不同系统之间重复的人工工作。",
    "Custom Web Projects": "定制网页项目",
    "Web Development": "网页开发",
    "Custom websites, dashboards, landing pages, and utility applications built through hands-on and AI-assisted development.": "通过实践和 AI 辅助开发构建的网站、仪表盘、落地页和实用应用。",
    "AI-Assisted Development": "AI 辅助开发",
    "AI · Development": "AI · 开发",
    "Using AI as a practical development tool to prototype, build, troubleshoot, and turn operational ideas into working projects.": "把 AI 作为实用开发工具，用于原型设计、构建、排错，并把运营想法变成可运行的项目。",
    "Raspberry Pi · Embedded Tech": "Raspberry Pi · 嵌入式技术",
    "Technical Experimentation": "技术实验",
    "Ongoing exploration of Raspberry Pi, Arduino, ESP32, networking, automation, and cybersecurity-related projects.": "持续探索 Raspberry Pi、Arduino、ESP32、网络、自动化和网络安全相关项目。",
    "My Portfolio": "我的作品集",
    "Web Development · Personal Project": "网页开发 · 个人项目",
    "This portfolio itself is one of my personal builds, combining my STR operations background with web development, AI-assisted development, responsive UI, and practical experimentation.": "这个作品集本身就是我的个人项目之一，把我的 STR 运营背景与网页开发、AI 辅助开发、响应式 UI 和实践实验结合起来。",
    "Chrome Extension": "Chrome 扩展",
    "STR Operations": "STR 运营",
    "Local-first": "本地优先",
    "React / Next.js": "React / Next.js",
    "AI Workflows": "AI 工作流",
    "Prompt Engineering": "提示词工程",
    "Design & Productivity": "设计与效率",
    "Web & Development": "网页与开发",
    "Communication": "沟通",
    "Automation & AI": "自动化与 AI"
  }
};

/* ── REVEAL COMPONENT ── */
function Reveal({ children, delay = 0, from = "bottom" }: {
  children: React.ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const transforms = { bottom: "translateY(32px)", left: "translateX(-24px)", right: "translateX(24px)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[from],
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ── LISTING CARD (reusable Airbnb-style card) ── */
function ListingCard({ eyebrow, title, body, footer, accent = false }: {
  eyebrow?: string;
  title: string;
  body: string;
  footer?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div style={{
      background: "var(--surface)",
      border: `1px solid ${accent ? "#FF5A5F55" : "var(--border)"}`,
      borderRadius: 16,
      padding: "1.6rem",
      boxShadow: accent
        ? "0 2px 24px rgba(255,90,95,0.08)"
        : "0 2px 16px rgba(0,0,0,0.04)",
      transition: "box-shadow 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = accent ? "0 2px 24px rgba(255,90,95,0.08)" : "0 2px 16px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
    >
      {eyebrow && <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "0.5rem" }}>{eyebrow}</p>}
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>{title}</h3>
      <p style={{ fontSize: "0.83rem", lineHeight: 1.7, color: "var(--muted)" }}>{body}</p>
      {footer && <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-soft)" }}>{footer}</div>}
    </div>
  );
}

/* ── PLATFORM LOGO CHIPS ── */
const AirbnbChip = () => (
  <div className="platform-chip platform-chip--airbnb">
    <span className="platform-icon">
    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FF5A5F" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.94 16.667c-.093.318-.27.6-.516.818-.246.218-.549.363-.875.418-.328.055-.663.018-.972-.107-.31-.125-.579-.332-.776-.597-.62-.834-.93-1.847-1.128-2.875-.07-.362-.126-.728-.168-1.095a20.122 20.122 0 0 1-.168 1.095c-.198 1.028-.508 2.04-1.128 2.875-.197.265-.466.472-.776.597-.31.125-.644.162-.972.107a1.907 1.907 0 0 1-.875-.418 1.903 1.903 0 0 1-.516-.818c-.356-1.173-.094-2.439.496-3.5.444-.797 1.066-1.468 1.734-2.082a21.92 21.92 0 0 1 1.374-1.114 20.735 20.735 0 0 1-.86-1.576C9.915 7.4 9.6 6.248 9.904 5.13c.092-.338.266-.649.507-.903.24-.254.54-.444.872-.554a2.21 2.21 0 0 1 1.434 0c.332.11.632.3.872.554.241.254.415.565.507.903.304 1.118-.01 2.27-.486 3.265a20.732 20.732 0 0 1-.86 1.576c.48.356.936.73 1.374 1.114.668.614 1.29 1.285 1.734 2.082.59 1.061.852 2.327.496 3.5zm-3.94-9.292a4.56 4.56 0 0 0 .46-1.04c.142-.522.124-1.036-.097-1.423a.677.677 0 0 0-.363-.3.677.677 0 0 0-.363.3c-.22.387-.239.9-.097 1.423.11.403.268.735.46 1.04zm0 2.5c-.327.265-.64.543-.935.835-.63.621-1.167 1.3-1.494 2.03-.354.8-.44 1.651-.166 2.37.068.18.174.342.31.474.137.133.3.234.48.295a.978.978 0 0 0 .56.028c.184-.051.352-.152.49-.29.527-.527.78-1.313.943-2.116.118-.576.19-1.162.234-1.75a15.59 15.59 0 0 0-.422-1.876zm1.87 3.044c.163.803.416 1.589.943 2.116.138.138.306.239.49.29a.978.978 0 0 0 .56-.028c.18-.061.343-.162.48-.295.136-.132.242-.295.31-.474.274-.719.188-1.57-.166-2.37-.327-.73-.864-1.409-1.494-2.03a15.47 15.47 0 0 0-.935-.835 15.589 15.589 0 0 0-.422 1.876c.044.588.116 1.174.234 1.75z"/>
    </svg>
    </span>
    <span style={{ fontWeight: 700, fontSize: "0.78rem", color: "#FF5A5F" }}>Airbnb</span>
  </div>
);

const VrboChip = () => (
  <div className="platform-chip platform-chip--vrbo">
    <span className="platform-icon">
    <svg viewBox="0 0 48 16" width="40" height="13" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="13" fontSize="14" fontWeight="900" fill="#1B5E9B" fontFamily="Arial Black, sans-serif" letterSpacing="-0.5">vrbo</text>
    </svg>
    </span>
  </div>
);

const BookingChip = () => (
  <div className="platform-chip platform-chip--booking">
    <span className="platform-icon">
    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
      <path fill="#003580" d="M21.6 0H2.4A2.4 2.4 0 0 0 0 2.4v19.2A2.4 2.4 0 0 0 2.4 24h19.2a2.4 2.4 0 0 0 2.4-2.4V2.4A2.4 2.4 0 0 0 21.6 0zM9 17H6V7h3v10zm5 0h-3V7h3v10zm5 0h-3V7h3v10z"/>
    </svg>
    </span>
    <span style={{ fontWeight: 700, fontSize: "0.78rem", color: "#003580" }}>Booking.com</span>
  </div>
);

const PlatformBadge = ({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) => {
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div
      className={`platform-chip platform-chip--${slug}`}
      style={{ background: bg, border: `1px solid ${border}`, color }}
    >
      <span className="platform-icon">
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "block" }} />
      </span>
      <span style={{ fontWeight: 600, fontSize: "0.74rem", color }}>{label}</span>
    </div>
  );
};

const ToolBadge = ({ label }: { label: string }) => (
  <span style={{ display: "inline-block", background: "#f7f4f0", border: "1px solid #e8e3dc", borderRadius: 8, padding: "0.35rem 0.7rem", fontSize: "0.72rem", fontWeight: 500, color: "#484848" }}>{label}</span>
);

/* ── INSTAGRAM ICON ── */
const IgIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="50%" stopColor="#dc2743"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs>
    <path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

/* ── ARROW ICONS ── */
/* ── STAR RATING ── */
const Stars = ({ n = 5 }: { n?: number }) => (
  <span aria-label={`${n} out of 5 stars`} style={{ color: "#FF5A5F", fontSize: "0.75rem", letterSpacing: 1 }}>
    {"★".repeat(n)}{"☆".repeat(5 - n)}
  </span>
);

/* ── CONTACT CHARACTERS ── */
type CharState = "idle" | "wave" | "thinking";

function ContactCharacter({ state }: { state: CharState }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (state === "wave") return;
    const blinkOnce = () => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
    };
    const id = window.setInterval(blinkOnce, 3200 + Math.random() * 1200);
    return () => window.clearInterval(id);
  }, [state]);

  return (
    <div className="contact-character" aria-hidden="true">
      <style>{`
        @keyframes vonBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes vonWave { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-18deg); } }
        @keyframes vonShadow { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(.86); } }
        .von-body { animation: vonBob 2.8s ease-in-out infinite; transform-origin: center bottom; }
        .von-wave-arm { animation: vonWave .75s ease-in-out infinite; transform-origin: 72px 87px; }
        .von-shadow { animation: vonShadow 2.8s ease-in-out infinite; }
        .von-eye { transition: transform .12s ease; transform-origin: center; }

        /* ── ACCESSIBILITY + THREE THEMES ── */
        .portfolio-shell {
          --page-bg: #0f1723;
          --surface: #131d2a;
          --surface-2: #192536;
          --text: #f6f8fb;
          --muted: #aab5c3;
          --muted-strong: #d5dbe3;
          --border: #2a3748;
          --border-soft: #233143;
          --divider: #253346;
          --accent: #ff5a5f;
          --hero-bg: #0f1723;
          --hero-panel: rgba(255,255,255,.045);
          --hero-panel-border: rgba(255,255,255,.10);
          --footer-bg: #0a1019;
          --focus: #ffb3b6;
          min-height: 100vh;
          background: var(--page-bg);
          color: var(--text);
          color-scheme: dark;
        }
        .portfolio-shell[data-theme="light"] {
          --page-bg: #fafaf8; --surface: #ffffff; --surface-2: #f7f4f0;
          --text: #222222; --muted: #717171; --muted-strong: #484848;
          --border: #e2ddd4; --border-soft: #eee9e2; --divider: #e7e1d8;
          --accent: #ff5a5f; --hero-bg: #f7f4f0;
          --hero-panel: rgba(255,255,255,.78); --hero-panel-border: #e3ddd4;
          --footer-bg: #171717; --focus: #b92d33; color-scheme: light;
        }
        .portfolio-shell[data-theme="paper"] {
          --page-bg: #f1ede2; --surface: #f7f2e5; --surface-2: #ebe3d3;
          --text: #27231c; --muted: #625c51; --muted-strong: #464137;
          --border: #d5c8b3; --border-soft: #e3d9c8; --divider: #d7cbb8;
          --accent: #a23b2d; --hero-bg: #ece5d5;
          --hero-panel: rgba(255,255,255,.48); --hero-panel-border: #d7ccb9;
          --footer-bg: #26221c; --focus: #7a2b22; color-scheme: light;
        }
        .portfolio-shell .sec-bg-white,
        .portfolio-shell .sec-bg-warm,
        .portfolio-shell .sec-bg-cream { background: var(--surface); }
        .portfolio-shell .sec-bg-dark { background: var(--hero-bg); }
        .portfolio-shell .sec-divider { background: var(--divider); }
        .portfolio-shell .sec-h2 { color: var(--text); }
        .portfolio-shell .sec-sub { color: var(--muted); }
        .portfolio-shell .about-p { color: var(--muted-strong); }
        .portfolio-shell .about-p strong { color: var(--text); }
        .portfolio-shell .review-card,
        .portfolio-shell .ops-card,
        .portfolio-shell .project-card,
        .portfolio-shell .technical-card,
        .portfolio-shell .stat-cell { background: var(--surface); border-color: var(--border); }
        .portfolio-shell .review-text,
        .portfolio-shell .project-desc,
        .portfolio-shell .technical-desc,
        .portfolio-shell .ops-p,
        .portfolio-shell .tl-copy { color: var(--muted); }
        .portfolio-shell .project-title,
        .portfolio-shell .technical-title,
        .portfolio-shell .ops-h3,
        .portfolio-shell .tl-title,
        .portfolio-shell .review-author { color: var(--text); }
        .portfolio-shell .project-tag,
        .portfolio-shell .technical-tag { background: var(--surface-2); border-color: var(--border); color: var(--muted-strong); }
        .portfolio-shell .timeline { border-color: var(--divider); }
        .portfolio-shell .tl-dot { border-color: var(--surface); }
        .portfolio-shell .nav.scrolled { background: color-mix(in srgb, var(--page-bg) 90%, transparent); box-shadow: 0 1px 0 var(--border); }
        .portfolio-shell .nav-logo { color: var(--text); }
        .portfolio-shell .nav-links a { color: var(--muted-strong); position: relative; }
        .portfolio-shell .nav-links a.active { color: var(--accent); }
        .portfolio-shell .nav-links a.active::after { content:""; position:absolute; left:0; right:0; bottom:-10px; height:2px; background:var(--accent); border-radius:99px; }
        .portfolio-shell .menu-btn { color: var(--text); }
        .nav-tools { display:flex; align-items:center; gap:.7rem; }
        .nav-tools { display:flex; align-items:center; gap:.55rem; }
        .language-switcher { display:inline-flex; align-items:center; gap:.45rem; min-height:38px; padding:0 .72rem; border:1px solid var(--border); background:var(--surface); border-radius:999px; }
        .language-switcher-label { font-size:.58rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); }
        .language-switcher select { appearance:none; -webkit-appearance:none; border:0; outline:0; background:transparent; color:var(--text); font:inherit; font-size:.72rem; font-weight:700; cursor:pointer; padding:.15rem 1rem .15rem .05rem; background-image:linear-gradient(45deg, transparent 50%, currentColor 50%),linear-gradient(135deg, currentColor 50%, transparent 50%); background-position:calc(100% - 7px) 52%,calc(100% - 3px) 52%; background-size:4px 4px,4px 4px; background-repeat:no-repeat; }
        .language-switcher select:focus-visible { outline:2px solid var(--focus); outline-offset:3px; border-radius:6px; }
        .language-switcher option { color:#111; background:#fff; }
        .theme-switcher { display:inline-flex; align-items:center; gap:2px; padding:3px; border:1px solid var(--border); background:var(--surface); border-radius:999px; }
        .theme-switcher button { min-height:30px; padding:0 .55rem; border-radius:999px; color:var(--muted); display:inline-flex; align-items:center; gap:.3rem; font-size:.68rem; font-weight:600; }
        .theme-switcher button.active { background:var(--accent); color:#fff; }
        .mobile-controls { display:flex; gap:.6rem; align-items:center; margin-top:1rem; flex-wrap:wrap; }
        .mobile-language-switcher { display:inline-flex; align-items:center; gap:.4rem; min-height:40px; padding:0 .72rem; border:1px solid var(--border); background:var(--surface); color:var(--text); border-radius:999px; }
        .mobile-language-switcher label { font-size:.63rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); }
        .mobile-language-switcher select { appearance:none; -webkit-appearance:none; border:0; outline:0; background:transparent; color:var(--text); font-size:.78rem; font-weight:700; cursor:pointer; padding:.2rem 1rem .2rem .05rem; background-image:linear-gradient(45deg, transparent 50%, currentColor 50%),linear-gradient(135deg, currentColor 50%, transparent 50%); background-position:calc(100% - 7px) 52%,calc(100% - 3px) 52%; background-size:4px 4px,4px 4px; background-repeat:no-repeat; }
        .mobile-language-switcher select:focus-visible { outline:2px solid var(--focus); outline-offset:3px; border-radius:6px; }
        .mobile-language-switcher option { color:#111; background:#fff; }
        .mobile-theme-switcher { display:flex; gap:.45rem; margin-top:0; }
        .mobile-theme-switcher button { border:1px solid var(--border); background:var(--surface); color:var(--muted-strong); border-radius:999px; padding:.5rem .8rem; font-size:.78rem; }
        .mobile-theme-switcher button.active { background:var(--accent); border-color:var(--accent); color:#fff; }
        .skip-link { position:fixed; top:8px; left:8px; z-index:1000; transform:translateY(-160%); background:var(--accent); color:#fff; padding:.65rem .9rem; border-radius:8px; font-weight:700; transition:transform .2s ease; }
        .skip-link:focus { transform:translateY(0); }
        .portfolio-shell :focus-visible { outline:2px solid var(--focus); outline-offset:3px; }
        .portfolio-shell[data-theme="light"] .hero,
        .portfolio-shell[data-theme="paper"] .hero { color:var(--text); }
        .portfolio-shell[data-theme="light"] .hero::before,
        .portfolio-shell[data-theme="paper"] .hero::before { opacity:.42; }
        .portfolio-shell[data-theme="light"] .hero-grid-bg,
        .portfolio-shell[data-theme="paper"] .hero-grid-bg { opacity:.045; }
        .portfolio-shell[data-theme="light"] .hero-h1,
        .portfolio-shell[data-theme="paper"] .hero-h1 { color:var(--text); }
        .portfolio-shell[data-theme="light"] .hero-p,
        .portfolio-shell[data-theme="paper"] .hero-p { color:var(--muted-strong); }
        .portfolio-shell[data-theme="light"] .hero-p strong,
        .portfolio-shell[data-theme="paper"] .hero-p strong { color:var(--text); }
        .portfolio-shell[data-theme="light"] .hero-answer,
        .portfolio-shell[data-theme="paper"] .hero-answer,
        .portfolio-shell[data-theme="light"] .hero-system,
        .portfolio-shell[data-theme="paper"] .hero-system { background:var(--hero-panel); border-color:var(--hero-panel-border); }
        .portfolio-shell[data-theme="light"] .hero-system span,
        .portfolio-shell[data-theme="paper"] .hero-system span { color:var(--muted); }
        .portfolio-shell[data-theme="light"] .hero-meta span,
        .portfolio-shell[data-theme="paper"] .hero-meta span { color:var(--muted); border-color:var(--border); background:var(--hero-panel); }
        .portfolio-shell[data-theme="light"] .btn-ghost-white,
        .portfolio-shell[data-theme="paper"] .btn-ghost-white { color:var(--muted-strong); border-color:var(--border); background:var(--hero-panel); }
        .portfolio-shell[data-theme="paper"] .hero-question { background:linear-gradient(100deg,#a23b2d,#8e3428); }
        .portfolio-shell[data-theme="paper"] .project-open-btn,
        .portfolio-shell[data-theme="paper"] .form-btn-coral,
        .portfolio-shell[data-theme="paper"] .nav-cta { background:var(--accent) !important; }
        .portfolio-shell[data-theme="paper"] .project-cat,
        .portfolio-shell[data-theme="paper"] .technical-cat,
        .portfolio-shell[data-theme="paper"] .stat-num,
        .portfolio-shell[data-theme="paper"] .tl-year { color:var(--accent); }
        .portfolio-shell[data-theme="paper"] .technical-card:hover .technical-img { transform:none; }
        .portfolio-shell[data-theme="paper"] .project-card,
        .portfolio-shell[data-theme="paper"] .technical-card,
        .portfolio-shell[data-theme="paper"] .review-card,
        .portfolio-shell[data-theme="paper"] .ops-card { box-shadow:0 1px 0 var(--border); }
        .portfolio-shell .footer { background:var(--footer-bg); }

        /* ── THEME CONTRAST FIXES ── */
        .portfolio-shell[data-theme="light"] .hero,
        .portfolio-shell[data-theme="paper"] .hero {
          background: var(--hero-bg);
          color: var(--text);
        }

        .portfolio-shell[data-theme="light"] .hero-kicker,
        .portfolio-shell[data-theme="paper"] .hero-kicker,
        .portfolio-shell[data-theme="light"] .sec-eyebrow,
        .portfolio-shell[data-theme="paper"] .sec-eyebrow {
          color: var(--accent);
        }

        .portfolio-shell[data-theme="light"] .hero-h1,
        .portfolio-shell[data-theme="paper"] .hero-h1,
        .portfolio-shell[data-theme="light"] .hero-ask-title,
        .portfolio-shell[data-theme="paper"] .hero-ask-title,
        .portfolio-shell[data-theme="light"] .sec-h2,
        .portfolio-shell[data-theme="paper"] .sec-h2 {
          color: var(--text) !important;
        }

        .portfolio-shell[data-theme="light"] .hero-p,
        .portfolio-shell[data-theme="paper"] .hero-p,
        .portfolio-shell[data-theme="light"] .hero-system span,
        .portfolio-shell[data-theme="paper"] .hero-system span,
        .portfolio-shell[data-theme="light"] .hero-answer,
        .portfolio-shell[data-theme="paper"] .hero-answer,
        .portfolio-shell[data-theme="light"] .sec-sub,
        .portfolio-shell[data-theme="paper"] .sec-sub {
          color: var(--muted-strong) !important;
        }

        .portfolio-shell[data-theme="light"] .hero-meta span,
        .portfolio-shell[data-theme="paper"] .hero-meta span {
          color: var(--muted-strong) !important;
          background: var(--hero-panel);
          border-color: var(--border);
        }

        .portfolio-shell[data-theme="light"] .hero-system,
        .portfolio-shell[data-theme="paper"] .hero-system,
        .portfolio-shell[data-theme="light"] .hero-answer,
        .portfolio-shell[data-theme="paper"] .hero-answer {
          background: var(--hero-panel);
          border-color: var(--hero-panel-border);
        }

        .portfolio-shell[data-theme="light"] .btn-ghost-white,
        .portfolio-shell[data-theme="paper"] .btn-ghost-white {
          color: var(--muted-strong) !important;
          background: var(--hero-panel);
          border-color: var(--border);
        }

        .portfolio-shell[data-theme="light"] .hero-question,
        .portfolio-shell[data-theme="paper"] .hero-question {
          color: #fff !important;
          background: linear-gradient(100deg, var(--accent), color-mix(in srgb, var(--accent) 82%, #000));
          box-shadow: 0 7px 18px rgba(0,0,0,.08);
        }

        .portfolio-shell[data-theme="light"] .hero-question:hover,
        .portfolio-shell[data-theme="light"] .hero-question.active,
        .portfolio-shell[data-theme="paper"] .hero-question:hover,
        .portfolio-shell[data-theme="paper"] .hero-question.active {
          filter: brightness(1.03);
        }

        /* Keep dark sections readable while still adapting them to the selected theme. */
        .portfolio-shell[data-theme="light"] .sec-bg-dark,
        .portfolio-shell[data-theme="paper"] .sec-bg-dark {
          background: var(--surface-2) !important;
          color: var(--text);
        }

        .portfolio-shell[data-theme="light"] .sec-h2-light,
        .portfolio-shell[data-theme="paper"] .sec-h2-light {
          color: var(--text) !important;
        }

        .portfolio-shell[data-theme="light"] .sec-sub-light,
        .portfolio-shell[data-theme="paper"] .sec-sub-light {
          color: var(--muted-strong) !important;
        }

        .portfolio-shell[data-theme="light"] .tools-lbl,
        .portfolio-shell[data-theme="paper"] .tools-lbl,
        .portfolio-shell[data-theme="light"] .contact-p,
        .portfolio-shell[data-theme="paper"] .contact-p,
        .portfolio-shell[data-theme="light"] .contact-link,
        .portfolio-shell[data-theme="paper"] .contact-link,
        .portfolio-shell[data-theme="light"] .contact-characters-label,
        .portfolio-shell[data-theme="paper"] .contact-characters-label,
        .portfolio-shell[data-theme="light"] .form-lbl-dark,
        .portfolio-shell[data-theme="paper"] .form-lbl-dark {
          color: var(--muted-strong) !important;
        }

        .portfolio-shell[data-theme="light"] .tool-chip-dark,
        .portfolio-shell[data-theme="paper"] .tool-chip-dark,
        .portfolio-shell[data-theme="light"] .social-pill-dark,
        .portfolio-shell[data-theme="paper"] .social-pill-dark {
          background: var(--surface);
          border-color: var(--border);
          color: var(--muted-strong) !important;
        }

        .portfolio-shell[data-theme="light"] .tool-chip-dark:hover,
        .portfolio-shell[data-theme="paper"] .tool-chip-dark:hover,
        .portfolio-shell[data-theme="light"] .social-pill-dark:hover,
        .portfolio-shell[data-theme="paper"] .social-pill-dark:hover {
          background: color-mix(in srgb, var(--accent) 9%, var(--surface));
          border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
          color: var(--text) !important;
        }

        .portfolio-shell[data-theme="light"] .contact-info-card,
        .portfolio-shell[data-theme="paper"] .contact-info-card {
          background: var(--surface);
          border-color: var(--border);
        }

        .portfolio-shell[data-theme="light"] .contact-h3,
        .portfolio-shell[data-theme="paper"] .contact-h3 {
          color: var(--text) !important;
        }

        .portfolio-shell[data-theme="light"] .form-field-dark,
        .portfolio-shell[data-theme="paper"] .form-field-dark {
          background: var(--surface);
          border-color: var(--border);
          color: var(--text) !important;
        }

        .portfolio-shell[data-theme="light"] .form-field-dark::placeholder,
        .portfolio-shell[data-theme="paper"] .form-field-dark::placeholder {
          color: var(--muted) !important;
        }

        .portfolio-shell[data-theme="light"] .footer,
        .portfolio-shell[data-theme="paper"] .footer {
          background: var(--footer-bg);
        }

        .portfolio-shell[data-theme="light"] .footer-copy,
        .portfolio-shell[data-theme="paper"] .footer-copy,
        .portfolio-shell[data-theme="light"] .footer-link,
        .portfolio-shell[data-theme="paper"] .footer-link {
          color: rgba(255,255,255,.72) !important;
        }

        /* Theme-aware project / operation accents */
        .portfolio-shell[data-theme="light"] .project-cat,
        .portfolio-shell[data-theme="paper"] .project-cat,
        .portfolio-shell[data-theme="light"] .technical-cat,
        .portfolio-shell[data-theme="paper"] .technical-cat,
        .portfolio-shell[data-theme="light"] .stat-num,
        .portfolio-shell[data-theme="paper"] .stat-num,
        .portfolio-shell[data-theme="light"] .tl-year,
        .portfolio-shell[data-theme="paper"] .tl-year {
          color: var(--accent) !important;
        }

        .portfolio-shell[data-theme="light"] .project-num,
        .portfolio-shell[data-theme="paper"] .project-num {
          color: var(--muted) !important;
        }

        @media (prefers-contrast: more) {
          .portfolio-shell[data-theme="light"],
          .portfolio-shell[data-theme="paper"] {
            --muted: #4b463e;
            --muted-strong: #29251f;
            --border: #9c9180;
            --border-soft: #b8ac99;
          }
        }

        @media (max-width: 900px) { .theme-switcher { display:none; } .nav-tools { gap:.35rem; } }
        @media (max-width: 800px) { .nav { height:60px; } .hero-layout { gap:2.25rem; } .hero-ask { margin-top:2.3rem; } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.001ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; transition-duration:.001ms !important; }
        }

      `}</style>
      <div className="von-shadow" style={{ width: 72, height: 9, background: "rgba(0,0,0,.28)", borderRadius: "50%", margin: "0 auto", filter: "blur(4px)" }} />
      <div className="von-body">
        <svg viewBox="0 0 100 160" width="150" height="240" xmlns="http://www.w3.org/2000/svg">
          <rect x="38" y="118" width="10" height="30" rx="5" fill="#1a2e2e" />
          <rect x="52" y="118" width="10" height="30" rx="5" fill="#1a2e2e" />
          <ellipse cx="43" cy="148" rx="9" ry="5" fill="#222" />
          <ellipse cx="57" cy="148" rx="9" ry="5" fill="#222" />
          <rect x="28" y="82" width="44" height="40" rx="14" fill="#2D6A6A" />
          <path d="M44 82 L50 90 L56 82" fill="none" stroke="#1a4040" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="14" y="84" width="16" height="9" rx="4.5" fill="#2D6A6A" />
          <ellipse cx="12" cy="88" rx="6" ry="6" fill="#f4c49e" />
          <g className={state === "wave" ? "von-wave-arm" : ""}>
            <rect x="70" y="84" width="16" height="9" rx="4.5" fill="#2D6A6A" />
            <ellipse cx="88" cy="88" rx="6" ry="6" fill="#f4c49e" />
            {state === "wave" && <><line x1="92" y1="86" x2="93" y2="82" stroke="#e8b08a" strokeWidth="1.5" strokeLinecap="round" /><line x1="94" y1="88" x2="96" y2="85" stroke="#e8b08a" strokeWidth="1.5" strokeLinecap="round" /></>}
          </g>
          <ellipse cx="50" cy="52" rx="26" ry="28" fill="#f4c49e" />
          <ellipse cx="24" cy="52" rx="4" ry="5" fill="#f4c49e" />
          <ellipse cx="76" cy="52" rx="4" ry="5" fill="#f4c49e" />
          <ellipse cx="50" cy="26" rx="24" ry="10" fill="#3d2314" />
          <ellipse cx="50" cy="30" rx="22" ry="12" fill="#3d2314" />
          <path d="M30 30 Q28 20 34 18 M70 30 Q72 20 66 18" stroke="#3d2314" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M34 53 Q38 50 44 52 M56 52 Q62 50 66 54" stroke="#3d2314" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <g className="von-eye" style={{ transform: `scaleY(${blink ? .08 : 1})` }}>
            <ellipse cx="38" cy="46" rx="2.4" ry="2.7" fill="#2a1a0e" />
            <ellipse cx="62" cy="46" rx="2.4" ry="2.7" fill="#2a1a0e" />
            <circle cx="38.8" cy="45.2" r=".9" fill="#fff" opacity=".8" />
            <circle cx="62.8" cy="45.2" r=".9" fill="#fff" opacity=".8" />
          </g>
          <ellipse cx="32" cy="60" rx="6" ry="4" fill="#ffb3ba" opacity=".45" />
          <ellipse cx="68" cy="60" rx="6" ry="4" fill="#ffb3ba" opacity=".45" />
          <ellipse cx="50" cy="58" rx="2.5" ry="1.8" fill="#e8a87c" opacity=".6" />
          <path d="M44 72 Q50 78 56 72" stroke="#3d2314" strokeWidth="2" fill="none" strokeLinecap="round" />
          {(state === "idle" || state === "thinking") && <><rect x="26" y="108" width="48" height="8" rx="3" fill="#e8e3dc" opacity=".9" /><rect x="30" y="98" width="40" height="12" rx="3" fill="#fff" opacity=".15" /><line x1="34" y1="102" x2="60" y2="102" stroke="#2D6A6A" strokeWidth="1" opacity=".6" /><line x1="34" y1="105" x2="54" y2="105" stroke="#2D6A6A" strokeWidth="1" opacity=".4" /></>}
          {state === "thinking" && <><circle cx="70" cy="31" r="3" fill="rgba(255,255,255,.15)" /><circle cx="77" cy="23" r="4" fill="rgba(255,255,255,.18)" /><circle cx="84" cy="15" r="6" fill="rgba(255,255,255,.2)" /><text x="84" y="18" fontSize="7" textAnchor="middle" fill="rgba(255,255,255,.75)">?</text></>}
        </svg>
      </div>
    </div>
  );
}

function SleepingCat() {
  const sleepingCatSvg = String.raw`<svg width="45.952225mm" height="35.678726mm" viewBox="0 0 45.952225 35.678726" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
        <defs id="defs1" />
        <g id="layer1" style="display:inline" transform="translate(-121.80376,-101.90461)">
          <path style="display:inline;fill:#000000;stroke:none;stroke-width:0.264583;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 144.95859,104.74193 c 6.01466,-2.1201 14.02915,-0.85215 17.62787,2.77812 3.59872,3.63027 2.91927,7.6226 -0.0661,11.80703 -2.98542,4.18443 -9.54667,3.58363 -15.1474,3.43959 -5.60073,-0.14404 -10.30411,-0.0586 -11.67474,-3.9026 7.85671,-2.22341 3.24576,-12.00205 9.26042,-14.12214 z" id="path1" />
          <path style="display:inline;fill:#000000;stroke:none;stroke-width:0.264583;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 156.30732,121.30486 c 0,0 -3.82398,2.52741 -4.14054,3.7997 -0.31656,1.2723 0.31438,2.18109 0.95701,2.55128 0.64264,0.3702 1.59106,-0.085 2.13559,-0.75306 0.54452,-0.6681 1.5629,-2.25488 2.47945,-3.20579 0.91654,-0.95091 2.96407,-2.74361 2.96407,-2.74361 l 0.73711,-3.60348 z" id="path2" />
          <path style="display:inline;fill:#000000;stroke:none;stroke-width:0.264583;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 136.93356,123.08347 c 0,0 -3.20149,3.2804 -3.24123,4.59088 -0.0397,1.31049 0.60411,1.83341 1.3106,2.05901 0.7065,0.22559 1.60304,-0.55255 1.99363,-1.32084 0.39056,-0.76832 1.14875,-2.30337 2.04139,-3.29463 0.89264,-0.99126 3.37363,-3.37561 3.37363,-3.37561 l -1.30007,-3.61169 z" id="path3" />
          <path style="display:inline;fill:#000000;stroke:none;stroke-width:0.264583;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 130.12859,121.60522 c -2.15849,1.92962 -3.38576,3.23532 -3.61836,4.5256 -0.23257,1.2903 0.0956,1.80324 0.76105,2.13059 0.66549,0.32733 1.66701,-0.31006 2.16665,-1.01233 0.49961,-0.70231 1.04598,-1.14963 2.83575,-3.05671 1.78977,-1.90708 5.91823,-3.27102 5.91823,-3.27102 l -0.75313,-3.99546 c 0,0 -5.15171,2.7497 -7.31019,4.67933 z" id="path4" />
          <path id="path5" style="display:inline;fill:#000000;stroke:none;stroke-width:0.292536;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:0.988235" d="m 147.59927,113.85404 c 0.68896,4.40837 -4.04042,7.93759 -10.51533,8.9455 -6.47491,1.00791 -12.24344,-0.88717 -12.9324,-5.29555 -0.68895,-4.40838 3.44199,-9.94186 9.9169,-10.94977 6.47491,-1.0079 12.84186,2.89144 13.53083,7.29982 z" />
          <path style="display:inline;fill:#000000;stroke:none;stroke-width:0.264583;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 126.36446,111.82609 c 0,0 -2.37067,-6.28072 -0.86724,-7.10855 1.50342,-0.82783 5.87139,3.72617 5.87139,3.72617 z" id="path6" />
          <path style="display:inline;fill:#000000;stroke:none;stroke-width:0.264583;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 143.50182,108.85407 c 0,0 -0.0544,-6.71302 -1.75519,-6.94283 -1.70081,-0.22982 -4.13211,5.59314 -4.13211,5.59314 z" id="path7" />
          <g id="g25" style="display:inline">
            <path style="fill:none;stroke:#000000;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 125.27102,116.06007 -2.97783,-1.05373" id="path8" />
            <path style="fill:none;stroke:#000000;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 124.91643,116.80991 -2.84808,0.0754" id="path9" />
            <path style="fill:none;stroke:#000000;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 124.97798,118.00308 -2.53111,0.5156" id="path10" />
          </g>
          <g id="g13" transform="rotate(-23.188815,49.755584,71.047761)" style="display:inline;fill:none;stroke:#000000">
            <path style="fill:none;stroke:#000000;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 121.77448,146.87682 3.00963,-0.95912" id="path11" />
            <path style="fill:none;stroke:#000000;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 122.10521,147.63749 2.84427,0.16537" id="path12" />
            <path style="fill:none;stroke:#000000;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 122.00599,148.82812 2.51354,0.59531" id="path13" />
          </g>
          <ellipse style="display:inline;fill:#ffffff;stroke:none;stroke-width:0.56967;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="path14" cx="142.61723" cy="108.6707" rx="3.0261719" ry="3.0757811" transform="rotate(1.8105864)" />
          <ellipse style="display:inline;fill:#000000;stroke:none;stroke-width:0.597086;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse15" cx="112.57543" cy="138.29808" rx="1.0380507" ry="1.3097118" transform="matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)" />
          <ellipse style="display:inline;fill:#f9f9f9;fill-opacity:1;stroke:none;stroke-width:0.184905;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse16" cx="112.70263" cy="137.817" rx="0.32146212" ry="0.40558979" transform="matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)" />
          <ellipse style="display:inline;fill:#ffffff;stroke:none;stroke-width:0.56967;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse17" cx="135.40735" cy="110.12592" rx="3.0261719" ry="3.0757811" transform="rotate(1.8105864)" />
          <ellipse style="display:inline;fill:#000000;stroke:none;stroke-width:0.597086;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse18" cx="105.22613" cy="138.07497" rx="1.0380507" ry="1.3097118" transform="matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)" />
          <ellipse style="display:inline;fill:#f9f9f9;fill-opacity:1;stroke:none;stroke-width:0.184905;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse19" cx="105.35332" cy="137.59389" rx="0.32146212" ry="0.40558979" transform="matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)" />
          <path style="display:inline;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 163.77708,109.27292 c 4.36563,2.71198 4.26447,17.63497 3.70417,21.03437 -0.5603,3.3994 -1.86906,4.06275 -4.53099,4.49791 -5.87463,0.96037 -8.39724,-5.87134 -5.7547,-5.72161 2.64254,0.14973 3.15958,3.46446 5.95314,2.05052 2.79356,-1.41394 -1.42214,-13.46068 -1.42214,-13.46068 z" id="tail" />
          <path style="display:inline;fill:#000000;stroke:none;stroke-width:0.264583;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 159.74981,121.34445 c 0,0 -2.98896,3.47517 -2.94624,4.78555 0.0427,1.31039 0.89775,2.01247 1.61702,2.1932 0.71928,0.18075 1.50745,-0.51603 1.84897,-1.30735 0.34149,-0.79135 0.88811,-2.59584 1.51032,-3.76081 0.62219,-1.16497 2.10268,-3.44845 2.10268,-3.44845 l -0.27441,-3.66785 z" id="path20" />
          <g id="lefteyelid" style="display:inline">
            <ellipse style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="path21" cx="131.94429" cy="114.29948" rx="3.1571214" ry="3.2155864" />
            <path style="fill:#000000;fill-opacity:1;stroke:#ffffff;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 129.32504,114.80228 c 2.54908,-1.14592 4.60706,-0.65481 4.60706,-0.65481" id="path22" />
          </g>
          <g id="righteyelid" style="display:inline">
            <ellipse style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse22" cx="139.07704" cy="113.0834" rx="3.1571214" ry="3.2155864" />
            <path style="fill:#000000;fill-opacity:1;stroke:#ffffff;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" d="m 136.48089,113.70683 c 2.48528,-1.2784 4.56624,-0.89621 4.56624,-0.89621" id="path23" />
          </g>
          <g id="eyesdown">
            <ellipse style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="path26" cx="139.12122" cy="113.61373" rx="1.8686198" ry="2.0422525" />
            <ellipse style="fill:#000000;stroke:none;stroke-width:0.597086;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse25" cx="112.24622" cy="139.77037" rx="1.0380507" ry="1.3097118" transform="matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)" />
            <ellipse style="fill:#f9f9f9;fill-opacity:1;stroke:none;stroke-width:0.184905;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse26" cx="112.37342" cy="139.28929" rx="0.32146212" ry="0.40558979" transform="matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)" />
            <ellipse style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse27" cx="131.994" cy="114.92011" rx="1.8686198" ry="2.0422525" />
            <ellipse style="fill:#000000;stroke:none;stroke-width:0.597086;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse28" cx="105.00267" cy="139.64998" rx="1.0380507" ry="1.3097118" transform="matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)" />
            <ellipse style="fill:#f9f9f9;fill-opacity:1;stroke:none;stroke-width:0.184905;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235" id="ellipse29" cx="105.12987" cy="139.1689" rx="0.32146212" ry="0.40558979" transform="matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)" />
          </g>
          <path
       id="longtail"
       style="display:inline;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.529167;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:0.988235"
       d="m 164.24062,110.09354 -2.10788,6.5381 c 0,0 0.84017,12.88397 0.35269,20.95169 h 4.78291 c 0.83489,-8.63528 0.13334,-24.78453 -3.02772,-27.48979 z" />
        </g>
      </svg>`;

  return (
    <div className="hero-cat-reference" aria-label="Sleeping cat">
      <div className="sleep-symbol" aria-hidden="true">
        <span>Z</span>
        <span>z</span>
        <span>z</span>
      </div>
      <div
        className="thecat"
        dangerouslySetInnerHTML={{ __html: sleepingCatSvg }}
      />
    </div>
  );
}

/* ── MAIN COMPONENT ── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [formFocused, setFormFocused] = useState(false);
  const [heroQuestion, setHeroQuestion] = useState("What do you actually do?");
  const [theme, setTheme] = useState<"dark" | "light" | "paper">("dark");
  const [language, setLanguage] = useState<"en" | "es" | "fr" | "fil" | "zh">("en");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    return () => {
      if (formResetTimerRef.current) clearTimeout(formResetTimerRef.current);
    };
  }, []);

  /* typing effect */
  useEffect(() => {
    const wordsByLanguage: Record<string, string[]> = {
      en: ["GUEST SERVICES", "STR OPERATIONS", "AUTOMATION", "AI SYSTEMS", "TECHNICAL PROJECTS"],
      es: ["ATENCIÓN A HUÉSPEDES", "OPERACIONES STR", "AUTOMATIZACIÓN", "SISTEMAS DE IA", "PROYECTOS TÉCNICOS"],
      fr: ["SERVICE CLIENT", "OPÉRATIONS STR", "AUTOMATISATION", "SYSTÈMES IA", "PROJETS TECHNIQUES"],
      fil: ["GUEST SERVICES", "STR OPERATIONS", "AUTOMATION", "AI SYSTEMS", "TECHNICAL PROJECTS"],
      zh: ["客户服务", "STR 运营", "自动化", "AI 系统", "技术项目"],
    };
    const words = wordsByLanguage[language] ?? wordsByLanguage.en;
    let wi = 0, ci = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[wi];
      if (!deleting) {
        ci++; setTyped(word.slice(0, ci));
        if (ci === word.length) { deleting = true; timer = setTimeout(tick, 1400); return; }
      } else {
        ci--; setTyped(word.slice(0, ci));
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      timer = setTimeout(tick, deleting ? 40 : 80);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [language]);

  /* scroll nav */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* theme persistence */
  useEffect(() => {
    const saved = window.localStorage.getItem("von-portfolio-theme") as "dark" | "light" | "paper" | null;
    if (saved === "dark" || saved === "light" || saved === "paper") {
      setTheme(saved);
      return;
    }
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
    if (prefersLight) setTheme("light");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("von-portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = window.localStorage.getItem("von-portfolio-language") as "en" | "es" | "fr" | "fil" | "zh" | null;
    if (saved === "en" || saved === "es" || saved === "fr" || saved === "fil" || saved === "zh") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("von-portfolio-language", language);
    document.documentElement.lang = language === "fil" ? "fil" : language;
  }, [language]);


  /* Translate the rendered UI immediately on language selection.
     English is kept as the stable source for every text node, so switching can
     happen repeatedly without requiring a page refresh. */
  const originalTextRef = useRef(new WeakMap<Text, string>());
  const originalAttrRef = useRef(new WeakMap<HTMLElement, { ariaLabel?: string | null; placeholder?: string | null; alt?: string | null; title?: string | null }>());

  const applyLanguageToDOM = (nextLanguage: "en" | "es" | "fr" | "fil" | "zh") => {
    if (typeof document === "undefined") return;
    const dictionary = { ...(LANGUAGE_DICTIONARIES[nextLanguage] ?? {}), ...(EXTRA_LANGUAGE_DICTIONARIES[nextLanguage] ?? {}) };
    const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Node | null;

    while ((node = walker.nextNode())) {
      const textNode = node as Text;
      const currentText = textNode.nodeValue ?? "";
      if (!originalTextRef.current.has(textNode)) {
        originalTextRef.current.set(textNode, currentText);
      }

      const sourceText = originalTextRef.current.get(textNode) ?? currentText;
      const key = normalize(sourceText);
      if (!key) continue;

      const translated = dictionary[key] ?? sourceText;
      const leading = sourceText.match(/^\s*/)?.[0] ?? "";
      const trailing = sourceText.match(/\s*$/)?.[0] ?? "";
      const nextText = `${leading}${translated}${trailing}`;

      if (textNode.nodeValue !== nextText) textNode.nodeValue = nextText;
    }

    document.querySelectorAll<HTMLElement>("[aria-label]").forEach((el) => {
      if (!originalAttrRef.current.has(el)) {
        originalAttrRef.current.set(el, { ariaLabel: el.getAttribute("aria-label"), placeholder: el.getAttribute("placeholder"), alt: el.getAttribute("alt"), title: el.getAttribute("title") });
      }
      const source = originalAttrRef.current.get(el)?.ariaLabel;
      if (source == null) return;
      const key = normalize(source);
      el.setAttribute("aria-label", dictionary[key] ?? source);
    });

    document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[placeholder]").forEach((el) => {
      if (!originalAttrRef.current.has(el)) {
        originalAttrRef.current.set(el, { ariaLabel: el.getAttribute("aria-label"), placeholder: el.getAttribute("placeholder"), alt: el.getAttribute("alt"), title: el.getAttribute("title") });
      }
      const source = originalAttrRef.current.get(el)?.placeholder;
      if (source == null) return;
      const key = normalize(source);
      el.setAttribute("placeholder", dictionary[key] ?? source);
    });

    document.querySelectorAll<HTMLElement>("[alt]").forEach((el) => {
      if (!originalAttrRef.current.has(el)) {
        originalAttrRef.current.set(el, { ariaLabel: el.getAttribute("aria-label"), placeholder: el.getAttribute("placeholder"), alt: el.getAttribute("alt"), title: el.getAttribute("title") });
      }
      const source = originalAttrRef.current.get(el)?.alt;
      if (source == null) return;
      const key = normalize(source);
      let translated = dictionary[key];
      if (!translated && key.startsWith("Project visual for ")) {
        const titleKey = key.replace("Project visual for ", "");
        const translatedTitle = dictionary[titleKey] ?? titleKey;
        translated = `${dictionary["PROJECT VISUAL"] ?? "Project visual"}: ${translatedTitle}`;
      }
      if (!translated && key.endsWith(" screenshot")) {
        const titleKey = key.replace(/ screenshot$/, "");
        const translatedTitle = dictionary[titleKey] ?? titleKey;
        translated = `${translatedTitle} ${nextLanguage === "zh" ? "截图" : nextLanguage === "fr" ? "capture d’écran" : nextLanguage === "es" ? "captura" : nextLanguage === "fil" ? "screenshot" : "screenshot"}`;
      }
      el.setAttribute("alt", translated ?? source);
    });

    document.querySelectorAll<HTMLElement>("[title]").forEach((el) => {
      if (!originalAttrRef.current.has(el)) {
        originalAttrRef.current.set(el, { ariaLabel: el.getAttribute("aria-label"), placeholder: el.getAttribute("placeholder"), alt: el.getAttribute("alt"), title: el.getAttribute("title") });
      }
      const source = originalAttrRef.current.get(el)?.title;
      if (source == null) return;
      const key = normalize(source);
      el.setAttribute("title", dictionary[key] ?? source);
    });

    document.documentElement.lang = nextLanguage;
  };

  useEffect(() => {
    const translate = () => applyLanguageToDOM(language);
    translate();

    const observer = new MutationObserver(() => {
      observer.disconnect();
      translate();
      observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    });

    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    const ids = ["home", "about", "experience", "portfolio", "skills", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.2, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const setPortfolioTheme = (nextTheme: "dark" | "light" | "paper") => setTheme(nextTheme);
  const setPortfolioLanguage = (nextLanguage: "en" | "es" | "fr" | "fil" | "zh") => setLanguage(nextLanguage);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formResetTimerRef.current) clearTimeout(formResetTimerRef.current);
    setFormStatus("loading");

    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Contact request failed");

      setFormStatus("success");
      form.reset();
      formResetTimerRef.current = setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch {
      setFormStatus("error");
      formResetTimerRef.current = setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }
  };

  return (
    <main className="portfolio-shell" data-theme={theme} id="top" suppressHydrationWarning>
      <a className="skip-link" href="#home">Skip to content</a>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--page-bg, #0f1723); color: var(--text, #f6f8fb); font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        button, input, textarea { font: inherit; }
        button { cursor: pointer; border: none; background: none; }
        a { color: inherit; text-decoration: none; }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 68px; display: flex; align-items: center;
          justify-content: space-between; padding: 0 2rem;
          transition: background .3s, box-shadow .3s;
        }
        .nav.scrolled {
          background: rgba(250,250,248,0.92);
          backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 rgba(0,0,0,0.08);
        }
        .nav-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem; color: #fff;
          transition: color .3s;
        }
        .nav.scrolled .nav-logo { color: #222; }
        .nav-links { display: flex; align-items: center; gap: 1.6rem; }
        .nav-links button {
          font-size: 0.78rem; font-weight: 500;
          color: rgba(255,255,255,0.8);
          transition: color .2s; letter-spacing: 0.01em;
        }
        .nav.scrolled .nav-links button { color: #484848; }
        .nav-links button:hover { color: #FF5A5F; }
        .nav-cta {
          background: #FF5A5F !important;
          color: #fff !important;
          padding: 0.45rem 1.1rem !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
          font-size: 0.78rem !important;
          transition: background .15s !important;
        }
        .nav-cta:hover { background: #e0484d !important; }
        .menu-btn { display: none; color: #fff; font-size: 1.4rem; line-height: 1; }
        .nav.scrolled .menu-btn { color: #222; }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          position: fixed; inset: 0; z-index: 200;
          background: var(--page-bg);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 2rem;
          transform: translateX(100%);
          transition: transform .3s ease;
        }
        .mobile-menu.open { transform: none; }
        .mobile-menu button, .mobile-menu a {
          font-size: 1.6rem; font-weight: 700;
          color: var(--text); letter-spacing: -0.02em;
        }
        .mobile-menu button:hover, .mobile-menu a:hover { color: var(--accent); }
        .mobile-close {
          position: absolute; top: 1.5rem; right: 1.5rem;
          font-size: 1.8rem; color: var(--muted);
        }

        /* ── HERO ── */
        .hero {
          position: relative; min-height: 100svh; overflow: hidden;
          background: #111827; color: #fff;
          display: flex; align-items: center;
        }
        .hero::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(circle at 78% 35%, rgba(255,90,95,0.13), transparent 30%),
            radial-gradient(circle at 18% 75%, rgba(72,187,214,0.08), transparent 28%);
        }
        .hero-grid-bg {
          position: absolute; inset: 0; opacity: 0.08; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, black, transparent 90%);
        }
        .hero-body {
          position: relative; z-index: 2; width: 100%; max-width: 1120px;
          margin: 0 auto; padding: 8rem 2.5rem 4rem;
          animation: heroIn 0.9s ease .1s both;
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .hero-layout {
          display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(360px, .9fr);
          gap: 5rem; align-items: center; min-height: 570px;
        }
        .hero-kicker {
          display: inline-flex; align-items: center; gap: .55rem;
          font-size: .68rem; font-weight: 700; letter-spacing: .14em;
          color: #FF5A5F; text-transform: uppercase; margin-bottom: 1.4rem;
        }
        .hero-kicker::before { content: ""; width: 20px; height: 2px; background: #FF5A5F; }
        .hero-h1 {
          font-family: 'DM Serif Display', serif; font-size: clamp(3.5rem, 7vw, 6.5rem);
          line-height: .95; color: #fff; margin-bottom: 1.5rem; letter-spacing: -.035em;
        }
        .hero-h1 em { color: #FF5A5F; font-style: normal; }
        .hero-p {
          font-size: clamp(1rem, 1.6vw, 1.15rem); line-height: 1.75;
          color: rgba(255,255,255,.68); max-width: 600px; margin-bottom: 1.8rem; font-weight: 300;
        }
        .hero-p strong { color: #fff; font-weight: 600; }
        .hero-actions { display: flex; gap: .7rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .btn-coral {
          display: inline-flex; align-items: center; background: #FF5A5F; color: #fff;
          font-size: .82rem; font-weight: 700; padding: .8rem 1.35rem; border-radius: 8px;
          transition: background .15s, transform .15s;
        }
        .btn-coral:hover { background: #e0484d; transform: translateY(-1px); }
        .btn-ghost-white {
          display: inline-flex; align-items: center; background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.18); color: rgba(255,255,255,.85);
          font-size: .82rem; font-weight: 500; padding: .8rem 1.35rem; border-radius: 8px;
          transition: border-color .15s, background .15s;
        }
        .btn-ghost-white:hover { border-color: rgba(255,255,255,.4); background: rgba(255,255,255,.08); }
        .hero-meta { display: flex; flex-wrap: wrap; gap: .5rem; }
        .hero-meta span {
          border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.045);
          color: rgba(255,255,255,.58); border-radius: 999px; padding: .38rem .72rem;
          font-size: .68rem; font-weight: 500;
        }
        .hero-ask { position: relative; }
        .hero-ask-title {
          font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; letter-spacing: -.03em;
          margin-bottom: 1.2rem;
        }
        .hero-question-list { display: grid; gap: .7rem; }
        .hero-question {
          width: 100%; text-align: left; color: #fff; font-size: .78rem; font-weight: 600;
          line-height: 1.45; padding: .9rem 1rem; border-radius: 13px;
          background: linear-gradient(100deg, rgba(255,90,95,.98), rgba(231,55,60,.95));
          box-shadow: 0 8px 24px rgba(0,0,0,.16); transition: transform .18s, filter .18s;
        }
        .hero-question:hover, .hero-question.active { transform: translateX(-5px); filter: brightness(1.06); }
        .hero-answer {
          margin-top: 1rem; padding: .9rem 1rem; border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.045); border-radius: 12px; color: rgba(255,255,255,.62);
          font-size: .76rem; line-height: 1.65; min-height: 76px;
        }
        .hero-system {
          margin-top: 2rem; display: flex; align-items: center; gap: .75rem;
          border: 1px solid rgba(255,255,255,.1); background: rgba(8,12,22,.58);
          border-radius: 14px; padding: .7rem .85rem; width: fit-content;
        }
        .hero-system-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 12px rgba(74,222,128,.65); }
        .hero-system span { font-size: .68rem; color: rgba(255,255,255,.55); letter-spacing: .04em; }
        .hero-corner {
          position: absolute; right: 2.5rem; bottom: 2rem; color: rgba(255,255,255,.25);
          font-size: .58rem; letter-spacing: .14em; text-transform: uppercase;
        }
        .hero-typed { display: none; }
        .hero-platforms { display: none; }



        /* ── FEATURED PROJECT CARDS · EQUAL HEIGHT ── */
        .project-grid {
          align-items: stretch;
        }
        .project-grid > * {
          display: flex;
          min-width: 0;
        }
        .project-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .project-card .project-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .project-card .project-desc {
          min-height: 0;
        }

        /* ── PLATFORM CHIPS · ROTATING ICON HOVER ── */
        .platform-chip {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 10px;
          padding: 0.5rem 0.9rem;
          transition: border-color .2s ease, background-color .2s ease, box-shadow .25s ease;
        }
        .platform-chip .platform-icon {
          position: relative;
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 22px;
          border-radius: 50%;
          transition: transform .3s ease, background-color .2s ease, box-shadow .3s ease;
          z-index: 1;
        }

        /* VRBO uses a wordmark rather than a compact square icon.
           Give it enough room so the full mark remains readable. */
        .platform-chip--vrbo .platform-icon {
          width: 42px;
          flex-basis: 42px;
          height: 22px;
          border-radius: 11px;
        }
        .platform-chip--vrbo .platform-icon svg {
          width: 40px;
          height: 14px;
          flex: 0 0 auto;
        }
        .platform-chip--vrbo .platform-icon::after {
          width: 22px;
          height: 22px;
          inset: 0 auto 0 10px;
        }
        .platform-chip .platform-icon::after {
          content: "";
          position: absolute;
          inset: -2px;
          border: 1px solid currentColor;
          border-radius: 50%;
          transform: scale(.72);
          opacity: 0;
          transition: transform .3s ease, opacity .2s ease, box-shadow .3s ease;
          pointer-events: none;
        }
        .platform-chip:hover .platform-icon {
          transform: rotate(90deg);
          background: rgba(255,255,255,.72);
          box-shadow: 0 2px 7px rgba(0,0,0,.08);
        }
        .platform-chip:hover .platform-icon::after {
          transform: scale(1);
          opacity: 1;
          box-shadow: 5px 0 10px rgba(0,0,0,.08);
        }
        .platform-chip > span:not(.platform-icon) {
          transition: transform .2s ease;
        }
        .platform-chip:hover > span:not(.platform-icon) {
          transform: translateX(1px);
        }
        .platform-chip:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,.06);
        }
        .platform-chip--airbnb { background: #fff1f1; border: 1px solid #ffd6d8; color: #FF5A5F; }
        .platform-chip--vrbo { background: #f0f4ff; border: 1px solid #c9d8f5; color: #1B5E9B; }
        .platform-chip--booking { background: #f0f4ff; border: 1px solid #c9d8f5; color: #003580; }
        .platform-chip--guesty,
        .platform-chip--hostaway { background: #f0f4fa; border: 1px solid #c9d5e8; }
        .platform-chip--breezeway { background: #f0faf9; border: 1px solid #b5e0de; }
        .platform-chip--enso { background: #f5f0ff; border: 1px solid #d4c4f5; }

        /* ── SECTIONS ── */
        .sec { padding: 5.5rem 2.5rem; }
        .sec-inner { max-width: 1060px; margin: 0 auto; }
        .sec-bg-warm { background: #FAFAF8; }
        .sec-bg-white { background: #fff; }
        .sec-bg-dark { background: #1a1a1a; }
        .sec-bg-cream { background: #f7f4f0; }
        .sec-divider { height: 1px; background: #ede8e0; }

        /* listing-style section header */
        .sec-eyebrow {
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.12em; color: #FF5A5F;
          text-transform: uppercase; margin-bottom: 0.7rem;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .sec-eyebrow::before {
          content: '';
          width: 20px; height: 2px;
          background: #FF5A5F; border-radius: 1px;
          display: inline-block;
        }
        .sec-h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.1; color: #222;
          margin-bottom: 0.75rem; letter-spacing: -0.02em;
        }
        .sec-h2-light { color: #fff; }
        .sec-sub {
          font-size: 0.88rem; line-height: 1.8;
          color: #717171; max-width: 560px; font-weight: 300;
        }
        .sec-sub-light { color: rgba(255,255,255,0.6); }


        /* ── HERO SLEEPING CAT · REFERENCE STYLE ── */
        .hero-cat-reference {
          position: absolute;
          right: 12px;
          top: -86px;
          width: 170px;
          height: 110px;
          z-index: 4;
          pointer-events: auto;
        }
        .hero-cat-reference .thecat {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 150px;
          height: 112px;
          z-index: 2;
          pointer-events: none;
        }
        .hero-cat-reference .thecat svg {
          width: 150px;
          height: 117px;
          overflow: visible;
          display: block;
        }
        .hero-cat-reference .sleep-symbol {
          position: absolute;
          right: 4px;
          top: -8px;
          z-index: 3;
          font-family: Arial, sans-serif;
          font-weight: 700;
          color: rgba(255,255,255,.62);
          line-height: 1;
          pointer-events: none;
        }
        .hero-cat-reference .sleep-symbol span {
          position: relative;
          display: inline-block;
          opacity: 1;
          transform: scale(1);
          animation: sleep 4s ease-in-out infinite;
        }
        .hero-cat-reference .sleep-symbol span:nth-child(1) { animation-delay: 0s; }
        .hero-cat-reference .sleep-symbol span:nth-child(2) { animation-delay: 1s; margin-left: -10px; }
        .hero-cat-reference .sleep-symbol span:nth-child(3) { animation-delay: 2s; margin-left: -10px; }

        /* Wake the cat when the user hovers an actual question. */
        .hero-cat-reference #lefteyelid,
        .hero-cat-reference #righteyelid { visibility: visible; }
        .hero-cat-reference #eyesdown { visibility: hidden; }
        .hero-cat-reference #tail { visibility: visible; }
        .hero-cat-reference #longtail { visibility: hidden; }

        .hero-ask:has(.hero-question:hover) .hero-cat-reference #lefteyelid,
        .hero-ask:has(.hero-question:hover) .hero-cat-reference #righteyelid,
        .hero-ask:has(.hero-question:hover) .hero-cat-reference .sleep-symbol {
          visibility: hidden;
        }
        .hero-ask:has(.hero-question:hover) .hero-cat-reference #eyesdown {
          visibility: visible;
        }
        .hero-ask:has(.hero-question:hover) .hero-cat-reference #tail {
          visibility: hidden;
        }
        .hero-ask:has(.hero-question:hover) .hero-cat-reference #longtail {
          visibility: visible;
        }

        /* Small one-time wake-up motion when a question is hovered.
           The cat does not continuously float or breathe. */
        .hero-ask:has(.hero-question:hover) .hero-cat-reference .thecat {
          animation: catWake .28s ease-out;
          transform-origin: 78% 88%;
        }

        @keyframes catWake {
          0% { transform: translateY(3px) rotate(0deg); }
          45% { transform: translateY(-5px) rotate(-1.2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }

        @keyframes sleep {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: .5;
            transform: translate(-5px, -35px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.5);
          }
        }

/* ── ABOUT ── */
        .about-grid {
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem; align-items: start; margin-top: 3rem;
        }
        .about-p { font-size: 0.86rem; line-height: 1.9; color: #484848; margin-bottom: 0.9rem; font-weight: 300; }
        .about-p strong { color: #222; font-weight: 600; }

        /* airbnb-style review card */
        .review-card {
          background: #fff; border: 1px solid #e8e3dc;
          border-radius: 16px; padding: 1.5rem;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
          margin-bottom: 1rem;
        }
        .review-text {
          font-size: 0.88rem; line-height: 1.7; color: #484848;
          font-style: italic; margin-bottom: 0.8rem; font-weight: 300;
        }
        .review-author { font-size: 0.72rem; font-weight: 600; color: #222; }
        .review-meta { font-size: 0.68rem; color: #717171; margin-top: 0.15rem; }

        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #ede8e0; border: 1px solid #ede8e0; border-radius: 14px; overflow: hidden; margin-top: 3rem; }
        .stat-cell { background: #fff; padding: 1.4rem 1rem; text-align: center; }
        .stat-num { font-family: 'DM Serif Display', serif; font-size: 2.2rem; color: #FF5A5F; line-height: 1; }
        .stat-lbl { font-size: 0.68rem; font-weight: 500; color: #717171; margin-top: 0.3rem; letter-spacing: 0.04em; }

        /* ── OPS CARDS ── */
        .ops-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem; margin-top: 2.5rem; }
        .ops-card {
          background: #fff; border: 1px solid #e8e3dc;
          border-radius: 14px; padding: 1.5rem;
          transition: box-shadow .2s, transform .2s;
        }
        .ops-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .ops-icon { font-size: 1.5rem; margin-bottom: 0.8rem; }
        .ops-h3 { font-size: 0.9rem; font-weight: 700; color: #222; margin-bottom: 0.4rem; }
        .ops-p { font-size: 0.78rem; line-height: 1.7; color: #717171; font-weight: 300; }

        /* ── TOOLS ── */
        .tools-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; }
        .tools-group { margin-bottom: 2rem; }
        .tools-lbl { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 0.8rem; }
        .tools-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tool-chip-dark {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px; padding: 0.42rem 0.75rem;
          font-size: 0.74rem; font-weight: 500; color: rgba(255,255,255,0.75);
          transition: background .15s;
        }
        .tool-chip-dark:hover { background: rgba(255,90,95,0.12); border-color: rgba(255,90,95,0.3); color: #fff; }

        /* ── PROJECTS ── */
        .portfolio-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 2rem; margin-bottom: 2.5rem; }
        .featured-project-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.2rem; }
        .featured-project-grid > * {
          display: flex;
          min-width: 0;
        }
        .project-card {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #fff; border: 1px solid #e8e3dc; border-radius: 16px; overflow: hidden;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05); transition: box-shadow .2s, transform .2s;
        }
        .project-card .project-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .project-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.09); transform: translateY(-2px); }
        .project-img-wrap {
          height: 260px; background: #f0ebe4; display: grid; place-items: center;
          border-bottom: 1px solid #e8e3dc; overflow: hidden; position: relative;
        }
        .project-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .project-placeholder {
          width: 100%; height: 100%; display: grid; place-items: center;
          background: repeating-linear-gradient(135deg, #f2ede6, #f2ede6 12px, #ede8e0 12px, #ede8e0 13px);
          color: #bbb4a8; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em;
        }
        .project-live-badge {
          position: absolute; top: 12px; right: 12px; background: #FF5A5F; color: #fff;
          font-size: 0.62rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 99px; letter-spacing: 0.06em;
        }
        .project-body { display: grid; grid-template-columns: 1fr; gap: 1.2rem; padding: 1.5rem; }
        .project-num { font-size: 0.65rem; font-weight: 600; color: #b0a898; letter-spacing: 0.06em; margin-bottom: 0.4rem; }
        .project-title { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #222; margin-bottom: 0.35rem; letter-spacing: -0.01em; }
        .project-cat { font-size: 0.68rem; font-weight: 600; color: #FF5A5F; letter-spacing: 0.06em; }
        .project-desc { font-size: 0.8rem; line-height: 1.75; color: #717171; font-weight: 300; }
        .project-tag-list { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1rem; }
        .project-tag { background: #f7f4f0; border: 1px solid #e8e3dc; border-radius: 6px; padding: 0.3rem 0.6rem; font-size: 0.68rem; font-weight: 500; color: #717171; }
        .project-open-btn {
          display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 1rem;
          background: #FF5A5F; color: #fff; font-size: 0.78rem; font-weight: 600;
          padding: 0.62rem 1.2rem; border-radius: 7px; text-decoration: none; transition: background .15s;
        }
        .project-open-btn:hover { background: #e0484d; }

        /* ── TECHNICAL PROJECTS ── */
        .technical-projects { margin-top: 4.5rem; padding-top: 3rem; border-top: 1px solid #e8e3dc; }
        .technical-head { margin-bottom: 1.6rem; }
        .technical-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .technical-card {
          background: #fff; border: 1px solid #e8e3dc; border-radius: 16px;
          overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.04);
          transition: box-shadow .2s, transform .2s;
        }
        .technical-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.09); transform: translateY(-2px); }
        .technical-img-wrap { height: 210px; background: #1a1a1a; overflow: hidden; position: relative; }
        .technical-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .technical-card:hover .technical-img { transform: scale(1.03); }
        .technical-img-wrap.no-image { display: grid; place-items: center; background: linear-gradient(135deg, #191919, #2a2224); }
        .technical-no-image { color: rgba(255,255,255,0.55); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; }
        .technical-visual-label {
          position: absolute; left: 12px; bottom: 12px;
          background: rgba(17,17,17,0.72); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.16); border-radius: 99px;
          padding: .28rem .58rem; color: rgba(255,255,255,0.8);
          font-size: .58rem; font-weight: 700; letter-spacing: .07em;
        }
        .technical-body { padding: 1.35rem 1.5rem 1.5rem; }
        .technical-title { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #222; margin-bottom: .3rem; }
        .technical-cat { font-size: .64rem; font-weight: 700; color: #FF5A5F; letter-spacing: .07em; margin-bottom: .7rem; }
        .technical-desc { font-size: .78rem; line-height: 1.75; color: #717171; font-weight: 300; }
        .technical-tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .9rem; }
        .technical-tag { background: #f7f4f0; border: 1px solid #e8e3dc; border-radius: 6px; padding: .28rem .55rem; font-size: .64rem; font-weight: 500; color: #717171; }

        /* ── EXPERIENCE TIMELINE ── */
        .timeline { border-left: 2px solid #ede8e0; margin-left: 0.4rem; margin-top: 2.5rem; }
        .tl-item { position: relative; padding: 0 0 2.5rem 2rem; }
        .tl-item:last-child { padding-bottom: 0; }
        .tl-dot { position: absolute; left: -6px; top: 0.25rem; width: 10px; height: 10px; border-radius: 50%; background: #FF5A5F; border: 2px solid #FAFAF8; box-shadow: 0 0 0 2px #FF5A5F; }
        .tl-year { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; color: #FF5A5F; margin-bottom: 0.35rem; }
        .tl-title { font-size: 1rem; font-weight: 700; color: #222; margin-bottom: 0.15rem; letter-spacing: -0.01em; }
        .tl-role { font-size: 0.65rem; font-weight: 600; color: #b0a898; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.6rem; }
        .tl-copy { font-size: 0.8rem; line-height: 1.8; color: #717171; font-weight: 300; max-width: 620px; }

        /* ── CONTACT ── */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .contact-info-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 2rem;
        }
        .contact-h3 { font-family: 'DM Serif Display', serif; font-size: 1.2rem; font-style: italic; color: #fff; margin-bottom: 0.8rem; }
        .contact-p { font-size: 0.8rem; line-height: 1.8; color: rgba(255,255,255,0.55); font-weight: 300; margin-bottom: 0.7rem; }
        .contact-characters { display: flex; align-items: flex-end; justify-content: center; min-height: 280px; position: relative; }
        .contact-character { width: 150px; position: relative; z-index: 2; }
        .sleeping-cat { width: 150px; margin-left: -34px; margin-bottom: 3px; position: relative; z-index: 3; }
        .contact-characters-label { margin-top: .8rem; color: rgba(255,255,255,.42); font-size: .62rem; letter-spacing: .12em; text-transform: uppercase; text-align: center; }

        .avail-row { display: flex; align-items: center; gap: 0.5rem; margin-top: 1.2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.68rem; color: #4ade80; font-weight: 500; }
        .avail-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; animation: pulse 2s ease-in-out infinite; }

        .social-link-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.8rem; }
        .social-pill-dark {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px; padding: 0.5rem 0.85rem;
          font-size: 0.74rem; font-weight: 500; color: rgba(255,255,255,0.75);
          transition: background .15s, border-color .15s;
        }
        .social-pill-dark:hover { background: rgba(255,90,95,0.15); border-color: rgba(255,90,95,0.3); color: #fff; }

        .form-field-dark {
          width: 100%; background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px; padding: 0.72rem 0.85rem;
          font-size: 0.82rem; color: #fff; outline: none;
          transition: border-color .15s;
          margin-bottom: 0.8rem;
        }
        .form-field-dark:focus { border-color: rgba(255,90,95,0.5); }
        .form-field-dark::placeholder { color: rgba(255,255,255,0.3); }
        .form-lbl-dark { display: block; font-size: 0.65rem; font-weight: 600; color: rgba(255,255,255,0.45); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.4rem; }
        .form-btn-coral { width: 100%; padding: 0.82rem; background: #FF5A5F; color: #fff; font-size: 0.82rem; font-weight: 600; border-radius: 8px; border: none; cursor: pointer; transition: background .15s; margin-top: 0.4rem; }
        .form-btn-coral:hover { background: #e0484d; }
        .form-btn-coral:disabled { opacity: 0.55; cursor: wait; }
        .form-msg { font-size: 0.76rem; text-align: center; margin-top: 0.6rem; }

        /* ── FOOTER ── */
        .footer { background: #111; padding: 1.4rem 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; }
        .footer-copy { font-size: 0.62rem; color: #444; font-family: 'DM Sans', sans-serif; }
        .footer-links { display: flex; gap: 1.2rem; }
        .footer-link { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.62rem; color: #555; transition: color .15s; }
        .footer-link:hover { color: #FF5A5F; }

        /* ── RESPONSIVE ── */
        @media (max-width: 800px) {
          .hero-body { padding: 7rem 1.25rem 3rem; }
          .hero-layout { grid-template-columns: 1fr; gap: 3rem; min-height: auto; }
          .hero-h1 { font-size: clamp(3.2rem, 16vw, 5rem); }
          .hero-ask { max-width: 560px; margin-top: 1.5rem; }
          .sleeping-cat-wrap { right: 0; top: -70px; width: 140px; }
          .hero-ask-bubble { right: 92px; top: -42px; max-width: 165px; }
          .hero-corner { display: none; }

          .about-grid, .contact-grid, .tools-layout { grid-template-columns: 1fr; gap: 2rem; }
          .contact-characters { min-height: 230px; }
          .contact-character { width: 135px; }
          .sleeping-cat { width: 135px; margin-left: -28px; }
          .ops-grid { grid-template-columns: 1fr; }
          .nav-links { display: none; }
          .menu-btn { display: block; }
          .portfolio-head { flex-direction: column; align-items: flex-start; }
          .featured-project-grid { grid-template-columns: 1fr 1fr; }
          .project-body { grid-template-columns: 1fr; gap: 1rem; }
          .project-img-wrap { height: 260px; }
          .stats-row { grid-template-columns: 1fr; }
          .technical-grid { grid-template-columns: 1fr; }
          .technical-img-wrap { height: 240px; }
        }
        @media (max-width: 520px) {
          .hero-body { padding: 6.5rem 1.1rem 3rem; }
          .sec { padding: 4rem 1.4rem; }
          .nav { padding: 0 1.2rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, .hero-photo { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <span className="nav-logo">Von Untalan</span>
        <nav className="nav-links" aria-label="Main navigation">
          {[
            ["about", "About"],
            ["experience", "Experience"],
            ["portfolio", "Projects"],
            ["skills", "Skills"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
              aria-current={activeSection === id ? "page" : undefined}
            >
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#contact">Contact</a>
        </nav>
        <div className="nav-tools">
          <div className="language-switcher" aria-label="Language selector">
            <span className="language-switcher-label">Language</span>
            <select
              value={language}
              onChange={(e) => { const next = e.target.value as "en" | "es" | "fr" | "fil" | "zh"; applyLanguageToDOM(next); setPortfolioLanguage(next); }}
              aria-label="Choose language"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="fil">FIL</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div className="theme-switcher" role="group" aria-label="Color theme">
            {[
              ["dark", "Dark"],
              ["light", "Light"],
              ["paper", "Paper"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={theme === value ? "active" : ""}
                aria-label={`Use ${label} theme`}
                aria-pressed={theme === value}
                onClick={() => setPortfolioTheme(value as "dark" | "light" | "paper")}
              >
                {value === "dark" ? "☾" : value === "light" ? "☀" : "◉"}
                <span>{label}</span>
              </button>
            ))}
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>☰</button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
        {[
          ["about", "About"],
          ["experience", "Experience"],
          ["portfolio", "Projects"],
          ["skills", "Skills"],
          ["contact", "Contact"],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <div className="mobile-controls">
          <div className="mobile-language-switcher">
            <label htmlFor="mobile-language">Language</label>
            <select
              id="mobile-language"
              value={language}
              onChange={(e) => { const next = e.target.value as "en" | "es" | "fr" | "fil" | "zh"; applyLanguageToDOM(next); setPortfolioLanguage(next); }}
              aria-label="Choose language"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="fil">FIL</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div className="mobile-theme-switcher" role="group" aria-label="Color theme">
            {[
              ["dark", "Dark"],
              ["light", "Light"],
              ["paper", "Paper"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={theme === value ? "active" : ""}
                aria-pressed={theme === value}
                onClick={() => setPortfolioTheme(value as "dark" | "light" | "paper")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section id="home" className="hero" aria-labelledby="hero-title">
        <div className="hero-grid-bg" />

        <div className="hero-body">
          <div className="hero-layout">
            <div>
              <p className="hero-kicker">STR OPERATIONS + TECH + AUTOMATION</p>

              <h1 id="hero-title" className="hero-h1">
                Hi, I'm <em>Von.</em>
              </h1>

              <p className="hero-p">
                I’m an STR operations specialist focused on <strong>guest communications, property management, and operational workflows</strong>, with a technical edge in automation, AI, and practical web projects. I don’t just operate software. I look for ways to make the operation work better.
              </p>

              <div className="hero-actions">
                <button className="btn-coral" onClick={() => scrollTo("portfolio")}>See my work</button>
                <button className="btn-ghost-white" onClick={() => scrollTo("about")}>How I work</button>
              </div>

              <div className="hero-meta">
                <span>400+ STR Properties</span>
                <span>Remote · UTC+8</span>
                <span>Operations + Technology</span>
              </div>

              <div className="hero-system">
                <span className="hero-system-dot" />
                <span>AVAILABLE FOR REMOTE PROJECTS · PHILIPPINES</span>
              </div>
            </div>

            <div className="hero-ask">
              <SleepingCat />
              <h2 className="hero-ask-title">Want to know how I work?</h2>

              <div className="hero-question-list">
                {[
                  "What do you actually do?",
                  "How do you handle guest communications?",
                  "What does property management mean in your role?",
                  "How do you use automation and AI?",
                  "What makes you different from a typical VA?",
                  "What technical stuff are you learning?",
                ].map((question) => (
                  <button
                    key={question}
                    className={`hero-question ${heroQuestion === question ? "active" : ""}`}
                    onClick={() => setHeroQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className="hero-answer">
                {heroQuestion === "What do you actually do?" &&
                  "I work in short-term rental operations, with a strong focus on guest communications and the day-to-day work that keeps properties running smoothly. My experience includes guest inquiries, reservation support, pre-arrival communication, check-in support, troubleshooting, issue and escalation management, maintenance and cleaning coordination, follow-ups, reporting, documentation, and internal handovers. I work across the systems behind the operation too, making sure information is organized and the right people know what needs to happen next."}
                {heroQuestion === "How do you handle guest communications?" &&
                  "I treat guest communication as part of the operation, not just customer service. I handle questions, requests, complaints, check-in concerns, troubleshooting, reservation-related issues, and situations that need escalation. I focus on being responsive, accurate, calm, and clear about the next step while keeping the relevant operational context in mind."}
                {heroQuestion === "What does property management mean in your role?" &&
                  "For me, property management is about keeping the moving parts of a short-term rental operation organized. That includes reservations, pre-arrival requirements, guest concerns, cleaning and maintenance coordination, open issues, follow-ups, documentation, and handovers. In a multi-property environment, consistency and good information flow matter because small details can quickly become bigger operational problems."}
                {heroQuestion === "How do you use automation and AI?" &&
                  "Automation and AI are interests and practical tools I’m learning to use alongside my STR operations experience. I experiment with n8n, APIs, webhooks, AI-assisted workflows, and custom tools when they can reduce repetitive work or improve a process. I’m self-taught and still learning, so I don’t present myself as an automation or AI expert. I’m interested in understanding what technology can realistically improve and building things to learn by doing."}
                {heroQuestion === "What makes you different from a typical VA?" &&
                  "My foundation is STR operations. I understand guest communications, property management workflows, follow-ups, escalations, coordination, SOPs, and the realities of keeping day-to-day operations moving. My technical interest gives me another way to look at problems. If something is unnecessarily manual, scattered, or repetitive, I naturally start thinking about whether the process, documentation, or technology could be improved."}
                {heroQuestion === "What technical stuff are you learning?" &&
                  "Outside of my STR work, I’m teaching myself practical technology through personal projects. I’ve been exploring web development, n8n automation, AI-assisted development, Linux, Docker, self-hosting, networking, Raspberry Pi, ESP32, Arduino, and cybersecurity-related projects. I’m not claiming to be an expert in these areas yet. I’m building, experimenting, troubleshooting, and learning because I genuinely enjoy figuring out how things work."}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-corner">Von Untalan · Philippines · UTC+8</div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="sec sec-bg-white" aria-labelledby="about-title">
        <div className="sec-inner">
          <Reveal>
            <p className="sec-eyebrow">About</p>
            <h2 id="about-title" className="sec-h2">Operator who likes to build.</h2>

            <div className="about-grid">
              <div>
                <p className="about-p">I'm Von Untalan, a Filipino remote professional with a background in BPO, customer service, short-term rental operations, automation, and technology.</p>
                <p className="about-p">I started in BPO in 2015 and later moved into remote STR work, where I found I enjoyed more than just communicating with guests. I liked understanding how the operation worked, where processes were repetitive, and where information could get lost.</p>
                <p className="about-p"><strong>How information moves. Where workflows break down. Why teams keep solving the same problem.</strong> That curiosity eventually led me to teach myself automation, AI, web development, and other technical skills through personal projects. These are interests I’m actively building, not areas where I claim to be an expert.</p>
              </div>

              <div>
                {/* airbnb-style "review" card as a quote */}
                <div className="review-card">
                  <Stars />
                  <p className="review-text" style={{ marginTop: "0.6rem" }}>"Can this be automated? Can this be simpler? How does the system behind this actually work?"</p>
                  <p className="review-author">Von Untalan</p>
                  <p className="review-meta">STR Operations · Philippines · Remote</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                  {[["Operate", "Keep the workflow moving"], ["Analyze", "Find friction and gaps"], ["Build", "Create tools and systems"], ["Improve", "Test and make it better"]].map(([t, d]) => (
                    <ListingCard key={t} title={t} body={d} />
                  ))}
                </div>
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-cell"><div className="stat-num">400+</div><div className="stat-lbl">STR Properties</div></div>
              <div className="stat-cell"><div className="stat-num">10+</div><div className="stat-lbl">Systems & Platforms</div></div>
              <div className="stat-cell"><div className="stat-num">11+</div><div className="stat-lbl">Years Work Experience</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="sec-divider" />

      {/* ── OPERATIONS ── */}
      <section id="str-operations" className="sec sec-bg-warm" aria-labelledby="operations-title">
        <div className="sec-inner">
          <Reveal>
            <p className="sec-eyebrow">STR Operations</p>
            <h2 id="operations-title" className="sec-h2">Guest services across 400+ properties.</h2>
            <p className="sec-sub">U.S.-based STR operations across multiple markets — NJ Shore, Vermont, New Orleans. Handling guest-facing work and the processes behind it.</p>

            <div className="ops-grid">
              {[
                ["🏠", "Guest Services",        "Inquiry handling, reservation support, check-in coordination, issue resolution, and escalation management."],
                ["📋", "Pre-Arrival",            "Pre-arrival workflows, guest verification, preparation, and coordination before check-in day."],
                ["🔧", "Maintenance & Cleaning", "Maintenance coordination, cleaning follow-up, troubleshooting, and operational tracking across turnovers."],
                ["📁", "Systems & SOPs",         "Documentation, reporting, SOPs, process organization, and operational workflow design."],
              ].map(([icon, h, p]) => (
                <article className="ops-card" key={h as string}>
                  <div className="ops-icon">{icon}</div>
                  <h3 className="ops-h3">{h}</h3>
                  <p className="ops-p">{p}</p>
                </article>
              ))}
            </div>

            {/* platform logos in context */}
            <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #ede8e0" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: "#b0a898", textTransform: "uppercase", marginBottom: "1rem" }}>Platforms I work in</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}>
                <AirbnbChip />
                <VrboChip />
                <BookingChip />
                <PlatformBadge label="Guesty" color="#0A2540" bg="#f0f4fa" border="#c9d5e8" />
                <PlatformBadge label="Hostaway" color="#1B3A6B" bg="#f0f4fa" border="#c9d5e8" />
                <PlatformBadge label="Breezeway" color="#00827a" bg="#f0faf9" border="#b5e0de" />
                <PlatformBadge label="Enso Connect" color="#5e35b1" bg="#f5f0ff" border="#d4c4f5" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="sec-divider" />

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="sec sec-bg-white" aria-labelledby="experience-title">
        <div className="sec-inner">
          <Reveal>
            <p className="sec-eyebrow">Experience</p>
            <h2 id="experience-title" className="sec-h2">Operations came first.</h2>
            <p className="sec-sub">I didn't leave operations to become technical. I kept working in operations while learning how to build better systems around the work.</p>

            <div className="timeline">
              {[
                { year: "2015 — 2024", title: "BPO / Customer Service / Sales", role: "Foundation", copy: "Built a strong foundation in customer communication, sales, problem-solving, handling difficult conversations, and working inside structured operational environments." },
                { year: "2024 — Present", title: "Remote Work & STR Operations", role: "Operations", copy: "Supporting U.S.-based short-term rental operations across multiple markets. Guest services, reservations, pre-arrival workflows, escalations, maintenance coordination, cleaning coordination, reporting, SOPs, and internal operations." },
                { year: "2024 — Present", title: "Automation · AI · Technical Projects", role: "Building", copy: "Building practical automations, web applications, Chrome extensions, self-hosted systems, and AI-assisted projects alongside operations work. Start with the problem, build the simplest useful solution." },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <article className="tl-item">
                    <span className="tl-dot" />
                    <p className="tl-year">{item.year}</p>
                    <h3 className="tl-title">{item.title}</h3>
                    <p className="tl-role">{item.role}</p>
                    <p className="tl-copy">{item.copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="sec-divider" />

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="sec sec-bg-warm" aria-labelledby="portfolio-title">
        <div className="sec-inner">
          <Reveal>
            <div className="portfolio-head">
              <div>
                <p className="sec-eyebrow">Projects</p>
                <h2 id="portfolio-title" className="sec-h2">I don't just use tools. I build with them.</h2>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#717171", maxWidth: 320, marginBottom: "0.15rem", fontWeight: 300 }}>
                Practical projects showing how I use technology to solve real operational problems.
              </p>
            </div>
          </Reveal>

          <div className="featured-project-grid">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article className="project-card">
                  <div className="project-img-wrap">
                    <img className="project-img" src={p.image} alt={`${p.title} screenshot`} loading="lazy" />
                    {p.link && <div className="project-live-badge">LIVE TOOL</div>}
                  </div>
                  <div className="project-body">
                    <div>
                      <p className="project-num">FEATURED / {String(i + 1).padStart(2, "0")}</p>
                      <h3 className="project-title">{p.title}</h3>
                      <p className="project-cat">{p.category}</p>
                    </div>
                    <div>
                      <p className="project-desc">{p.description}</p>
                      <div className="project-tag-list">{p.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}</div>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-open-btn">
                          Open Tool
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 10L10 2M5 2h5v5"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="technical-projects">
            <div className="technical-head">
              <p className="sec-eyebrow">Technical Projects</p>
              <h3 className="sec-h2" style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}>The builds behind the thinking.</h3>
              <p className="sec-sub">These are personal experiments and self-taught projects that show what I’m interested in learning beyond day-to-day STR operations. They’re not presented as senior engineering work, but as proof that I like building and figuring things out.</p>
            </div>

            <div className="technical-grid">
              {technicalProjects.map((p, i) => (
                <article className="technical-card" key={p.title}>
                  <div className={`technical-img-wrap ${p.image ? "" : "no-image"}`}>
                    {p.image
                      ? <img className="technical-img" src={p.image} alt={`Project visual for ${p.title}`} loading="lazy" />
                      : <div className="technical-no-image">PERSONAL PROJECT · NO PUBLIC SCREENSHOT</div>
                    }
                    {p.image && <span className="technical-visual-label">PROJECT VISUAL</span>}
                  </div>
                  <div className="technical-body">
                    <p className="project-num">TECH / {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="technical-title">{p.title}</h3>
                    <p className="technical-cat">{p.category}</p>
                    <p className="technical-desc">{p.description}</p>
                    <div className="technical-tags">{p.tags.map(t => <span className="technical-tag" key={t}>{t}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      {/* ── SKILLS ── */}
      <section id="skills" className="sec sec-bg-dark" aria-labelledby="skills-title">
        <div className="sec-inner">
          <Reveal>
            <p className="sec-eyebrow" style={{ color: "#FF5A5F" }}>Skills & Tools</p>
            <h2 id="skills-title" className="sec-h2 sec-h2-light">Comfortable inside the stack.</h2>
            <p className="sec-sub sec-sub-light" style={{ marginBottom: "3rem" }}>My core skill is STR operations. The technical side is an added capability I’m building through self-directed learning and personal projects. I’m not presenting myself as a senior software engineer or AI specialist. I’m comfortable learning new tools, troubleshooting, and building practical things when a real problem gives me a reason to.</p>

            <div className="tools-layout">
              <div>
                <div className="tools-group">
                  <p className="tools-lbl">STR Platforms</p>
                  <div className="tools-chips">
                    {["Airbnb", "Vrbo", "Booking.com", "Guesty", "Hostaway", "Breezeway", "Enso Connect", "Aloware"].map(t => <span className="tool-chip-dark" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="tools-group">
                  <p className="tools-lbl">Communication</p>
                  <div className="tools-chips">
                    {["Slack", "WhatsApp", "Google Voice", "Email", "iMessage"].map(t => <span className="tool-chip-dark" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="tools-group">
                  <p className="tools-lbl">Design & Productivity</p>
                  <div className="tools-chips">
                    {["Canva", "Notion", "Google Workspace", "Asana"].map(t => <span className="tool-chip-dark" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
              <div>
                <div className="tools-group">
                  <p className="tools-lbl">Automation & AI</p>
                  <div className="tools-chips">
                    {["n8n", "APIs", "Webhooks", "Claude", "ChatGPT", "Prompt Engineering", "AI Workflows"].map(t => <span className="tool-chip-dark" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="tools-group">
                  <p className="tools-lbl">Web & Development</p>
                  <div className="tools-chips">
                    {["HTML", "CSS", "JavaScript", "React / Next.js"].map(t => <span className="tool-chip-dark" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="tools-group">
                  <p className="tools-lbl">Infrastructure</p>
                  <div className="tools-chips">
                    {["Linux", "Ubuntu Server", "Docker", "nginx", "CasaOS", "Tailscale", "Raspberry Pi"].map(t => <span className="tool-chip-dark" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec sec-bg-dark" aria-labelledby="contact-title">
        <div className="sec-inner">
          <Reveal>
            <p className="sec-eyebrow" style={{ color: "#FF5A5F", marginBottom: "0.5rem" }}>Contact</p>
            <h2 id="contact-title" className="sec-h2 sec-h2-light" style={{ marginBottom: "0.5rem" }}>Need someone who can operate and build?</h2>
            <p className="sec-sub sec-sub-light" style={{ marginBottom: "2.5rem" }}>Best suited for STR property managers, growing operations teams, and small businesses that need someone who understands both operations and technology.</p>

            {/* 3-col: info | character | form */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 200px 1fr", gap: "2.5rem", alignItems: "start" }} className="contact-3col">

              {/* LEFT: info */}
              <div>
                <div className="social-link-row">
                  <a href="https://www.instagram.com/vonstrva/" target="_blank" rel="noopener noreferrer" className="social-pill-dark"><IgIcon />@vonstrva</a>
                  <a href="mailto:vonwrkspace@gmail.com" className="social-pill-dark">✉ vonwrkspace@gmail.com</a>
                </div>
                <div className="contact-info-card">
                  <h3 className="contact-h3">STR Operations + Guest Services</h3>
                  <p className="contact-p">My core work is guest communication, property management support, coordination, follow-ups, and the day-to-day workflows that keep short-term rental operations moving.</p>
                  <p className="contact-p">The technical side is the extra: I’m self-taught, curious, and always interested in finding a practical way to improve a process.</p>
                  <div className="avail-row"><span className="avail-dot" />Philippines · UTC+8 · Remote-Ready</div>
                </div>

                {/* speech bubble - changes with form state */}
                <div style={{
                  marginTop: "1.2rem",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px 12px 12px 4px",
                  padding: "0.9rem 1.1rem",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  position: "relative",
                  transition: "all 0.4s ease",
                }}>
                  {formStatus === "success"
                    ? "🎉 Got it! I'll be in touch soon. Salamat!"
                    : formStatus === "error"
                    ? "😬 Hmm, something went wrong. Try again?"
                    : formStatus === "loading"
                    ? "📨 Sending your message..."
                    : formFocused
                    ? "I'm reading every word — tell me about your property! 👀"
                    : "Hey! I'm Von. Let's work together. Fill out the form →"}
                </div>
              </div>

              {/* CENTER: animated Von + sleeping cat */}
              <div>
                <div className="contact-characters">
                  <ContactCharacter state={formFocused ? "thinking" : "idle"} />
                  
                </div>
                <p className="contact-characters-label">Operate · Build · Improve · Repeat</p>
              </div>

              {/* RIGHT: form */}
              <form onSubmit={handleSubmit}>
                <label className="form-lbl-dark">Your name or company</label>
                <input
                  className="form-field-dark" type="text" name="name" required
                  placeholder="Your name or company"
                  onFocus={() => setFormFocused(true)}
                  onBlur={() => setFormFocused(false)}
                />
                <label className="form-lbl-dark">Email</label>
                <input
                  className="form-field-dark" type="email" name="email" required
                  placeholder="you@email.com"
                  onFocus={() => setFormFocused(true)}
                  onBlur={() => setFormFocused(false)}
                />
                <label className="form-lbl-dark">Message</label>
                <textarea
                  className="form-field-dark" name="message" rows={5} required
                  placeholder="Tell me about your property or where the operation is getting stuck…"
                  style={{ resize: "none" }}
                  onFocus={() => setFormFocused(true)}
                  onBlur={() => setFormFocused(false)}
                />
                <button className="form-btn-coral" type="submit" disabled={formStatus === "loading"}>
                  {formStatus === "loading" ? "Sending…" : "Send Message"}
                </button>
                {formStatus === "success" && <p className="form-msg" style={{ color: "#4ade80" }}>Sent. I'll be in touch soon.</p>}
                {formStatus === "error"   && <p className="form-msg" style={{ color: "#ef8d82" }}>Something went wrong. Try again.</p>}
              </form>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-copy">© 2026 Von Untalan · STR Operations & Guest Services Specialist</span>
        <div className="footer-links">
          <a href="https://www.instagram.com/vonstrva/" target="_blank" rel="noopener noreferrer" className="footer-link"><IgIcon />@vonstrva</a>
          <a href="mailto:vonwrkspace@gmail.com" className="footer-link">vonwrkspace@gmail.com</a>
        </div>
      </footer>
    </main>
  );
}