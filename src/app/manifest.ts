import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sansoft',
    short_name: 'Sansoft',
    description: 'Digital marketing that moves business forward.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { src: '/favicon.png', sizes: '384x384', type: 'image/png' },
    ],
  };
}
