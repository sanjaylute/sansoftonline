import Link from 'next/link';
import { ArrowUpRight, FileCheck2 } from 'lucide-react';
import { PageHero } from '@/components/sections';
import '../legal-pages.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

export const metadata = livePageMetadata("terms-and-conditions");

const sections = [
  ['acceptance', 'Acceptance of these terms'],
  ['website-information', 'Website information and use'],
  ['intellectual-property', 'Content and intellectual property'],
  ['external-websites', 'External websites and links'],
  ['privacy', 'Privacy'],
  ['disclaimer', 'Disclaimer'],
  ['refunds', 'Refund policy'],
  ['changes', 'Changes to these terms'],
];

export default function TermsPage() {
  return <main className="legal-page">
    <PageHero kicker="WEBSITE TERMS" title={<>Clear terms.<br/><em>Respectful use.</em></>} description="Please read these terms before using sansoftonline.com. They explain the basic conditions for accessing this website and its information."/>
    <section className="legal-document wrap">
      <aside className="legal-contents"><div className="legal-contents-card"><span>ON THIS PAGE</span>{sections.map(([id,label])=><a href={`#${id}`} key={id}>{label}</a>)}<Link className="legal-contact-link" href="/contact-us/">Contact Sansoft <ArrowUpRight size={15}/></Link></div></aside>
      <article className="legal-reading">
        <div className="legal-notice"><span><FileCheck2 size={20}/></span><p>By accessing this website, you agree to use it lawfully and follow the terms below. Service scope, fees, timelines and project-specific commitments are confirmed separately in an agreed proposal or service agreement.</p></div>
        <section id="acceptance"><h2>Acceptance of these terms</h2><p>By visiting or using sansoftonline.com, you agree to these Terms and Conditions and applicable laws. If you do not agree, do not access or use this website.</p></section>
        <section id="website-information"><h2>Website information and use</h2><p>Information on this website is provided for general information about Sansoft and its services. You are responsible for deciding whether any information, product or service described here meets your requirements. The use of information or services through this website is at your own discretion and risk.</p><p>Do not use the website in a way that disrupts its operation, compromises its security or violates applicable law. Unauthorized use of website content or services may result in legal action.</p></section>
        <section id="intellectual-property"><h2>Content and intellectual property</h2><p>Unless otherwise stated, the content and materials on this website belong to Sansoft Web Technologies Pvt. Ltd. or are used with permission. Do not reproduce, distribute or reuse website materials without prior written permission from Sansoft or the relevant rights holder.</p></section>
        <section id="external-websites"><h2>External websites and links</h2><p>This website may link to third-party websites for convenience. Sansoft does not control or take responsibility for the content, availability, privacy practices or services of external websites. Visiting a third-party site is your choice and subject to that site’s terms.</p><p>Please obtain Sansoft’s prior written consent before creating a link to this website from another website, file or other media.</p></section>
        <section id="privacy"><h2>Privacy</h2><p>Information collected through your use of this website is handled as described in our <Link href="/privacy-policy/">Privacy Policy</Link>.</p></section>
        <section id="disclaimer"><h2>Disclaimer</h2><p>This website and the information and services described on it are provided “as is” to the extent permitted by law. Sansoft disclaims warranties, express or implied, regarding website information and materials. Search engine optimization and digital marketing outcomes depend on many factors; Sansoft does not guarantee specific rankings, results or performance from the use of its services.</p><p>Sansoft is not responsible for loss or damage arising from use of this website or from content on a third-party site, including a site reached through a link from ours, except where responsibility cannot be excluded under applicable law.</p></section>
        <section id="refunds"><h2>Refund policy</h2><p>Payments for completed projects or jobs are non-refundable. Any project-specific payment, cancellation or refund terms agreed in writing between Sansoft and the client will apply to that engagement.</p></section>
        <section id="changes"><h2>Changes to these terms</h2><p>Sansoft may change website content or these terms at any time without prior notice. Updated terms will be posted on this page. Your continued use of the website after a change means you accept the revised terms.</p></section>
        <div className="legal-crosslink">For details about personal information, read our <Link href="/privacy-policy/">Privacy Policy <ArrowUpRight size={14}/></Link>.</div>
      </article>
    </section>
  </main>;
}
