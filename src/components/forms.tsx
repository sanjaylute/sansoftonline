'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { apiUrl } from '@/lib/api-url';
import styles from './forms.module.css';

const serviceOptions = ['SEO & organic growth', 'Paid media & PPC', 'Social media marketing', 'Creative & design', 'Website development', 'Something else'];
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export function LeadForm({ mode }: { mode: 'contact' | 'quote' }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const [packageName, setPackageName] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileError, setTurnstileError] = useState('');
  const turnstileElement = useRef<HTMLDivElement>(null);
  const turnstileWidget = useRef<string | undefined>(undefined);

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

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileElement.current) return;

    const renderTurnstile = () => {
      if (!window.turnstile || !turnstileElement.current || turnstileWidget.current) return;
      turnstileWidget.current = window.turnstile.render(turnstileElement.current, {
        sitekey: turnstileSiteKey,
        action: mode,
        callback: (token: string) => {
          setTurnstileToken(token);
          setTurnstileError('');
        },
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileError('Security verification could not load. Please refresh and try again.'),
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-turnstile-script]');
    if (existingScript) {
      existingScript.addEventListener('load', renderTurnstile);
      renderTurnstile();
      return () => existingScript.removeEventListener('load', renderTurnstile);
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = 'true';
    script.addEventListener('load', renderTurnstile);
    document.head.appendChild(script);
    return () => {
      script.removeEventListener('load', renderTurnstile);
      if (turnstileWidget.current) {
        window.turnstile?.remove(turnstileWidget.current);
        turnstileWidget.current = undefined;
      }
    };
  }, [mode]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (turnstileSiteKey && !turnstileToken) {
      setError('Please complete the security verification before sending your enquiry.');
      return;
    }
    setStatus('sending');
    setError('');
    const data = Object.fromEntries(new FormData(form).entries());
    if (turnstileToken) data.turnstile_token = turnstileToken;
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
      setTurnstileToken('');
      if (turnstileWidget.current) window.turnstile?.reset(turnstileWidget.current);
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
      {turnstileSiteKey && <div className={styles.turnstileWrap}><div ref={turnstileElement}/>{turnstileError && <p className={`form-error ${styles.turnstileError}`}>{turnstileError}</p>}</div>}
      {error && <p className="form-error">{error}</p>}
      <button className="button button-dark form-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <>Sending <LoaderCircle size={16} className="spin"/></> : 'Send enquiry'}{status !== 'sending' && <ArrowUpRight size={16}/>}</button><small className="form-legal">By submitting, you agree that our team may contact you about this enquiry.</small>
    </form>}
  </div>;
}
