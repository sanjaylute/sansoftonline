import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound(){return <main className="not-found wrap"><div className="eyebrow"><span className="eyebrow-dot"/>404 · PAGE NOT FOUND</div><h1>This page took<br/><em>a different turn.</em></h1><p>The page may have moved or the address may be incorrect.</p><Link className="button button-dark" href="/"><ArrowLeft size={16}/> Back to home</Link></main>}
