import type { Metadata } from 'next';
import { PackagePage } from '@/components/package-page';
import { getPackagePage } from '@/lib/package-data';
import '../packages.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

const data = getPackagePage('social-media-ads-packages')!;
export const metadata = livePageMetadata("social-media-ads-packages");
export default function SocialMediaAdsPackagesPage() { return <PackagePage data={data}/>; }
