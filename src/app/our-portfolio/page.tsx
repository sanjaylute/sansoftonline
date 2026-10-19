import type { Metadata } from 'next';
import { PortfolioGallery } from '@/components/portfolio-gallery';
import './portfolio-page.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

export const metadata = livePageMetadata("our-portfolio");

export default function PortfolioPage() {
  return <PortfolioGallery/>;
}
