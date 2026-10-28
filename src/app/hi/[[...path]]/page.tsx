import { LocalizedRoute, localizedMetadata, localizedStaticParams } from '@/components/localized-route';
export const generateStaticParams = localizedStaticParams;
export async function generateMetadata({ params }: { params: Promise<{ path?: string[] }> }) { return localizedMetadata('hi', await params); }
export default async function Page({ params }: { params: Promise<{ path?: string[] }> }) { return <LocalizedRoute locale="hi" params={await params} />; }
