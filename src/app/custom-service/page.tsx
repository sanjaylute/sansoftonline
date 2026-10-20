import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, MessageSquareText, ShieldCheck } from 'lucide-react';
import { PackagePurchase } from '@/components/package-purchase';
import '../packages.css';

export const metadata: Metadata = {
  title: 'Custom Service Payment | Sansoft',
  description: 'Make a secure custom payment for an agreed Sansoft service scope using Razorpay or PayPal.',
  alternates: { canonical: '/custom-service/' },
};

export default function CustomServicePage() {
  return <main className="package-page">
    <section className="package-hero"><div className="package-wrap package-hero-grid">
      <div><span className="package-kicker"><i/>CUSTOM SERVICE PAYMENT</span><h1>A scope made<br/><em>for your business.</em></h1><p>Use this secure checkout when our team has agreed a custom service, deliverable or project payment with you. Enter the confirmed amount and include a short note so we can match your payment to the right work.</p><a className="package-hero-link" href="#payment">Make a secure payment <ArrowDown size={17}/></a></div>
      <aside className="package-hero-note"><span>FLEXIBLE, SECURE PAYMENT</span><strong>Pay for the work<br/>you agreed.</strong><p>Your service details stay with the payment record, helping our team start the right next step without delay.</p><div><ShieldCheck size={18}/><b>Razorpay and PayPal accepted.</b></div></aside>
    </div></section>

    <section className="package-plans" id="payment"><div className="package-wrap custom-service-layout">
      <div className="package-section-heading"><div><span className="package-kicker"><i/>CUSTOM CHECKOUT</span><h2>Enter the amount<br/><em>we agreed.</em></h2></div><p>Your email address and service note are required, so we can send a receipt and connect your payment with the agreed scope.</p></div>
      <article className="package-plan-card is-popular custom-service-card"><div className="package-plan-top"><span>CUSTOM SERVICE</span><h3>Secure project payment</h3><p>For custom work, additional deliverables, deposits or an agreed service scope.</p></div><div className="package-plan-highlights"><span><Check size={15}/>Set the agreed amount in USD</span><span><Check size={15}/>Add the service details or comments</span><span><Check size={15}/>Receive a payment email confirmation</span></div><PackagePurchase packageName="Custom Service" price="Custom amount" service="Custom Service" custom/></article>
    </div></section>

    <section className="package-faq"><div className="package-wrap package-faq-grid"><div><span className="package-kicker"><i/>PAYMENT QUESTIONS</span><h2>Clear details.<br/><em>Confident payment.</em></h2><p>We want every custom payment to be easy to understand and simple to trace.</p></div><div className="package-faq-list"><details open><summary>What should I enter in the comments?<span>+</span></summary><p>Include the service name, project or deliverable our team agreed with you. This lets us match your payment to the right work quickly.</p></details><details><summary>Will I receive confirmation?<span>+</span></summary><p>Yes. Once payment is verified, both you and Sansoft receive a confirmation email with the payment reference.</p></details><details><summary>Can I ask a question before paying?<span>+</span></summary><p>Yes. Contact our team if you need to confirm the amount or scope before completing your payment.</p></details></div></div></section>
    <section className="package-cta"><div className="package-wrap"><div><span>NEED TO CONFIRM THE SCOPE?</span><h2>Let’s make sure<br/><em>everything is clear.</em></h2><p>Talk with our team before paying if you have any question about the service or agreed amount.</p></div><Link href="/contact-us/">Contact Sansoft <ArrowUpRight size={18}/></Link></div></section>
  </main>;
}
