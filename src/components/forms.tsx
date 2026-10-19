'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { apiUrl } from '@/lib/api-url';

const serviceOptions = ['SEO & organic growth', 'Paid media & PPC', 'Social media marketing', 'Creative & design', 'Website development', 'Something else'];

export function LeadForm({ mode }: { mode: 'contact' | 'quote' }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const [packageName, setPackageName] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (mode !== 'quote') return;
    const params = new URLSearchParams(window.location.search);
    const selectedPackage = params.get('package') ?? '';
    const serviceParam = (params.get('service') ?? '').toLowerCase();
    const selectedService = serviceParam.includes('seo')
      ? serviceOptions[0]
      : serviceParam.includes('design')
        ? serviceOptions[3]
        : serviceParam.includes('web')
          ? serviceOptions[4]
          : serviceParam.includes('social')
            ? serviceOptions[2]
            : serviceParam.includes('ads')
              ? serviceOptions[1]
              : '';
    setPackageName(selectedPackage);
    setService(selectedService);
    if (selectedPackage) setMessage(`I'm interested in the ${selectedPackage} package.`);
  }, [mode]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    setError('');
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const endpoint = mode === 'quote' ? '/quotes' : '/contact';
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || 'We could not send your message just now. Please try again.');
      }
      setStatus('sent');
      form.reset();
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : '';
      setError(/load failed|failed to fetch|networkerror/i.test(message)
        ? 'Our enquiry service is temporarily unavailable. Please email sales@sansoftonline.com or call +91 82370 66600.'
        : message || 'Unable to send your enquiry.');
      setStatus('error');
    }
  }

  function resetForm() {
    setStatus('idle');
    setPackageName('');
    setService('');
    setMessage('');
  }

  return <div className="form-card">
    <div className="form-card-heading"><span>{mode === 'quote' ? 'YOUR PROJECT' : 'YOUR MESSAGE'}</span><h3>{status === 'sent' ? 'Thanks for reaching out.' : 'A few details to get started.'}</h3><p>{status === 'sent' ? 'Your message is with our team. We’ll be in touch soon.' : 'Fill in the form and our team will be in touch shortly.'}</p></div>
    {status === 'sent' ? <div className="form-success"><CheckCircle2 size={42}/><strong>Enquiry received</strong><p>We appreciate you reaching out. Expect to hear from us within one business day.</p><button type="button" className="text-link" onClick={resetForm}>Send another message <ArrowUpRight size={15}/></button></div> : <form onSubmit={submit}>
      <div className="form-row"><label>Your name *<input name="name" required autoComplete="name" placeholder="Jane Smith"/></label><label>Work email *<input type="email" name="email" required autoComplete="email" placeholder="jane@company.com"/></label></div>
      <div className="form-row"><label>Phone<input name="phone" autoComplete="tel" placeholder="+91 00000 00000"/></label>{mode === 'quote' ? <label>What can we help with? *<select name="service" required value={service} onChange={event => setService(event.target.value)}><option value="" disabled>Select a service</option>{serviceOptions.map(option => <option key={option}>{option}</option>)}</select></label> : <label>Subject *<input name="subject" required placeholder="How can we help?"/></label>}</div>
      {mode === 'quote' && !packageName && <label>Monthly marketing budget<select name="budget" defaultValue=""><option value="" disabled>Select a range (optional)</option><option>Under ₹50,000</option><option>₹50,000 – ₹1,50,000</option><option>₹1,50,000 – ₹5,00,000</option><option>₹5,00,000+</option><option>Not sure yet</option></select></label>}
      {packageName && <p className="package-selection-note">Selected package: <strong>{packageName}</strong></p>}
      <label>Tell us a little more *<textarea name="message" required rows={4} value={message} onChange={event => setMessage(event.target.value)} placeholder="What are you hoping to achieve?"/></label>
      {error && <p className="form-error">{error}</p>}
      <button className="button button-dark form-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <>Sending <LoaderCircle size={16} className="spin"/></> : 'Send enquiry'}{status !== 'sending' && <ArrowUpRight size={16}/>}</button><small className="form-legal">By submitting, you agree that our team may contact you about this enquiry.</small>
    </form>}
  </div>;
}
