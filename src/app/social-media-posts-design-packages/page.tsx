import type { Metadata } from 'next';
import { PackagePage } from '@/components/package-page';
import { getPackagePage } from '@/lib/package-data';
import '../packages.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

const data = getPackagePage('social-media-posts-design-packages')!;
export const metadata = livePageMetadata("social-media-posts-design-packages");
export default function SocialMediaPostsDesignPackagesPage() { return <PackagePage data={data}/>; }
