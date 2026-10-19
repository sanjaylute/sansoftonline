import type { Metadata } from 'next';
import { PackagePage } from '@/components/package-page';
import { getPackagePage } from '@/lib/package-data';
import '../packages.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

const data = getPackagePage('seo-packages')!;
export const metadata = livePageMetadata("seo-packages");
export default function SeoPackagesPage() { return <PackagePage data={data}/>; }
