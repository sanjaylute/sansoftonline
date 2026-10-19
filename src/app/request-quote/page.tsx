import { PageHero } from '@/components/sections';
import { LeadForm } from '@/components/forms';
import { Check, LockKeyhole, Sparkles } from 'lucide-react';
import './request-quote.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

export const metadata = livePageMetadata("request-quote");
const quoteFaqs=[
  ['Is the quote or first consultation free?','Yes. You can tell us about your goals and ask for an initial discussion without obligation. We will review your requirements and outline relevant next steps.'],
  ['What information should I share?', 'Choose the service you are considering and describe what you want to achieve. Your website address, target market and any current challenges are helpful, but you can start with what you know.'],
  ['Do I need to know my budget before submitting?', 'No. The budget field is optional. If you are not sure yet, choose “Not sure yet” and we can discuss a suitable scope after learning more about your needs.'],
  ['What happens after I submit the form?', 'Our team reviews your enquiry and usually responds within one business day during our working hours. We may follow up to clarify your goals before recommending a practical approach.'],
];
export default function QuotePage(){return <main className="request-quote-page"><PageHero kicker="REQUEST A QUOTE" title={<>Tell us what<br/><em>you’re working on.</em></>} description="Share a few details and our team will come back with thoughtful next steps—no pressure, no obligation."/><section className="section wrap quote-layout"><div className="quote-aside"><div className="eyebrow"><span className="eyebrow-dot"/>A USEFUL FIRST CONVERSATION</div><h2>Start with<br/><em>what you need.</em></h2><p>We’ll review your goals and match you with the right people on our team.</p><div className="quote-promise"><Sparkles/><b>What you can expect</b><span><Check/>A tailored first conversation</span><span><Check/>Clear recommendations</span><span><Check/>A no-obligation estimate</span></div><div className="privacy-note"><LockKeyhole/><span>Your details stay private and are only used to respond to your enquiry.</span></div></div><LeadForm mode="quote"/></section><section className="quote-faq"><div className="wrap quote-faq-grid"><div><span className="eyebrow"><span className="eyebrow-dot"/>BEFORE YOU REQUEST A QUOTE</span><h2>Good questions<br/>to <em>start with.</em></h2><p>Know what to expect when you share your project with our team.</p></div><div className="quote-faq-list">{quoteFaqs.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section></main>}
