'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, LoaderCircle, X } from 'lucide-react';
import { apiUrl } from '@/lib/api-url';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, callback: (response: Record<string, unknown>) => void) => void };
    paypal?: { Buttons: (options: Record<string, unknown>) => { render: (target: HTMLElement) => Promise<void> } };
  }
}

type Props = { packageName: string; price: string; service: string; custom?: boolean };
const api = apiUrl;

function checkoutError(error: unknown) {
  const message = error instanceof Error ? error.message : '';
  if (error instanceof TypeError || /load failed|failed to fetch|networkerror/i.test(message)) {
    return 'Cannot reach the Laravel checkout API. Start the backend at localhost:8000 and check its FRONTEND_URL setting.';
  }
  return message || 'Unable to start checkout.';
}

function loadScript(src: string) {
  return new Promise<boolean>((resolve) => {
    const found = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (found?.dataset.loaded === 'true') return resolve(true);
    const script = found || document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => { script.dataset.loaded = 'true'; resolve(true); };
    script.onerror = () => resolve(false);
    if (!found) document.body.appendChild(script);
  });
}

export function PackagePurchase({ packageName, price, service, custom = false }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gateway, setGateway] = useState<'razorpay' | 'paypal'>('razorpay');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [comments, setComments] = useState('');
  const amount = customAmount ? `$${customAmount}` : price;
  const orderDetails = { package: service, tier: packageName, name, email, ...(custom ? { customAmount: Number(customAmount), comments } : {}) };

  async function reportFailure(gateway: 'razorpay' | 'paypal', orderId: string | undefined, reason: string) {
    if (!orderId) return;
    try {
      await fetch(`${api}/payments/failure`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ gateway, orderId, reason }) });
    } catch { /* The provider error remains visible even if reporting is unavailable. */ }
  }

  useEffect(() => {
    if (!open || gateway !== 'paypal') return;
    let cancelled = false;
    (async () => {
      const config = await fetch(`${api}/payments/config`).then((r) => r.json()).catch(() => ({}));
      if (!config.paypalClientId) { if (!cancelled) setError('PayPal is not configured yet. Please contact Sansoft to purchase this package.'); return; }
      const loaded = await loadScript(`https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(config.paypalClientId)}&currency=USD&intent=capture`);
      if (!loaded || cancelled || !window.paypal) { if (!cancelled) setError('PayPal could not be loaded. Please try again.'); return; }
      const target = document.getElementById('paypal-buttons');
      if (!target) return;
      target.replaceChildren();
      let activeOrderId: string | undefined;
      await window.paypal.Buttons({
        createOrder: async () => {
          setError(''); setBusy(true);
          try {
            if (custom && (!customAmount || !comments.trim())) throw new Error('Enter the custom amount and service details before paying.');
            const response = await fetch(`${api}/payments/paypal/order`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(orderDetails) });
            const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Could not start PayPal checkout.');
            activeOrderId = data.orderId;
            return data.orderId;
          } catch (e) { setError(checkoutError(e)); throw e; }
          finally { setBusy(false); }
        },
        onApprove: async (data: { orderID: string }) => {
          setBusy(true);
          try {
            const response = await fetch(`${api}/payments/paypal/capture`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ orderId: data.orderID }) });
            const result = await response.json(); if (!response.ok) throw new Error(result.message || 'Payment confirmation failed.');
            setSuccess('Payment received. Sansoft will contact you shortly to begin your package.');
    } catch (e) { await reportFailure('paypal', activeOrderId, e instanceof Error ? e.message : 'PayPal payment confirmation failed.'); setError(checkoutError(e)); }
          finally { setBusy(false); }
        },
        onCancel: (data: { orderID?: string }) => { void reportFailure('paypal', data.orderID || activeOrderId, 'Checkout was cancelled before payment.'); },
        onError: () => { void reportFailure('paypal', activeOrderId, 'PayPal could not complete the payment.'); setError('PayPal could not complete the payment. Please try again.'); },
      }).render(target);
    })();
    return () => { cancelled = true; };
  }, [open, gateway, packageName, service, name, email, custom, customAmount, comments]);

  async function payRazorpay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setSuccess(''); setBusy(true);
    try {
      const loaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!loaded) throw new Error('Razorpay checkout could not be loaded.');
      const response = await fetch(`${api}/payments/razorpay/order`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(orderDetails) });
      const order = await response.json(); if (!response.ok) throw new Error(order.message || 'Could not start Razorpay checkout.');
      if (!window.Razorpay) throw new Error('Razorpay checkout could not be loaded.');
      const checkout = new window.Razorpay({ key: order.key, amount: order.amount, currency: order.currency, name: 'Sansoft', description: `${service} · ${packageName}`, order_id: order.orderId, prefill: { name, email }, theme: { color: '#f57a00' }, handler: async (result: Record<string, string>) => {
        const verified = await fetch(`${api}/payments/razorpay/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(result) });
        const confirmation = await verified.json();
        if (!verified.ok) { await reportFailure('razorpay', order.orderId, confirmation.message || 'Payment verification failed.'); setError(confirmation.message || 'Payment verification failed.'); return; }
        setSuccess('Payment received. Sansoft will contact you shortly to begin your package.');
      } });
      checkout.on('payment.failed', (response) => {
        const details = response.error as { description?: string } | undefined;
        void reportFailure('razorpay', order.orderId, details?.description || 'Razorpay payment failed.');
      });
      checkout.open();
    } catch (e) { setError(checkoutError(e)); }
    finally { setBusy(false); }
  }

  return <>
    <button type="button" className="package-plan-cta package-purchase-trigger" onClick={() => { setOpen(true); setError(''); setSuccess(''); }}>{custom ? 'Continue to secure payment' : 'Purchase this package'} <ArrowUpRight size={17}/></button>
    {open && <div className="purchase-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><section className="purchase-modal" role="dialog" aria-modal="true" aria-labelledby="purchase-title"><button className="purchase-close" aria-label="Close payment window" onClick={() => setOpen(false)}><X size={20}/></button>
      {success ? <div className="purchase-success"><span><Check size={24}/></span><h2 id="purchase-title">Thank you.</h2><p>{success}</p><button onClick={() => setOpen(false)}>Close</button></div> : <>
        <span className="package-kicker"><i/>SECURE CHECKOUT</span><h2 id="purchase-title">Purchase {packageName}</h2><p className="purchase-summary">{service} package <strong>{custom ? `${amount} USD` : `${price} USD`}</strong></p>
        <form onSubmit={payRazorpay} className="purchase-form"><label>Your name<input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)}/></label><label>Email address<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}/></label>
          {custom && <><label>Custom amount (USD)<input required type="number" min="1" max="100000" step="1" inputMode="numeric" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)}/></label><label>Service details / comments<textarea required maxLength={2000} value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Tell us what this payment is for."/></label></>}
          <div className="purchase-gateway-choice"><button type="button" className={gateway === 'razorpay' ? 'selected' : ''} onClick={() => { setGateway('razorpay'); setError(''); }}>Razorpay <small>Cards, UPI & more</small></button><button type="button" className={gateway === 'paypal' ? 'selected' : ''} onClick={() => { setGateway('paypal'); setError(''); }}>PayPal <small>Pay securely with PayPal</small></button></div>
          {gateway === 'razorpay' ? <button className="purchase-pay" disabled={busy}>{busy && <LoaderCircle size={17} className="purchase-spinner"/>}Continue to Razorpay <ArrowUpRight size={17}/></button> : <div id="paypal-buttons"/>}
        </form>{busy && gateway === 'paypal' && <p className="purchase-loading">Preparing secure checkout…</p>}{error && <p className="purchase-error" role="alert">{error}</p>}<p className="purchase-legal">Payments are processed securely by the selected payment provider.</p>
      </>}
    </section></div>}
  </>;
}
