import MarketingServicePage from '@/components/marketing-service-page';
import {searchAds} from '@/lib/marketing-service-data';
import { livePageMetadata } from "@/lib/live-seo-metadata";
export const metadata = livePageMetadata("google-search-ads-services");
export default function GoogleSearchAdsPage(){return <MarketingServicePage data={searchAds}/>}
