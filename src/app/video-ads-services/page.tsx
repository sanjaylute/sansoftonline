import MarketingServicePage from '@/components/marketing-service-page';
import {videoAds} from '@/lib/marketing-service-data';
import { livePageMetadata } from "@/lib/live-seo-metadata";
export const metadata = livePageMetadata("video-ads-services");
export default function VideoAdsPage(){return <MarketingServicePage data={videoAds}/>}
