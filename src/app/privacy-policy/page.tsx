import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/sections';
import '../legal-pages.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

export const metadata = livePageMetadata("privacy-policy");

const sections = [
  ['information-we-collect', 'Information we collect'],
  ['how-we-use-information', 'How we use information'],
  ['sharing-and-disclosure', 'Sharing and disclosure'],
  ['cookies-and-browser-storage', 'Cookies and browser storage'],
  ['your-consent', 'Your consent'],
  ['changes-to-this-policy', 'Changes to this policy'],
  ['third-party-websites', 'Third-party websites'],
  ['contact-us', 'Contact us'],
];

export default function PrivacyPage() {
  return <main className="legal-page">
    <PageHero kicker="PRIVACY POLICY" title={<>Your information.<br/><em>Handled with care.</em></>} description="This policy explains how Sansoft handles information shared when you visit our website, send us an enquiry or work with our team."/>
    <section className="legal-document wrap">
      <aside className="legal-contents"><div className="legal-contents-card"><span>ON THIS PAGE</span>{sections.map(([id,label])=><a href={`#${id}`} key={id}>{label}</a>)}<Link className="legal-contact-link" href="/contact-us/">Contact Sansoft <ArrowUpRight size={15}/></Link></div></aside>
      <article className="legal-reading">
        <div className="legal-notice"><span><ShieldCheck size={20}/></span><p>We respect your privacy. We use the details you choose to share to respond to enquiries, support our business and improve the experience on this website.</p></div>
        <section id="information-we-collect"><h2>Information we collect</h2><p>You can browse our website without submitting personal details. If you complete a contact, quote or service enquiry form, we may ask for information such as your name, phone number, city, email address and details relevant to your request. We also receive information you choose to include in your message.</p></section>
        <section id="how-we-use-information"><h2>How we use information</h2><p>Information you provide may be used to respond to your enquiry, prepare a proposal, provide a requested service, improve our website and customer support, personalize your experience, or send service-related and periodic email communications.</p><p>We do not sell or exchange your personal information. You can contact us if you have a question about a communication you received from Sansoft.</p></section>
        <section id="sharing-and-disclosure"><h2>Sharing and disclosure</h2><p>We may share information with trusted third parties that help us operate our website, conduct our business or provide services to you, provided they agree to keep it confidential. We may also disclose information where we believe it is reasonably necessary to comply with the law, enforce our site policies, or protect the rights, property or safety of Sansoft or others.</p><p>Non-personally identifiable visitor information may be used or shared for marketing, advertising or other business purposes.</p></section>
        <section id="cookies-and-browser-storage"><h2>Cookies and browser storage</h2><p>This website uses browser storage to remember that you have seen the cookie notice. Essential technologies may also be used where needed for core website functions. We also use website analytics to understand visits and improve our services. You can revisit this notice at any time using the Cookie settings link in the footer.</p></section>
        <section id="your-consent"><h2>Your consent</h2><p>By accessing or using sansoftonline.com, you consent to this Privacy Policy. If you do not agree with it, please do not submit personal information through this website.</p></section>
        <section id="changes-to-this-policy"><h2>Changes to this policy</h2><p>We may update this Privacy Policy from time to time. Any changes will be posted on this page. Please review this page periodically if you want to stay informed about how the policy applies to your use of our website.</p></section>
        <section id="third-party-websites"><h2>Third-party websites</h2><p>This policy applies to sansoftonline.com and its subdomains. It does not apply to third-party websites linked from our site; their content and privacy practices are outside Sansoft’s control. Please review the relevant third party’s policy when visiting another website.</p></section>
        <section id="contact-us"><h2>Contact us</h2><p>If you have questions about this Privacy Policy or how information you shared with us is handled, contact our team:</p><div className="legal-contact-card"><b>Sansoft Web Technologies Pvt. Ltd.</b><span>64, Beltarodi Road, Manish Nagar, Nagpur, Maharashtra 440037, India</span><a href="tel:+918237066600">+91 82370 66600</a><a href="mailto:sales@sansoftonline.com">sales@sansoftonline.com</a></div></section>
        <div className="legal-crosslink">Also read our <Link href="/terms-and-conditions/">Terms and Conditions <ArrowUpRight size={14}/></Link>.</div>
      </article>
    </section>
  </main>;
}
