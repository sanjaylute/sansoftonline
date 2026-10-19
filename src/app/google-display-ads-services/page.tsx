import MarketingServicePage from '@/components/marketing-service-page';
import {displayAds} from '@/lib/marketing-service-data';
import { livePageMetadata } from "@/lib/live-seo-metadata";
export const metadata = livePageMetadata("google-display-ads-services");
export default function GoogleDisplayAdsPage(){return <MarketingServicePage data={displayAds}/>}
