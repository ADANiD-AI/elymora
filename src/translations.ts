export interface Translation {
  dir: "rtl" | "ltr";
  title: string;
  subtitle: string;
  tabCv: string;
  tabJobs: string;
  tabInterview: string;
  tabElymora?: string;
  selectLang: string;
  urduGuideBtn: string;
  freeEngineBadge: string;
  personalDetails: string;
  tailoredBadge: string;
  chooseTemplate: string;
  fullName: string;
  proTitle: string;
  email: string;
  location: string;
  proSummary: string;
  skills: string;
  experience: string;
  addExperience: string;
  downloadPdfBtn: string;
  compilingPdf: string;
  livePreview: string;
  webcamPhoto: string;
  takeCameraPhoto: string;
  capturePhoto: string;
  removePhoto: string;
  closeCamera: string;
  noPhoto: string;

  // Job Matcher
  uploadResumePdf: string;
  dragDropPdf: string;
  extractingPdf: string;
  extractedSkillsText: string;
  targetLocation: string;
  preferredRole: string;
  matchJobsBtn: string;
  calculatingVectors: string;
  rankedOpportunities: string;
  generateColdEmail: string;

  // Voice Interview
  voiceInterviewTitle: string;
  voiceInterviewDesc: string;
  recordBtn: string;
  stopBtn: string;
  recordingLive: string;
  recordedAudioPlayback: string;
  transcriptLabel: string;
  analyzeBtn: string;
  analyzingState: string;
  interviewStatusTitle: string;
  overallScore: string;
  clarity: string;
  confidence: string;
  feedbackLabel: string;
  noiseReducedBadge: string;

  // Cold Email Modal
  emailModalTitle: string;
  emailModalDesc: string;
  subjectLine: string;
  customPitchLetter: string;
  copyText: string;
  copied: string;
  sendEmailClient: string;

  // Skill Assessment & Certification
  tabSkills: string;
  tabCreative: string;
  tabPortfolio: string;
  tabFreelance: string;
  tabPlanner: string;
  tabLeaderboard: string;
  tabTutor: string;
  skillsTitle: string;
  skillsDesc: string;
  verifiedBadgesTitle: string;
  noBadgesEarned: string;
  startQuizBtn: string;
  submitQuizBtn: string;
  viewOtherQuizzesBtn: string;
  passingScoreLabel: string;
  quizScoreLabel: string;
  congratsPassed: string;
  quizFailedMsg: string;
}

export const translations: Record<string, Translation> = {
  ur: {
    dir: "rtl",
    title: "اے آئی سی وی بلڈر اور لیڈ فائنڈر انجن",
    subtitle: "مفت اوپن سورس لوکل ویکٹر اور پی ڈی ایف پروسیسنگ انجن (`all-MiniLM-L6-v2`)",
    tabCv: "1. لائیو فوٹو اور سی وی بلڈر",
    tabJobs: "2. اے آئی جابز اور لیڈ میچر",
    tabInterview: "3. وائس انٹرویو اور اے آئی اسٹیٹس",
    selectLang: "زبان منتخب کریں (Language):",
    urduGuideBtn: "اردو رہنمائی (Urdu Guide)",
    freeEngineBadge: "100% مفت ای این آئی انجن",
    personalDetails: "پرفیشنل تفصیلات اور سی وی ڈیٹا",
    tailoredBadge: "ڈیٹا اینالسٹس کے لیے خصوصی طور پر تیار کردہ",
    chooseTemplate: "سی وی ٹیمپلیٹ منتخب کریں",
    fullName: "پورا نام (Full Name)",
    proTitle: "پیشہ ورانہ عنوان (Professional Title)",
    email: "ای میل ایڈریس",
    location: "مقام / لوکیشن",
    proSummary: "پیشہ ورانہ خلاصہ (Professional Summary)",
    skills: "اہم مہارتیں (Comma Separated Core Skills)",
    experience: "عملی تجربہ (Work Experience)",
    addExperience: "تجربہ شامل کریں",
    downloadPdfBtn: "پی ڈی ایف (PDF) سی وی ڈاؤن لوڈ کریں",
    compilingPdf: "پی ڈی ایف جنریٹ ہو رہی ہے...",
    livePreview: "لائیو پریویو (Live Preview)",
    webcamPhoto: "لائیو کیمرہ تصویر (Webcam Profile Photo)",
    takeCameraPhoto: "کیمرہ آن کریں",
    capturePhoto: "تصویر حاصل کریں",
    removePhoto: "تصویر ہٹائیں",
    closeCamera: "بند کریں",
    noPhoto: "تصویر نہیں ہے",

    uploadResumePdf: "1. سی وی اپ لوڈ کریں (PDF Resume)",
    dragDropPdf: "سی وی کی پی ڈی ایف (PDF) یہاں ڈریگ یا سلیکٹ کریں",
    extractingPdf: "پی ڈی ایف سے متن نکالا جا رہا ہے...",
    extractedSkillsText: "استخراج شدہ مہارتیں اور سی وی خلاصہ",
    targetLocation: "هدف لوکیشن (Target Location)",
    preferredRole: "مطلوبہ عہدہ (Preferred Role)",
    matchJobsBtn: "بہترین جابز اور لیڈز تلاش کریں",
    calculatingVectors: "ویکٹر اسکور کی حساب کتاب جاری ہے...",
    rankedOpportunities: "درجہ بند جابز (Ranked Opportunities)",
    generateColdEmail: "خودکار ای میل جنریٹ کریں",

    voiceInterviewTitle: "انٹرویو وائس ریکارڈر اور AI اسکور ڈیش بورڈ",
    voiceInterviewDesc: "اپنی آواز میں تعارف یا جواب ریکارڈ کریں اور فوری AI تجزیہ اور فیڈ بیک حاصل کریں",
    recordBtn: "آواز ریکارڈ کریں 🎙️",
    stopBtn: "ریکارڈنگ روکیں ⏹️",
    recordingLive: "ریکارڈنگ جاری ہے... (Recording live audio)",
    recordedAudioPlayback: "ریکارڈ شدہ آڈیو (Audio Playback)",
    transcriptLabel: "انٹرویو کا متن / نكات (Speech Transcript Text)",
    analyzeBtn: "انٹرویو کا AI اسٹیٹس معلوم کریں",
    analyzingState: "AI تجزیہ اور شور صفائی ہو رہی ہے...",
    interviewStatusTitle: "انٹرویو کی کارکردگی کا اسٹیٹس (AI Analysis)",
    overallScore: "مجموعی اسکور",
    clarity: "روانی (Clarity)",
    confidence: "اعتماد (Confidence)",
    feedbackLabel: "تلافی اور مشورہ (Constructive Feedback):",
    noiseReducedBadge: "85% پس منظر کا شور ختم کر دیا گیا",

    emailModalTitle: "اے آئی کولڈ ای میل / کور لیٹر جنریٹر",
    emailModalDesc: "کلائنٹ یا ایچ آر کو براہ راست پرپوزل بھیجنے کے لیے پرسنلائزڈ پیچ",
    subjectLine: "ای میل کا سبجیکٹ (Subject Line)",
    customPitchLetter: "مخصوص پرپوزل لیٹر (Custom Pitch Letter)",
    copyText: "متن کاپی کریں",
    copied: "کاپی ہو گیا!",
    sendEmailClient: "جی میل یا ای میل کلائنٹ کے ذریعے بھیجیں",

    tabSkills: "4. مہارتوں کی تصدیق اور اسکلز ٹیسٹنگ",
    tabCreative: "5. 🎨 گرافک ڈیزائننگ و ویڈیو ایڈیٹنگ اسٹوڈیو",
    tabPortfolio: "6. 🏅 مرکزی پورٹ فولیو اور تصدیق شدہ اسناد",
    tabFreelance: "7. 🤝 فری لانسنگ و پروپوزل ہب",
    tabPlanner: "8. 📅 اے آئی اسٹڈی پلانر و اسٹریک",
    tabLeaderboard: "9. 🏆 لیڈر بورڈ و کمیونٹی",
    tabTutor: "10. 🤖 اے آئی اوتار اور ڈاؤٹ ریزولور",
    tabElymora: "11. ✨ ایلمورا پریمیم بوتیک (Elymora Store)",
    skillsTitle: "مہارتوں کی تصدیق اور اسکلز اسیسمنٹ (Verified Badges)",
    skillsDesc: "انگلش اور تکنیکی مہارتوں کا کوئز ٹیسٹ پاس کریں اور اپنی پروفائل پر تصدیق شدہ بیج (Verified Badge) حاصل کریں",
    verifiedBadgesTitle: "پروفائل پر تصدیق شدہ بیجز (Verified Badges)",
    noBadgesEarned: "ابھی تک کوئی بیج حاصل نہیں ہوا۔ ٹیسٹ شروع کریں!",
    startQuizBtn: "ٹیسٹ شروع کریں",
    submitQuizBtn: "ٹیسٹ جمع کروائیں",
    viewOtherQuizzesBtn: "دیگر ٹیسٹ دیکھیں",
    passingScoreLabel: "کامیابی کے لیے نمبر:",
    quizScoreLabel: "آپ کا حاصل کردہ اسکور:",
    congratsPassed: "مبارک ہو! آپ کا ٹیسٹ پاس ہو گیا ہے اور تصدیق شدہ بیج پروفائل میں شامل کر دیا گیا ہے۔",
    quizFailedMsg: "ٹیسٹ پاس کرنے کے لیے کم از کم 70% نمبر درکار ہیں۔ دوبارہ کوشش کریں۔"
  },
  en: {
    dir: "ltr",
    title: "AI CV Builder & Lead Finder Engine",
    subtitle: "Zero-Cost Local Vector & PDF Processing Engine (`all-MiniLM-L6-v2`)",
    tabCv: "1. Live Photo & CV Builder",
    tabJobs: "2. AI Jobs & Lead Matcher",
    tabInterview: "3. Voice Interview Recorder & AI Status",
    selectLang: "Select Language:",
    urduGuideBtn: "Urdu Terminal Guide",
    freeEngineBadge: "100% Free AI Engine",
    personalDetails: "Personal Details & CV Content",
    tailoredBadge: "Tailored for Data Analysts & Seekers",
    chooseTemplate: "Choose Design Template",
    fullName: "Full Name",
    proTitle: "Professional Title",
    email: "Email Address",
    location: "Location / City",
    proSummary: "Professional Summary",
    skills: "Core Skills (Comma Separated)",
    experience: "Work Experience & Projects",
    addExperience: "Add Experience",
    downloadPdfBtn: "Download Pixel-Perfect PDF CV",
    compilingPdf: "Compiling PDF Document...",
    livePreview: "Live Resume Preview",
    webcamPhoto: "Webcam Profile Photo",
    takeCameraPhoto: "Start Camera",
    capturePhoto: "Capture Photo",
    removePhoto: "Remove Photo",
    closeCamera: "Close Camera",
    noPhoto: "No Photo Captured",

    uploadResumePdf: "1. Upload Resume / CV (PDF)",
    dragDropPdf: "Click or drag CV PDF file here",
    extractingPdf: "Extracting raw text from PDF...",
    extractedSkillsText: "Extracted Skills & Resume Context",
    targetLocation: "Target Location (e.g. Remote, US, Pakistan)",
    preferredRole: "Preferred Role / Keyword",
    matchJobsBtn: "Match Jobs & Ranked Leads",
    calculatingVectors: "Calculating Cosine Vectors...",
    rankedOpportunities: "Ranked Opportunities",
    generateColdEmail: "Generate Cold Email",

    voiceInterviewTitle: "Voice Interview Recorder & AI Dashboard",
    voiceInterviewDesc: "Record your intro or interview answer & get instant AI evaluation",
    recordBtn: "Record Voice 🎙️",
    stopBtn: "Stop Recording ⏹️",
    recordingLive: "Recording live audio...",
    recordedAudioPlayback: "Recorded Audio Playback",
    transcriptLabel: "Speech Transcript / Notes Text",
    analyzeBtn: "Analyze Voice Interview Status",
    analyzingState: "Evaluating audio & noise filtering...",
    interviewStatusTitle: "Voice Interview Performance Dashboard",
    overallScore: "Overall Score",
    clarity: "Clarity Rate",
    confidence: "Confidence Level",
    feedbackLabel: "Constructive Coaching Feedback:",
    noiseReducedBadge: "85% Background Noise Reduced",

    emailModalTitle: "AI Cold Email & Pitch Generator",
    emailModalDesc: "Personalized cold outreach tailored to target job requirements",
    subjectLine: "Email Subject Line",
    customPitchLetter: "Custom Pitch Letter",
    copyText: "Copy Text",
    copied: "Copied!",
    sendEmailClient: "Send via Gmail / Email Client",

    tabSkills: "4. Skill Assessment & Certification",
    tabCreative: "5. 🎨 Creative Studio (Design & Video)",
    tabPortfolio: "6. 🏅 Central Portfolio & Master Certificates",
    tabFreelance: "7. 🤝 Freelance & Proposal Hub",
    tabPlanner: "8. 📅 AI Study Planner & Habit Tracker",
    tabLeaderboard: "9. 🏆 Global Leaderboard & Community",
    tabTutor: "10. 🤖 AI Avatar Tutor & Doubt Resolver",
    tabElymora: "11. ✨ Elymora Luxury Boutique",
    skillsTitle: "Skill Assessment & Verified Certification",
    skillsDesc: "Take English and technical quizzes to earn Verified Badges on your profile and stand out to recruiters",
    verifiedBadgesTitle: "Profile Verified Badges",
    noBadgesEarned: "No badges earned yet. Take a skill test below!",
    startQuizBtn: "Start Quiz",
    submitQuizBtn: "Submit Assessment",
    viewOtherQuizzesBtn: "Explore Other Quizzes",
    passingScoreLabel: "Passing Mark:",
    quizScoreLabel: "Your Score:",
    congratsPassed: "Congratulations! You passed the test and earned a Verified Profile Badge.",
    quizFailedMsg: "A minimum score of 70% is required to pass. Please try again."
  },
  ar: {
    dir: "rtl",
    title: "محرك الذكاء الاصطناعي لبناء السيرة الذاتية ومطابقة الوظائف",
    subtitle: "محرك مجاني محلي لمتجهات النصوص ومعالجة ملفات PDF",
    tabCv: "1. الصورة المباشرة ومُنشئ السيرة الذاتية",
    tabJobs: "2. مطابقة الوظائف بالذكاء الاصطناعي",
    tabInterview: "3. مسجل المقابلة الصوتية والتحليل",
    selectLang: "اختر اللغة:",
    urduGuideBtn: "دليل الأوامر (Urdu Guide)",
    freeEngineBadge: "محرك مجاني 100%",
    personalDetails: "التفاصيل الشخصية ومحتوى السيرة الذاتية",
    tailoredBadge: "مخصص لمحللي البيانات والباحثين عن عمل",
    chooseTemplate: "اختر تصميم السيرة الذاتية",
    fullName: "الاسم الكامل",
    proTitle: "المسمى الوظيفي",
    email: "البريد الإلكتروني",
    location: "الموقع / المدينة",
    proSummary: "الملخص المهني",
    skills: "المهارات الأساسية (مفصولة بفواصل)",
    experience: "الخبرة العملية والمشاريع",
    addExperience: "إضافة خبرة",
    downloadPdfBtn: "تحميل السيرة الذاتية بصيغة PDF",
    compilingPdf: "جاري إنشاء ملف PDF...",
    livePreview: "معاينة مباشرة للسيرة الذاتية",
    webcamPhoto: "صورة الملف الشخصي بالكاميرا",
    takeCameraPhoto: "تشغيل الكاميرا",
    capturePhoto: "التقاط صورة",
    removePhoto: "إزالة الصورة",
    closeCamera: "إغلاق الكاميرا",
    noPhoto: "لا توجد صورة",

    uploadResumePdf: "1. رفع السيرة الذاتية (PDF)",
    dragDropPdf: "انقر أو اسحب ملف السيرة الذاتية PDF هنا",
    extractingPdf: "جاري استخراج النص من ملف PDF...",
    extractedSkillsText: "المهارات وسياق السيرة الذاتية المستخرجة",
    targetLocation: "الموقع المستهدف",
    preferredRole: "الدور الوظيفي المفضل",
    matchJobsBtn: "البحث عن أفضل الوظائف المطابقة",
    calculatingVectors: "جاري حساب المتجهات والمطابقة...",
    rankedOpportunities: "الوظائف والفرص المصنفة",
    generateColdEmail: "إنشاء بريد إلكتروني تلقائي",

    voiceInterviewTitle: "مسجل المقابلة الصوتية ولوحة التحليل",
    voiceInterviewDesc: "سجل مقدمتك أو إجابتك واحصل على تقييم فوري بالذكاء الاصطناعي",
    recordBtn: "تسجيل الصوت 🎙️",
    stopBtn: "إيقاف التسجيل ⏹️",
    recordingLive: "جاري تسجيل الصوت المباشر...",
    recordedAudioPlayback: "تشغيل الصوت المسجل",
    transcriptLabel: "نص المقابلة / النص المستخرج",
    analyzeBtn: "تحليل تقييم المقابلة الصوتية",
    analyzingState: "جاري تنقية الصوت والتحليل...",
    interviewStatusTitle: "لوحة تقييم أداء المقابلة الصوتية",
    overallScore: "النتيجة الإجمالية",
    clarity: "مستوى الوضوح",
    confidence: "مستوى الثقة",
    feedbackLabel: "الملاحظات والارشاد المهني:",
    noiseReducedBadge: "تم تقليل الضوضاء بنسبة 85%",

    emailModalTitle: "مولد الرسائل ورسائل التغطية بالذكاء الاصطناعي",
    emailModalDesc: "عرض مخصص وموجه لاحتياجات الشركة والوظيفة",
    subjectLine: "عنوان البريد الإلكتروني",
    customPitchLetter: "خطاب العرض المخصص",
    copyText: "نسخ النص",
    copied: "تم النسخ!",
    sendEmailClient: "إرسال عبر بريد Gmail أو التطبيق",

    tabSkills: "4. تقييم المهارات والشهادات المعتمدة",
    tabCreative: "5. 🎨 استوديو التصميم والمونتاج",
    tabPortfolio: "6. 🏅 المحفظة المركزية والشهادات المعتمدة",
    tabFreelance: "7. 🤝 مركز العمل الحر والاقتراحات",
    tabPlanner: "8. 📅 مخطط الدراسة الذكي وتتبع العادات",
    tabLeaderboard: "9. 🏆 لوحة المتصدرين والمجتمع",
    tabTutor: "10. 🤖 معلم الذكاء الاصطناعي والإجابة الفورية",
    skillsTitle: "تقييم المهارات والشهادات المعتمدة (Verified Badges)",
    skillsDesc: "اجتَز اختبارات اللغة والمهارات التقنية للحصول على شارات موثقة في ملفك الشخصي",
    verifiedBadgesTitle: "شارات الملف الشخصي الموثقة",
    noBadgesEarned: "لم يتم الحصول على شارات بعد. ابدأ الاختبار الآن!",
    startQuizBtn: "بدء الاختبار",
    submitQuizBtn: "إرسال الاختبار",
    viewOtherQuizzesBtn: "استكشاف اختبارات أخرى",
    passingScoreLabel: "درجة النجاح المطلوب:",
    quizScoreLabel: "درجتك المستحقة:",
    congratsPassed: "تهانينا! لقد اجتزت الاختبار بنجاح وتمت إضافة الشارة الموثقة إلى ملفك.",
    quizFailedMsg: "يتطلب النجاح الحصول على 70% على الأقل. يرجى المحاولة مرة أخرى."
  },
  es: {
    dir: "ltr",
    title: "Motor de Creación de CV y Búsqueda de Empleo con IA",
    subtitle: "Motor local gratuito de incrustaciones vectoriales y PDF (`all-MiniLM-L6-v2`)",
    tabCv: "1. Foto en Vivo y Creador de CV",
    tabJobs: "2. Emparejamiento de Empleos con IA",
    tabInterview: "3. Grabadora de Entrevista de Voz y Estado IA",
    selectLang: "Seleccionar Idioma:",
    urduGuideBtn: "Guía de Comandos (Urdu)",
    freeEngineBadge: "Motor IA 100% Gratuito",
    personalDetails: "Detalles Personales y Contenido del CV",
    tailoredBadge: "Adaptado para Analistas de Datos y Candidatos",
    chooseTemplate: "Elegir Plantilla de Diseño",
    fullName: "Nombre Completo",
    proTitle: "Título Profesional",
    email: "Correo Electrónico",
    location: "Ubicación / Ciudad",
    proSummary: "Resumen Profesional",
    skills: "Habilidades Clave (Separadas por comas)",
    experience: "Experiencia Laboral y Proyectos",
    addExperience: "Añadir Experiencia",
    downloadPdfBtn: "Descargar CV en PDF Impecable",
    compilingPdf: "Generando documento PDF...",
    livePreview: "Vista Previa en Vivo del CV",
    webcamPhoto: "Foto de Perfil con Cámara",
    takeCameraPhoto: "Iniciar Cámara",
    capturePhoto: "Capturar Foto",
    removePhoto: "Eliminar Foto",
    closeCamera: "Cerrar Cámara",
    noPhoto: "Sin foto capturada",

    uploadResumePdf: "1. Subir Currículum (PDF)",
    dragDropPdf: "Haga clic o arrastre el archivo PDF del CV aquí",
    extractingPdf: "Extrayendo texto del PDF...",
    extractedSkillsText: "Habilidades y Contexto Extraídos",
    targetLocation: "Ubicación Objetivo",
    preferredRole: "Puesto / Rol Preferido",
    matchJobsBtn: "Emparejar Empleos y Oportunidades",
    calculatingVectors: "Calculando similitud de vectores...",
    rankedOpportunities: "Oportunidades Clasificadas",
    generateColdEmail: "Generar Correo de Presentación",

    voiceInterviewTitle: "Grabadora de Entrevista y Panel de Análisis IA",
    voiceInterviewDesc: "Grabe su presentación o respuesta y obtenga evaluación con IA",
    recordBtn: "Grabar Voz 🎙️",
    stopBtn: "Detener Grabación ⏹️",
    recordingLive: "Grabando audio en vivo...",
    recordedAudioPlayback: "Reproducción de Audio Grabado",
    transcriptLabel: "Transcripción de Texto de la Entrevista",
    analyzeBtn: "Analizar Estado de Entrevista",
    analyzingState: "Evaluando audio y filtrando ruido...",
    interviewStatusTitle: "Panel de Rendimiento de Entrevista de Voz",
    overallScore: "Puntuación General",
    clarity: "Tasa de Claridad",
    confidence: "Nivel de Confianza",
    feedbackLabel: "Comentarios de Orientación y Mejora:",
    noiseReducedBadge: "Reducción de Ruido de Fondo del 85%",

    emailModalTitle: "Generador de Carta de Presentación y Correos IA",
    emailModalDesc: "Propuesta personalizada adaptada a la oferta de trabajo",
    subjectLine: "Asunto del Correo",
    customPitchLetter: "Carta de Propuesta Personalizada",
    copyText: "Copiar Texto",
    copied: "¡Copiado!",
    sendEmailClient: "Enviar por Gmail o Cliente de Correo",

    tabSkills: "4. Evaluación de Habilidades y Certificación",
    tabCreative: "5. 🎨 Estudio Creativo (Diseño y Video)",
    tabPortfolio: "6. 🏅 Portafolio Central y Certificados",
    tabFreelance: "7. 🤝 Centro de Freelance y Propuestas",
    tabPlanner: "8. 📅 Planificador de Estudio IA y Hábitos",
    tabLeaderboard: "9. 🏆 Clasificación Global y Comunidad",
    tabTutor: "10. 🤖 Tutor Avatar IA y Resolutor de Dudas",
    skillsTitle: "Evaluación de Habilidades e Insignias Verificadas",
    skillsDesc: "Rinda cuestionarios de inglés y competencias técnicas para obtener Insignias Verificadas en su perfil",
    verifiedBadgesTitle: "Insignias Verificadas del Perfil",
    noBadgesEarned: "Aún no ha obtenido insignias. ¡Comience una prueba!",
    startQuizBtn: "Iniciar Cuestionario",
    submitQuizBtn: "Enviar Evaluación",
    viewOtherQuizzesBtn: "Ver Otras Pruebas",
    passingScoreLabel: "Puntaje Mínimo de Aprobación:",
    quizScoreLabel: "Su Puntaje Obtenido:",
    congratsPassed: "¡Felicitaciones! Aprobó la prueba y obtuvo una Insignia Verificada.",
    quizFailedMsg: "Se requiere un mínimo de 70% para aprobar. Inténtelo de nuevo."
  },
  fr: {
    dir: "ltr",
    title: "Moteur de Création de CV et Matcher d'Emplois IA",
    subtitle: "Moteur local gratuit d'embeddings vectoriels et PDF (`all-MiniLM-L6-v2`)",
    tabCv: "1. Photo en Direct & Créateur de CV",
    tabJobs: "2. Matcher d'Emplois & Leads IA",
    tabInterview: "3. Enregistreur d'Entretien Vocal & Statut IA",
    selectLang: "Choisir la Langue :",
    urduGuideBtn: "Guide des Commandes (Urdu)",
    freeEngineBadge: "Moteur IA 100% Gratuit",
    personalDetails: "Détails Personnels & Contenu du CV",
    tailoredBadge: "Conçu pour les Data Analysts et Chercheurs d'Emploi",
    chooseTemplate: "Choisir un Modèle de Design",
    fullName: "Nom Complet",
    proTitle: "Titre Professionnel",
    email: "Adresse Email",
    location: "Localisation / Ville",
    proSummary: "Résumé Professionnel",
    skills: "Compétences Clés (Séparées par des virgules)",
    experience: "Expérience Professionnelle & Projets",
    addExperience: "Ajouter une Expérience",
    downloadPdfBtn: "Télécharger le CV au format PDF",
    compilingPdf: "Génération du document PDF...",
    livePreview: "Aperçu en direct du CV",
    webcamPhoto: "Photo de profil par Caméra",
    takeCameraPhoto: "Activer la Caméra",
    capturePhoto: "Prendre une photo",
    removePhoto: "Supprimer la photo",
    closeCamera: "Fermer la Caméra",
    noPhoto: "Aucune photo prise",

    uploadResumePdf: "1. Téléverser votre CV (PDF)",
    dragDropPdf: "Cliquez ou glissez le fichier PDF ici",
    extractingPdf: "Extraction du texte du PDF...",
    extractedSkillsText: "Compétences et Contexte Extraits",
    targetLocation: "Localisation Ciblée",
    preferredRole: "Rôle / Poste Préféré",
    matchJobsBtn: "Trouver les meilleures offres",
    calculatingVectors: "Calcul des scores de correspondance...",
    rankedOpportunities: "Offres & Opportunités Classées",
    generateColdEmail: "Générer un Email de Prospection",

    voiceInterviewTitle: "Enregistreur d'Entretien Vocal & Tableau de Bord IA",
    voiceInterviewDesc: "Enregistrez votre présentation et obtenez une évaluation IA instantanée",
    recordBtn: "Enregistrer la Voix 🎙️",
    stopBtn: "Arrêter l'Enregistrement ⏹️",
    recordingLive: "Enregistrement audio en direct...",
    recordedAudioPlayback: "Lecture de l'Audio Enregistré",
    transcriptLabel: "Transcription Texte de l'Entretien",
    analyzeBtn: "Analyser le Statut de l'Entretien",
    analyzingState: "Évaluation de l'audio et réduction du bruit...",
    interviewStatusTitle: "Tableau de Performance de l'Entretien Vocal",
    overallScore: "Score Global",
    clarity: "Taux de Clarté",
    confidence: "Niveau de Confiance",
    feedbackLabel: "Conseils et Feedback Amélioré :",
    noiseReducedBadge: "85% de Bruit de Fond Réduit",

    emailModalTitle: "Générateur d'Email de Prospection & Lettre IA",
    emailModalDesc: "Pitch personnalisé adapté aux besoins de l'entreprise",
    subjectLine: "Objet de l'Email",
    customPitchLetter: "Lettre de Présentation Personnalisée",
    copyText: "Copier le Texte",
    copied: "Copié !",
    sendEmailClient: "Envoyer via Gmail ou Client Email",

    tabSkills: "4. Évaluation des Compétences & Certification",
    tabCreative: "5. 🎨 Studio Créatif (Design & Vidéo)",
    tabPortfolio: "6. 🏅 Portfolio Central & Certificats",
    tabFreelance: "7. 🤝 Centre Freelance & Propositions",
    tabPlanner: "8. 📅 Planificateur d'Études IA & Habitudes",
    tabLeaderboard: "9. 🏆 Classement Mondial & Communauté",
    tabTutor: "10. 🤖 Tuteur Virtuel IA & Résolution de Doutes",
    skillsTitle: "Évaluation des Compétences & Badges Vérifiés",
    skillsDesc: "Passez des tests de langue et techniques pour obtenir des Badges Vérifiés sur votre profil",
    verifiedBadgesTitle: "Badges Vérifiés du Profil",
    noBadgesEarned: "Aucun badge obtenu pour l'instant. Commencez un test ci-dessous !",
    startQuizBtn: "Commencer le Test",
    submitQuizBtn: "Soumettre le Test",
    viewOtherQuizzesBtn: "Explorer d'Autres Tests",
    passingScoreLabel: "Note de Passage :",
    quizScoreLabel: "Votre Score :",
    congratsPassed: "Félicitations ! Vous avez réussi le test et obtenu un Badge Vérifié.",
    quizFailedMsg: "Un score minimum de 70 % est requis pour réussir. Veuillez réessayer."
  },
  zh: {
    dir: "ltr",
    title: "AI 简历生成器与职位匹配引擎",
    subtitle: "零成本本地向量与 PDF 解析引擎 (`all-MiniLM-L6-v2`)",
    tabCv: "1. 实时照片与简历生成器",
    tabJobs: "2. AI 职位与机会匹配器",
    tabInterview: "3. 语音面试录音与 AI 状态评估",
    selectLang: "选择语言:",
    urduGuideBtn: "终端运行指南 (Urdu)",
    freeEngineBadge: "100% 免费 AI 引擎",
    personalDetails: "个人信息与简历内容",
    tailoredBadge: "专为数据分析师及求职者打造",
    chooseTemplate: "选择简历设计模板",
    fullName: "姓名",
    proTitle: "专业头衔",
    email: "电子邮箱",
    location: "工作地点 / 城市",
    proSummary: "个人专业简介",
    skills: "核心技能 (用逗号分隔)",
    experience: "工作经历与项目成果",
    addExperience: "添加工作经历",
    downloadPdfBtn: "下载高清 PDF 格式简历",
    compilingPdf: "正在编译 PDF 文件...",
    livePreview: "简历实时预览",
    webcamPhoto: "摄像头实时头像",
    takeCameraPhoto: "开启摄像头",
    capturePhoto: "拍摄照片",
    removePhoto: "移除照片",
    closeCamera: "关闭摄像头",
    noPhoto: "未拍摄照片",

    uploadResumePdf: "1. 上传简历 (PDF)",
    dragDropPdf: "点击或拖拽 PDF 简历文件至此处",
    extractingPdf: "正在提取 PDF 文本内容...",
    extractedSkillsText: "已提取的技能与简历文本",
    targetLocation: "目标工作地点",
    preferredRole: "期望职位 / 关键字",
    matchJobsBtn: "匹配最佳职位与机会",
    calculatingVectors: "正在计算向量相似度分值...",
    rankedOpportunities: "职位匹配度排行榜",
    generateColdEmail: "生成自荐求职邮件",

    voiceInterviewTitle: "语音面试录音与 AI 评测仪表盘",
    voiceInterviewDesc: "录制您的自我介绍或回答，即时获取 AI 面试评分与建议",
    recordBtn: "录制语音 🎙️",
    stopBtn: "停止录音 ⏹️",
    recordingLive: "正在录制实时语音...",
    recordedAudioPlayback: "录音回放",
    transcriptLabel: "面试语音转文字 / 笔记",
    analyzeBtn: "分析语音面试表现",
    analyzingState: "正在进行降噪与 AI 评测分析...",
    interviewStatusTitle: "语音面试表现分析仪表盘",
    overallScore: "综合评分",
    clarity: "表达清晰度",
    confidence: "自信流畅度",
    feedbackLabel: "改进与提升建议:",
    noiseReducedBadge: "已自动降低 85% 背景噪音",

    emailModalTitle: "AI 求职自荐信与邮件生成器",
    emailModalDesc: "根据目标岗位要求定制的个性化求职文案",
    subjectLine: "邮件主题",
    customPitchLetter: "定制自荐信正文",
    copyText: "复制文本",
    copied: "已复制！",
    sendEmailClient: "通过 Gmail 或客户端发送",

    tabSkills: "4. 技能认证与测试考核",
    tabCreative: "5. 🎨 创意设计与视频剪辑工作室",
    tabPortfolio: "6. 🏅 综合作品集与官方认证证书",
    tabFreelance: "7. 🤝 自由职业与 AI 求职提案中心",
    tabPlanner: "8. 📅 AI 智能学习计划与习惯追踪",
    tabLeaderboard: "9. 🏆 全球排行榜与学习社区",
    tabTutor: "10. 🤖 虚拟 AI 导师与答疑中心",
    skillsTitle: "技能评估考核与官方认证徽章",
    skillsDesc: "通过英语与专业技术能力测试，在您的个人主页上展示 Verified 认证徽章",
    verifiedBadgesTitle: "个人主页 Verified 认证徽章",
    noBadgesEarned: "暂未获得认证徽章，立即选择下方技能测试！",
    startQuizBtn: "开始技能测试",
    submitQuizBtn: "提交测试答案",
    viewOtherQuizzesBtn: "查看其他测试",
    passingScoreLabel: "及格分数线:",
    quizScoreLabel: "您的得分:",
    congratsPassed: "恭喜！您已成功通过测试，Verified 认证徽章已添加到您的个人资料中。",
    quizFailedMsg: "通过测试需要至少 70% 分数，请重新尝试。"
  }
};
