export const localizedLocales = ['es', 'de', 'fr', 'it', 'pt', 'nl', 'pl', 'da', 'id', 'tr', 'ja', 'hi', 'mr'] as const;
export type LocalizedLocale = (typeof localizedLocales)[number];

import { localizedPublicPaths, type LocalizedPath } from '@/lib/localized-paths';
export { localizedPublicPaths, type LocalizedPath } from '@/lib/localized-paths';

type Copy = {
  label: string; htmlLang: string; eyebrow: string; intro: string; cta: string;
  strategy: string; strategyText: string; delivery: string; deliveryText: string;
  reporting: string; reportingText: string; topics: Partial<Record<LocalizedPath, string>>;
};

const copies: Record<LocalizedLocale, Copy> = {
  es: { label: 'Español', htmlLang: 'es', eyebrow: 'MARKETING DIGITAL PARA EL CRECIMIENTO', intro: 'Estrategia clara, ejecución útil y resultados que ayudan a su negocio a avanzar.', cta: 'Hable con nuestro equipo', strategy: 'Estrategia clara', strategyText: 'Prioridades alineadas con sus objetivos y clientes.', delivery: 'Ejecución enfocada', deliveryText: 'Trabajo práctico que mejora visibilidad y conversión.', reporting: 'Progreso medible', reportingText: 'Información clara para decidir el siguiente paso.', topics: {'/':'Agencia de marketing digital', '/about-us/':'Acerca de Sansoft', '/seo-services/':'Servicios SEO', '/local-seo-services/':'SEO local', '/google-ads-management-services/':'Gestión de Google Ads', '/social-media-management-services/':'Gestión de redes sociales', '/web-development-services/':'Desarrollo web', '/contact-us/':'Contacte con Sansoft'} },
  de: { label: 'Deutsch', htmlLang: 'de', eyebrow: 'DIGITALES MARKETING FÜR WACHSTUM', intro: 'Klare Strategie, hilfreiche Umsetzung und Ergebnisse, die Ihr Unternehmen voranbringen.', cta: 'Mit unserem Team sprechen', strategy: 'Klare Strategie', strategyText: 'Prioritäten, die zu Zielen und Kunden passen.', delivery: 'Fokussierte Umsetzung', deliveryText: 'Praktische Arbeit für Sichtbarkeit und Conversion.', reporting: 'Messbarer Fortschritt', reportingText: 'Klare Einblicke für den nächsten Schritt.', topics: {'/':'Agentur für digitales Marketing', '/about-us/':'Über Sansoft', '/seo-services/':'SEO-Dienstleistungen', '/local-seo-services/':'Lokales SEO', '/google-ads-management-services/':'Google Ads Management', '/social-media-management-services/':'Social-Media-Management', '/web-development-services/':'Webentwicklung', '/contact-us/':'Sansoft kontaktieren'} },
  fr: { label: 'Français', htmlLang: 'fr', eyebrow: 'MARKETING DIGITAL POUR LA CROISSANCE', intro: 'Une stratégie claire, une exécution utile et des résultats qui font avancer votre entreprise.', cta: 'Parler à notre équipe', strategy: 'Stratégie claire', strategyText: 'Des priorités adaptées à vos objectifs et clients.', delivery: 'Exécution ciblée', deliveryText: 'Un travail concret pour la visibilité et la conversion.', reporting: 'Progrès mesurable', reportingText: 'Des informations claires pour décider de la suite.', topics: {'/':'Agence de marketing digital', '/about-us/':'À propos de Sansoft', '/seo-services/':'Services SEO', '/local-seo-services/':'SEO local', '/google-ads-management-services/':'Gestion Google Ads', '/social-media-management-services/':'Gestion des réseaux sociaux', '/web-development-services/':'Développement web', '/contact-us/':'Contacter Sansoft'} },
  it: { label: 'Italiano', htmlLang: 'it', eyebrow: 'MARKETING DIGITALE PER LA CRESCITA', intro: 'Strategia chiara, esecuzione utile e risultati che aiutano la tua azienda a crescere.', cta: 'Parla con il nostro team', strategy: 'Strategia chiara', strategyText: 'Priorità allineate ai tuoi obiettivi e clienti.', delivery: 'Esecuzione mirata', deliveryText: 'Lavoro concreto per visibilità e conversioni.', reporting: 'Progresso misurabile', reportingText: 'Informazioni chiare per il prossimo passo.', topics: {'/':'Agenzia di marketing digitale', '/about-us/':'Chi è Sansoft', '/seo-services/':'Servizi SEO', '/local-seo-services/':'SEO locale', '/google-ads-management-services/':'Gestione Google Ads', '/social-media-management-services/':'Gestione social media', '/web-development-services/':'Sviluppo web', '/contact-us/':'Contatta Sansoft'} },
  pt: { label: 'Português', htmlLang: 'pt', eyebrow: 'MARKETING DIGITAL PARA CRESCIMENTO', intro: 'Estratégia clara, execução útil e resultados que ajudam a sua empresa a avançar.', cta: 'Fale com nossa equipe', strategy: 'Estratégia clara', strategyText: 'Prioridades alinhadas aos seus objetivos e clientes.', delivery: 'Execução focada', deliveryText: 'Trabalho prático para visibilidade e conversão.', reporting: 'Progresso mensurável', reportingText: 'Informações claras para o próximo passo.', topics: {'/':'Agência de marketing digital', '/about-us/':'Sobre a Sansoft', '/seo-services/':'Serviços de SEO', '/local-seo-services/':'SEO local', '/google-ads-management-services/':'Gestão de Google Ads', '/social-media-management-services/':'Gestão de redes sociais', '/web-development-services/':'Desenvolvimento web', '/contact-us/':'Fale com a Sansoft'} },
  nl: { label: 'Nederlands', htmlLang: 'nl', eyebrow: 'DIGITALE MARKETING VOOR GROEI', intro: 'Een heldere strategie, bruikbare uitvoering en resultaten die uw bedrijf vooruithelpen.', cta: 'Praat met ons team', strategy: 'Heldere strategie', strategyText: 'Prioriteiten die passen bij uw doelen en klanten.', delivery: 'Gerichte uitvoering', deliveryText: 'Praktisch werk voor zichtbaarheid en conversie.', reporting: 'Meetbare vooruitgang', reportingText: 'Heldere inzichten voor de volgende stap.', topics: {'/':'Bureau voor digitale marketing', '/about-us/':'Over Sansoft', '/seo-services/':'SEO-diensten', '/local-seo-services/':'Lokale SEO', '/google-ads-management-services/':'Google Ads-beheer', '/social-media-management-services/':'Socialmediabeheer', '/web-development-services/':'Webontwikkeling', '/contact-us/':'Neem contact op met Sansoft'} },
  pl: { label: 'Polski', htmlLang: 'pl', eyebrow: 'MARKETING CYFROWY DLA ROZWOJU', intro: 'Jasna strategia, użyteczne wdrożenie i wyniki, które pomagają Twojej firmie iść naprzód.', cta: 'Porozmawiaj z naszym zespołem', strategy: 'Jasna strategia', strategyText: 'Priorytety dopasowane do celów i klientów.', delivery: 'Skupione wdrożenie', deliveryText: 'Praktyczna praca dla widoczności i konwersji.', reporting: 'Mierzalny postęp', reportingText: 'Jasne informacje do kolejnych decyzji.', topics: {'/':'Agencja marketingu cyfrowego', '/about-us/':'O Sansoft', '/seo-services/':'Usługi SEO', '/local-seo-services/':'Lokalne SEO', '/google-ads-management-services/':'Zarządzanie Google Ads', '/social-media-management-services/':'Zarządzanie mediami społecznościowymi', '/web-development-services/':'Tworzenie stron internetowych', '/contact-us/':'Skontaktuj się z Sansoft'} },
  da: { label: 'Dansk', htmlLang: 'da', eyebrow: 'DIGITAL MARKEDSFØRING TIL VÆKST', intro: 'Klar strategi, nyttig udførelse og resultater, der hjælper din virksomhed fremad.', cta: 'Tal med vores team', strategy: 'Klar strategi', strategyText: 'Prioriteter, der matcher dine mål og kunder.', delivery: 'Fokuseret udførelse', deliveryText: 'Praktisk arbejde for synlighed og konvertering.', reporting: 'Målbar fremgang', reportingText: 'Klar indsigt til næste skridt.', topics: {'/':'Digitalt marketingbureau', '/about-us/':'Om Sansoft', '/seo-services/':'SEO-services', '/local-seo-services/':'Lokal SEO', '/google-ads-management-services/':'Google Ads-administration', '/social-media-management-services/':'Administration af sociale medier', '/web-development-services/':'Webudvikling', '/contact-us/':'Kontakt Sansoft'} },
  id: { label: 'Bahasa Indonesia', htmlLang: 'id', eyebrow: 'PEMASARAN DIGITAL UNTUK PERTUMBUHAN', intro: 'Strategi yang jelas, pelaksanaan yang berguna, dan hasil yang membantu bisnis Anda maju.', cta: 'Bicara dengan tim kami', strategy: 'Strategi yang jelas', strategyText: 'Prioritas yang sesuai dengan tujuan dan pelanggan Anda.', delivery: 'Pelaksanaan terfokus', deliveryText: 'Kerja praktis untuk visibilitas dan konversi.', reporting: 'Kemajuan terukur', reportingText: 'Wawasan jelas untuk langkah berikutnya.', topics: {'/':'Agensi pemasaran digital', '/about-us/':'Tentang Sansoft', '/seo-services/':'Layanan SEO', '/local-seo-services/':'SEO lokal', '/google-ads-management-services/':'Manajemen Google Ads', '/social-media-management-services/':'Manajemen media sosial', '/web-development-services/':'Pengembangan web', '/contact-us/':'Hubungi Sansoft'} },
  tr: { label: 'Türkçe', htmlLang: 'tr', eyebrow: 'BÜYÜME İÇİN DİJİTAL PAZARLAMA', intro: 'İşletmenizi ileri taşıyan net strateji, faydalı uygulama ve sonuçlar.', cta: 'Ekibimizle konuşun', strategy: 'Net strateji', strategyText: 'Hedeflerinize ve müşterilerinize uygun öncelikler.', delivery: 'Odaklı uygulama', deliveryText: 'Görünürlük ve dönüşüm için pratik çalışma.', reporting: 'Ölçülebilir ilerleme', reportingText: 'Sonraki karar için net içgörüler.', topics: {'/':'Dijital pazarlama ajansı', '/about-us/':'Sansoft hakkında', '/seo-services/':'SEO hizmetleri', '/local-seo-services/':'Yerel SEO', '/google-ads-management-services/':'Google Ads yönetimi', '/social-media-management-services/':'Sosyal medya yönetimi', '/web-development-services/':'Web geliştirme', '/contact-us/':'Sansoft ile iletişime geçin'} },
  ja: { label: '日本語', htmlLang: 'ja', eyebrow: '成長のためのデジタルマーケティング', intro: '明確な戦略、実用的な実行、そしてビジネスを前進させる成果を提供します。', cta: 'チームに相談する', strategy: '明確な戦略', strategyText: '目標と顧客に合った優先順位を設定します。', delivery: '的を絞った実行', deliveryText: '可視性とコンバージョンを高める実践的な取り組み。', reporting: '測定可能な進捗', reportingText: '次の判断のための明確な洞察。', topics: {'/':'デジタルマーケティング会社', '/about-us/':'Sansoftについて', '/seo-services/':'SEOサービス', '/local-seo-services/':'ローカルSEO', '/google-ads-management-services/':'Google広告運用', '/social-media-management-services/':'ソーシャルメディア運用', '/web-development-services/':'ウェブ開発', '/contact-us/':'Sansoftへのお問い合わせ'} },
  hi: { label: 'हिन्दी', htmlLang: 'hi-IN', eyebrow: 'विकास के लिए डिजिटल मार्केटिंग', intro: 'स्पष्ट रणनीति, उपयोगी क्रियान्वयन और परिणाम जो आपके व्यवसाय को आगे बढ़ाएँ।', cta: 'हमारी टीम से बात करें', strategy: 'स्पष्ट रणनीति', strategyText: 'आपके लक्ष्यों और ग्राहकों के अनुरूप प्राथमिकताएँ।', delivery: 'केंद्रित क्रियान्वयन', deliveryText: 'दृश्यता और रूपांतरण के लिए व्यावहारिक काम।', reporting: 'मापने योग्य प्रगति', reportingText: 'अगले निर्णय के लिए स्पष्ट जानकारी।', topics: {'/':'डिजिटल मार्केटिंग एजेंसी', '/about-us/':'Sansoft के बारे में', '/seo-services/':'SEO सेवाएँ', '/local-seo-services/':'स्थानीय SEO', '/google-ads-management-services/':'Google Ads प्रबंधन', '/social-media-management-services/':'सोशल मीडिया प्रबंधन', '/web-development-services/':'वेबसाइट विकास', '/contact-us/':'Sansoft से संपर्क करें'} },
  mr: { label: 'मराठी', htmlLang: 'mr-IN', eyebrow: 'वाढीसाठी डिजिटल मार्केटिंग', intro: 'स्पष्ट धोरण, उपयुक्त अंमलबजावणी आणि व्यवसायाला पुढे नेणारे परिणाम.', cta: 'आमच्या टीमशी बोला', strategy: 'स्पष्ट धोरण', strategyText: 'तुमच्या उद्दिष्टांशी आणि ग्राहकांशी जुळणारे प्राधान्यक्रम.', delivery: 'केंद्रित अंमलबजावणी', deliveryText: 'दृश्यमानता आणि रूपांतरणासाठी व्यावहारिक काम.', reporting: 'मोजता येणारी प्रगती', reportingText: 'पुढील निर्णयासाठी स्पष्ट माहिती.', topics: {'/':'डिजिटल मार्केटिंग एजन्सी', '/about-us/':'Sansoft विषयी', '/seo-services/':'SEO सेवा', '/local-seo-services/':'स्थानिक SEO', '/google-ads-management-services/':'Google Ads व्यवस्थापन', '/social-media-management-services/':'सोशल मीडिया व्यवस्थापन', '/web-development-services/':'वेबसाइट विकास', '/contact-us/':'Sansoft शी संपर्क साधा'} },
};

export function normalizeLocalizedPath(path: string): LocalizedPath {
  if (!path || path === '/') return '/';
  return ('/' + path.replace(/^\/+|\/+$/g, '') + '/') as LocalizedPath;
}

export function getLocalizedCopy(locale: LocalizedLocale) {
  return copies[locale];
}

const localizedTopicFallbacks: Partial<Record<LocalizedPath, LocalizedPath>> = {
  '/seo-packages/': '/seo-services/',
  '/google-ads-packages/': '/google-ads-management-services/',
  '/social-media-ads-packages/': '/social-media-management-services/',
  '/social-media-posts-design-packages/': '/social-media-management-services/',
  '/custom-service/': '/contact-us/',
};

export function getLocalizedTopic(locale: LocalizedLocale, path: string) {
  const normalized = normalizeLocalizedPath(path);
  const copy = getLocalizedCopy(locale);
  return copy.topics[normalized] || copy.topics[localizedTopicFallbacks[normalized] || '/'] || 'Sansoft';
}

export function hasLocalizedPath(path: string) {
  return localizedPublicPaths.includes(normalizeLocalizedPath(path));
}

export function localizedHref(locale: LocalizedLocale, path: string) {
  const normalized = normalizeLocalizedPath(path);
  return normalized === '/' ? '/' + locale + '/' : '/' + locale + normalized;
}

export function languageAlternates(path: string) {
  const normalized = normalizeLocalizedPath(path);
  const origin = 'https://www.sansoftonline.com';
  return {
    'x-default': origin + normalized,
    en: origin + normalized,
    ...Object.fromEntries(localizedLocales.map((locale) => [locale, origin + localizedHref(locale, normalized)])),
  };
}
