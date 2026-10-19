export type PackageTier = {
  name: string;
  price: string;
  cadence?: string;
  summary: string;
  highlights: string[];
  details: string[];
  popular?: boolean;
};

export type PackagePageData = {
  slug: string;
  title: string;
  shortTitle: string;
  kicker: string;
  headline: [string, string];
  description: string;
  priceNote: string;
  tiers: PackageTier[];
  comparison: { section?: string; label: string; values: string[] }[];
  faqs: [string, string][];
};

export const packagePages: PackagePageData[] = [
  {
    slug: 'seo-packages', shortTitle: 'SEO', title: 'SEO Packages & Pricing', kicker: 'SEARCH ENGINE OPTIMIZATION',
    headline: ['Choose an SEO plan', 'built for steady growth.'],
    description: 'Compare monthly SEO packages for businesses that want stronger search visibility, a healthier website and a practical path to more qualified traffic.',
    priceNote: 'Prices and monthly scope are shown as listed on Sansoft’s current SEO package page.',
    tiers: [
      { name: 'Basic SEO', price: '$99', cadence: '/ month', summary: 'A focused starting point for smaller websites and clear search priorities.', highlights: ['10 pages optimized', '10 target keywords', '20 first-month backlinks'], details: ['1 blog post each month', '40 backlinks per month from month two', 'Core setup, on-page and technical SEO deliverables'], },
      { name: 'Standard SEO', price: '$199', cadence: '/ month', summary: 'Broader optimization for businesses ready to build momentum.', highlights: ['20 pages optimized', '25 target keywords', '40 first-month backlinks'], details: ['2 blog posts and 2 guest posts each month', '100 backlinks per month from month two', 'GEO for AI search included'], popular: true },
      { name: 'Premium SEO', price: '$299', cadence: '/ month', summary: 'Comprehensive search support across more pages and opportunities.', highlights: ['35 pages optimized', '40 target keywords', '60 first-month backlinks'], details: ['2 blog posts and 3 guest posts each month', '150 backlinks per month from month two', 'GEO for AI search included'] },
    ],
    comparison: [
      { section: 'SEO Setup & Analysis', label: 'Initial ranking report', values: ['Included', 'Included', 'Included'] },
      { section: 'SEO Setup & Analysis', label: 'Google Search Console setup', values: ['Included', 'Included', 'Included'] },
      { section: 'SEO Setup & Analysis', label: 'Google Analytics setup', values: ['Included', 'Included', 'Included'] },
      { section: 'SEO Setup & Analysis', label: 'Google Tag Manager setup', values: ['—', 'Included', 'Included'] },
      { section: 'SEO Setup & Analysis', label: 'Duplicate content check', values: ['—', 'Included', 'Included'] },
      { section: 'SEO Setup & Analysis', label: 'Google penalty check', values: ['—', 'Included', 'Included'] },
      { section: 'SEO Setup & Analysis', label: 'Link popularity analysis', values: ['—', 'Included', 'Included'] },
      { section: 'SEO Setup & Analysis', label: 'Indexed pages analysis', values: ['—', 'Included', 'Included'] },
      { section: 'On-Page SEO', label: 'Pages optimized', values: ['10', '20', '35'] },
      { section: 'On-Page SEO', label: 'Target keywords', values: ['10', '25', '40'] },
      { section: 'On-Page SEO', label: 'Website audit', values: ['Included', 'Included', 'Included'] },
      { section: 'On-Page SEO', label: 'Keyword research', values: ['Up to 10', 'Up to 25', 'Up to 40'] },
      { section: 'On-Page SEO', label: 'SEO-rich title and meta description writing', values: ['Included', 'Included', 'Included'] },
      { section: 'On-Page SEO', label: 'Blog posts per month', values: ['1', '2', '2'] },
      { section: 'On-Page SEO', label: 'H1 and H2 tag optimization', values: ['—', 'Included', 'Included'] },
      { section: 'On-Page SEO', label: 'Schema markup', values: ['Included', 'Included', 'Included'] },
      { section: 'On-Page SEO', label: 'Image alt tag optimization', values: ['—', 'Included', 'Included'] },
      { section: 'On-Page SEO', label: 'Specialized landing page recommendations', values: ['—', 'Included', 'Included'] },
      { section: 'AI SEO', label: 'Generative Engine Optimization (GEO) for AI search', values: ['—', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Website indexation', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'HTTPS review', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Broken link fixes', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Mobile-friendliness checks', values: ['—', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'HTML and XML sitemap setup', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: '5XX error fixes', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Robots.txt optimization', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Canonicalization fixes', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Breadcrumb implementation', values: ['—', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Page URL optimization', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Orphan page identification', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Redirect chain and loop elimination', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Page speed optimization', values: ['—', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Anchor text optimization', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Core Web Vitals improvement', values: ['—', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Duplicate content fixes', values: ['Included', 'Included', 'Included'] },
      { section: 'Technical SEO', label: 'Internal link strategy', values: ['Included', 'Included', 'Included'] },
      { section: 'Off-Page SEO', label: 'Guest posts per month', values: ['—', '2', '3'] },
      { section: 'Off-Page SEO', label: 'Articles per month', values: ['2', '3', '4'] },
      { section: 'Off-Page SEO', label: 'Backlinks · first month', values: ['20', '40', '60'] },
      { section: 'Off-Page SEO', label: 'Backlinks · each month thereafter', values: ['40', '100', '150'] },
    ],
    faqs: [
      ['How do I choose an SEO package?', 'Consider the size of your website, the number of search topics you want to target and the level of technical support you need. We can review your site and help confirm the best fit before work begins.'],
      ['Are SEO packages billed monthly?', 'The listed SEO package prices are monthly. We’ll confirm the selected scope and billing details with you before starting.'],
      ['Can the package be adjusted for my website?', 'Yes. Share your website and priorities with our team. We can discuss how the listed package scope fits your goals and what additional work may be needed.'],
    ],
  },
  {
    slug: 'google-ads-packages', shortTitle: 'Google Ads', title: 'Google Ads Packages & Pricing', kicker: 'PAID SEARCH CAMPAIGNS',
    headline: ['A clearer way to', 'start with Google Ads.'],
    description: 'Compare Google Ads campaign setup and management packages, from a focused launch to a month of ongoing optimization and measurement.',
    priceNote: 'Prices are listed in USD. Delivery time and management duration vary by plan.',
    tiers: [
      { name: 'Basic Google Ads', price: '$100', cadence: ' USD · one-time', summary: 'Campaign setup with a practical starting structure and recommendations.', highlights: ['1 ad group', '10 keywords · 2 ads', '7-day delivery'], details: ['Campaign setup or review', 'Current campaign audit', '1 audience suggestion', '1 bidding and budget suggestion'], },
      { name: 'Standard Google Ads', price: '$300', cadence: ' USD · one-time', summary: 'A more developed campaign with a week of management and tracking setup.', highlights: ['2 ad groups', '20 keywords · 4 ads', '7 days of management'], details: ['Campaign setup or review and audit', 'Optimization after 7 days', '3 ad extensions', 'Analytics integration and conversion tracking', '7-day delivery'], popular: true },
      { name: 'Premium Google Ads', price: '$550', cadence: ' USD · one-time', summary: 'Expanded campaign management with two optimization checkpoints.', highlights: ['3 ad groups', '50 keywords · 6 ads', '30 days of management'], details: ['Campaign setup or review and audit', 'Optimization after 7 and 21 days', '2 audience suggestions · 6 ad extensions', 'Analytics integration and conversion tracking', '10-day delivery'], },
    ],
    comparison: [
      { section: 'Campaign Setup', label: 'Campaign setup or review', values: ['Included', 'Included', 'Included'] },
      { section: 'Campaign Setup', label: 'Current campaign audit', values: ['Included', 'Included', 'Included'] },
      { section: 'Campaign Structure & Targeting', label: 'Ad groups', values: ['1', '2', '3'] },
      { section: 'Campaign Structure & Targeting', label: 'Keywords', values: ['10', '20', '50'] },
      { section: 'Campaign Structure & Targeting', label: 'Ads', values: ['2', '4', '6'] },
      { section: 'Campaign Structure & Targeting', label: 'Audience suggestions', values: ['1', '1', '2'] },
      { section: 'Campaign Structure & Targeting', label: 'Bidding and budget suggestions', values: ['1', '1', '1'] },
      { section: 'Optimization & Measurement', label: 'Campaign optimization', values: ['—', 'After 7 days', 'After 7 & 21 days'] },
      { section: 'Optimization & Measurement', label: 'Ad extensions', values: ['—', '3', '6'] },
      { section: 'Optimization & Measurement', label: 'Campaign management', values: ['0 days', '7 days', '30 days'] },
      { section: 'Optimization & Measurement', label: 'Analytics integration', values: ['—', 'Included', 'Included'] },
      { section: 'Optimization & Measurement', label: 'Conversion tracking setup', values: ['—', 'Included', 'Included'] },
      { section: 'Delivery', label: 'Delivery duration', values: ['7 days', '7 days', '10 days'] },
    ],
    faqs: [
      ['Does the package include my Google Ads budget?', 'The listed package covers the campaign work described. Your advertising spend is separate and is paid to the advertising platform.'],
      ['Which package includes campaign management?', 'The Standard package includes 7 days of management, and Premium includes 30 days. Basic covers campaign setup and suggestions, without ongoing management.'],
      ['Can you work with an existing Google Ads account?', 'The packages include setup or review of a current campaign. Share your account context with our team so we can confirm the access and scope needed.'],
    ],
  },
  {
    slug: 'social-media-ads-packages', shortTitle: 'Social Ads', title: 'Social Media Ads Packages & Pricing', kicker: 'FACEBOOK & INSTAGRAM ADVERTISING',
    headline: ['Reach the right people', 'with a plan that fits.'],
    description: 'Choose a social advertising package for Facebook and Instagram, with campaign setup, ad creative coordination and management options scaled to your needs.',
    priceNote: 'Prices are listed in USD. Advertising spend is separate from the service package.',
    tiers: [
      { name: 'Basic Social Ads', price: '$65', cadence: ' USD · one-time', summary: 'A first campaign setup with a concise set of ads and targeting guidance.', highlights: ['1 Facebook & Instagram campaign', '3 ads', '4-day delivery'], details: ['Campaign setup or review', 'Current campaign audit', '1 audience targeting suggestion'], },
      { name: 'Standard Social Ads', price: '$220', cadence: ' USD · one-time', summary: 'Multiple campaigns plus two weeks of active management.', highlights: ['3 Facebook & Instagram campaigns', '6 ads', '14 days of management'], details: ['Campaign setup or review and audit', '2 optimization checkpoints', 'Audience targeting suggestion', 'Ad analytics, pixel setup and analytics integration', '7-day delivery'], popular: true },
      { name: 'Premium Social Ads', price: '$400', cadence: ' USD · one-time', summary: 'A larger campaign set with a full month of management.', highlights: ['5 Facebook & Instagram campaigns', '10 ads', '30 days of management'], details: ['Campaign setup or review and audit', '3 optimization checkpoints', 'Audience targeting suggestion', 'Ad analytics, pixel setup and analytics integration', '10-day delivery'], },
    ],
    comparison: [
      { section: 'Campaign Setup & Targeting', label: 'Facebook and Instagram campaigns', values: ['1', '3', '5'] },
      { section: 'Campaign Setup & Targeting', label: 'Campaign setup or review', values: ['Included', 'Included', 'Included'] },
      { section: 'Campaign Setup & Targeting', label: 'Current campaign audit', values: ['Included', 'Included', 'Included'] },
      { section: 'Campaign Setup & Targeting', label: 'Audience targeting suggestions', values: ['1', '1', '1'] },
      { section: 'Ads & Optimization', label: 'Ads created', values: ['3', '6', '10'] },
      { section: 'Ads & Optimization', label: 'Optimization checkpoints', values: ['—', '2 · days 7 and 14', '3 · days 7, 14 and 21'] },
      { section: 'Ads & Optimization', label: 'Campaign management', values: ['—', '14 days', '30 days'] },
      { section: 'Measurement & Delivery', label: 'Ads analytics', values: ['—', 'Included', 'Included'] },
      { section: 'Measurement & Delivery', label: 'Pixel setup', values: ['—', 'Included', 'Included'] },
      { section: 'Measurement & Delivery', label: 'Analytics integration', values: ['—', 'Included', 'Included'] },
      { section: 'Measurement & Delivery', label: 'Delivery duration', values: ['4 days', '7 days', '10 days'] },
    ],
    faqs: [
      ['Is the ad spend included in the package?', 'No. The package price covers the listed campaign services. Your media budget is separate and paid to Facebook or Instagram.'],
      ['Which platforms are covered?', 'The listed packages cover Facebook and Instagram campaigns. Tell us if you have additional platform requirements so we can discuss scope.'],
      ['What is included in campaign management?', 'Standard and Premium include the stated management duration, optimization checkpoints and measurement setup shown in the plan comparison.'],
    ],
  },
  {
    slug: 'social-media-posts-design-packages', shortTitle: 'Social Post Design', title: 'Social Media Posts Design Packages', kicker: 'SOCIAL CONTENT & CREATIVE',
    headline: ['Consistent content.', 'Ready to share.'],
    description: 'Compare social post design packages for branded creative, captions and relevant hashtags—from a single trial post to a month’s worth of content.',
    priceNote: 'Prices are listed in USD. Packages cover post creation and the listed content deliverables.',
    tiers: [
      { name: 'Basic', price: '$10', cadence: ' USD · trial', summary: 'Try the service with one post designed for your business.', highlights: ['1 social post', '1 engaging caption', '2 relevant hashtags'], details: ['A simple first step to explore the creative direction'], },
      { name: 'Standard', price: '$55', cadence: ' USD · package', summary: 'A consistent starter set of social creative for two platforms.', highlights: ['10 social posts', '10 engaging captions', '20 relevant hashtags'], details: ['Profile optimization for 2 platforms'], popular: true },
      { name: 'Premium', price: '$150', cadence: ' USD · package', summary: 'A larger batch of social content for a more regular publishing rhythm.', highlights: ['30 social posts', '30 engaging captions', '60 relevant hashtags'], details: ['Profile optimization for 2 platforms'], },
    ],
    comparison: [
      { section: 'Profile Optimization', label: 'Platforms optimized', values: ['—', '2', '2'] },
      { section: 'Post Design & Content', label: 'Posts created', values: ['1', '10', '30'] },
      { section: 'Post Design & Content', label: 'Engaging captions', values: ['1', '10', '30'] },
      { section: 'Post Design & Content', label: 'Relevant hashtags', values: ['2', '20', '60'] },
    ],
    faqs: [
      ['What do I receive with each post?', 'Each package includes the number of social posts, captions and hashtags listed in its comparison. Standard and Premium also include profile optimization for two platforms.'],
      ['Can I use the designs on different social platforms?', 'The packages include the listed content deliverables. Share your preferred platforms and formats with our team so requirements can be confirmed before the work begins.'],
      ['Can the creative match my brand?', 'Yes. Share your brand assets, style preferences and any campaign details when you enquire so the creative can be aligned to your business.'],
    ],
  },
];

export function getPackagePage(slug: string) {
  return packagePages.find((page) => page.slug === slug);
}
