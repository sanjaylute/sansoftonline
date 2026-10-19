import MarketingServicePage from '@/components/marketing-service-page';
import {onPageSeo} from '@/lib/marketing-service-data';
import { livePageMetadata } from "@/lib/live-seo-metadata";
export const metadata = livePageMetadata("on-page-seo-services");
export default function OnPageSeoPage(){return <MarketingServicePage data={onPageSeo}/>}
