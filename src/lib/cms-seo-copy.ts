const platformDetails:Record<string,{surface:string;controls:string;performance:string;content:string}>={
  wordpress:{surface:'your WordPress site, including its active theme, plugins and publishing setup',controls:'permalinks, taxonomies, templates and SEO plugin fields',performance:'theme weight, plugin output, caching and mobile rendering',content:'posts, pages, categories and editorial workflows'},
  shopify:{surface:'your Shopify storefront and product catalogue',controls:'product and collection URLs, canonical signals, variants and theme templates',performance:'theme scripts, product imagery and mobile shopping flow',content:'product descriptions, collection copy and buying questions'},
  wix:{surface:'your Wix site and its built-in SEO settings',controls:'page-level SEO fields, URL slugs, Wix sitemap and indexation settings',performance:'mobile layouts, media weight and Wix page rendering',content:'page sections, service information and the questions customers ask'},
  squarespace:{surface:'your Squarespace site, pages and collections',controls:'page metadata, URL slugs, collection structure and platform sitemap',performance:'image weight, responsive layouts and mobile page experience',content:'service, product and editorial pages'},
  cms:{surface:'your CMS website and publishing workflow',controls:'the SEO settings, templates and URL rules available in your platform',performance:'theme or template output, scripts and mobile rendering',content:'the content types and editorial tools your team uses'},
};

export function cmsSeoDescription(title:string, placeholder:string){
  const platform=(placeholder.match(/how (wordpress|shopify|wix|squarespace|cms) handles/i)?.[1]||'cms').toLowerCase();
  const detail=platformDetails[platform]||platformDetails.cms;
  const item=title.toLowerCase();
  if(/audit|foundations|setup|verification/.test(item))return `We review ${detail.surface}, check what search engines can access and identify the fixes most likely to improve discovery, usability and content management.`;
  if(/keyword|product and collection/.test(item))return `We map search demand to the right pages in ${detail.surface}, so collections, products and service pages each have a clear role instead of competing for the same intent.`;
  if(/title|metadata|description|plugin/.test(item))return `We check ${detail.controls} and help your team create distinct page titles and descriptions that accurately represent each page and encourage relevant search visits.`;
  if(/collection|category|taxonomy|permalink|architecture|hierarchy/.test(item))return `We review ${detail.controls}, then recommend a structure that makes important pages easier to reach and helps visitors understand how your products or topics fit together.`;
  if(/canonical|duplicate|url/.test(item))return `We look for duplicate or conflicting URL signals created by ${detail.controls}, and document which page version should be presented as the preferred one.`;
  if(/speed|core web vitals|mobile|experience/.test(item))return `We assess ${detail.performance} on representative pages and prioritize practical improvements that make browsing and buying more dependable on phones and desktops.`;
  if(/schema|structured data|sitemap|indexation/.test(item))return `We validate how ${detail.controls} expose pages to search engines, then recommend appropriate structured data and sitemap improvements for your platform.`;
  if(/image|media|alt text/.test(item))return `We review image sizing, descriptive alt text and media delivery across ${detail.surface}, balancing accessible descriptions with faster page loading.`;
  if(/content|editorial|heading/.test(item))return `We improve ${detail.content} with a clearer hierarchy, useful detail and natural search language, while preserving your brand voice and the customer’s next step.`;
  if(/report|roadmap|recommendation/.test(item))return `You receive a prioritized plan for ${detail.surface}, with implementation notes, owners and a clear way to review what changed and what should happen next.`;
  return `We assess this part of ${detail.surface} in context, explain the opportunity in plain language and recommend platform-appropriate changes your team can act on.`;
}
