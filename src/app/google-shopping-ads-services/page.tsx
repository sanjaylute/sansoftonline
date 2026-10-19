import MarketingServicePage from '@/components/marketing-service-page';
import {shoppingAds} from '@/lib/marketing-service-data';
import { livePageMetadata } from "@/lib/live-seo-metadata";
export const metadata = livePageMetadata("google-shopping-ads-services");
export default function GoogleShoppingAdsPage(){return <MarketingServicePage data={shoppingAds}/>}
