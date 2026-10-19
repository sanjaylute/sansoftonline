import type { LucideIcon } from 'lucide-react';
import { cmsSeoDescription } from '@/lib/cms-seo-copy';
export default function SeoDeliverableCard({icon:Icon,title,text}:{icon:LucideIcon,title:string,text:string}){const description=text.includes('are reviewed against how ')||text.includes('is reviewed against how ')?cmsSeoDescription(title,text):text;return <article className="seo-deliverable-card"><span className="seo-deliverable-icon"><Icon size={22} strokeWidth={1.8}/></span><div><h3>{title}</h3><p>{description}</p></div></article>}
