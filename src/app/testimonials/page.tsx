import { PageHero, TestimonialCard, CtaBand } from '@/components/sections';
import { testimonials } from '@/lib/content';
import './testimonials.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";
export const metadata = livePageMetadata("testimonials");

export default function TestimonialsPage(){return <main className="testimonials-page"><PageHero kicker="CLIENT STORIES" title={<>Good work speaks<br/><em>for itself.</em></>} description="We’re grateful to the teams who trust us with their goals. Here are a few words from the people we work with."/><section className="section wrap testimonial-grid testimonial-grid-page">{[...testimonials,...testimonials].map((t,i)=><TestimonialCard key={`${t.name}-${i}`} testimonial={t}/>)}</section><CtaBand/></main>}
