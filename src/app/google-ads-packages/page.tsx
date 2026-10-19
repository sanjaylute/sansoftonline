import type { Metadata } from 'next';
import { PackagePage } from '@/components/package-page';
import { getPackagePage } from '@/lib/package-data';
import '../packages.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

const data = getPackagePage('google-ads-packages')!;
export const metadata = livePageMetadata("google-ads-packages");
export default function GoogleAdsPackagesPage() { return <PackagePage data={data}/>; }
