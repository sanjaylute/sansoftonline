import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { PageHero } from '@/components/sections';
import { livePageMetadata } from "@/lib/live-seo-metadata";
export const metadata = livePageMetadata("certifications");

const credentials=[
  {name:'Google Ads Search Certified',detail:'Search advertising strategy, campaign setup, measurement and optimization.',href:'https://skillshop.credential.net/96dfa7fa-9b07-479a-9616-4fba7c1d7c96'},
  {name:'Google Ads Display Certified',detail:'Display campaign planning, management, measurement and optimization.',href:'https://skillshop.credential.net/46226904-5418-48ca-a671-e27308a23d2e'},
  {name:'Google Ads Video Certified',detail:'Video advertising expertise for campaign planning and optimization.'},
  {name:'Google Ads AI-Powered Performance Certified',detail:'AI-powered campaign strategy and performance optimization.'},
  {name:'Google Ads Measurement Certified',detail:'Conversion tracking, measurement solutions and performance insights.',href:'https://skillshop.credential.net/09d3e527-9e9a-491e-bdae-aea666c35f9a'},
  {name:'Google Ads App Certified',detail:'App advertising campaign planning and performance.'},
];
export default function CertificationsPage(){return <main><PageHero kicker="CERTIFICATIONS" title={<>Trusted, trained<br/><em>and ready to grow.</em></>} description="Our team brings recognized digital advertising expertise to the work we do for clients."/><section className="section wrap"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/>GOOGLE ADS CERTIFICATIONS</div><h2>Learning that<br/><em>moves with the work.</em></h2></div><p>Professional development helps us make better decisions, run more considered campaigns and keep improving for our clients.</p></div><div className="cert-grid">{credentials.map(c=><article className="cert-card" key={c.name}><span className="cert-icon"><BadgeCheck/></span><h3>{c.name}</h3><p>{c.detail}</p>{c.href&&<a href={c.href} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={15}/></a>}</article>)}</div></section></main>}
