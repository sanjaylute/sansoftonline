'use client';

import { usePathname } from 'next/navigation';

const whatsappNumber = '918237066600';

export function WhatsAppChat() {
  const pathname = usePathname();
  const pageUrl = `https://www.sansoftonline.com${pathname}`;
  const message = `Hi Sansoft, I’d like to discuss your services. I’m currently viewing ${pageUrl}`;

  return <a
    className="whatsapp-chat"
    data-no-translate="true"
    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Sansoft on WhatsApp"
    title="Chat with us on WhatsApp"
  >
    <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.03 3.2A12.72 12.72 0 0 0 5.05 22.33L3.2 28.8l6.62-1.74a12.75 12.75 0 1 0 6.21-23.86Zm0 23.17a10.33 10.33 0 0 1-5.26-1.44l-.38-.23-3.93 1.03 1.04-3.83-.25-.4A10.34 10.34 0 1 1 16.03 26.37Zm5.67-7.74c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.22-.66.07a8.46 8.46 0 0 1-2.43-1.5 9.14 9.14 0 0 1-1.69-2.1c-.18-.3-.02-.46.13-.6.14-.14.3-.36.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.69-1.65-.94-2.27-.25-.6-.5-.51-.69-.52h-.58c-.2 0-.53.08-.81.38-.28.3-1.07 1.05-1.07 2.55s1.1 2.95 1.25 3.16c.15.2 2.15 3.28 5.2 4.6.72.31 1.29.5 1.73.64.73.23 1.4.2 1.93.12.59-.09 1.79-.73 2.04-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z"/></svg>
    <span>WhatsApp</span>
  </a>;
}
