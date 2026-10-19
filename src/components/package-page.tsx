import Link from 'next/link';
import { Fragment } from 'react';
import { ArrowDown, ArrowUpRight, Check, Minus, Sparkles } from 'lucide-react';
import { packagePages, type PackagePageData } from '@/lib/package-data';
import { PackagePurchase } from '@/components/package-purchase';

export function PackagePage({ data }: { data: PackagePageData }) {
  return <main className="package-page">
    <section className="package-hero"><div className="package-wrap package-hero-grid">
      <div><span className="package-kicker"><i/>{data.kicker} · PACKAGE OPTIONS</span><h1>{data.headline[0]}<br/><em>{data.headline[1]}</em></h1><p>{data.description}</p><a className="package-hero-link" href="#plans">Compare plans <ArrowDown size={17}/></a></div>
      <aside className="package-hero-note"><span>STRAIGHTFORWARD PRICING</span><strong>Know what’s<br/>included.</strong><p>Choose a starting scope, compare the deliverables, and ask us to confirm the right fit for your goals.</p><div><Sparkles size={18}/><b>Clear scope. Practical next steps.</b></div></aside>
    </div></section>

    <nav className="package-nav" aria-label="Browse service packages"><div className="package-wrap">{packagePages.map(page=><Link key={page.slug} href={`/${page.slug}/`} className={page.slug===data.slug?'is-current':''} aria-current={page.slug===data.slug?'page':undefined}>{page.shortTitle} <ArrowUpRight size={14}/></Link>)}</div></nav>

    <section className="package-plans" id="plans"><div className="package-wrap">
      <div className="package-section-heading"><div><span className="package-kicker"><i/>THE PLANS</span><h2>Find your <em>starting point.</em></h2></div><p>{data.priceNote}</p></div>
      <div className="package-plan-grid">{data.tiers.map((tier,index)=><article key={tier.name} className={`package-plan-card${tier.popular?' is-popular':''}`}>
        {tier.popular&&<span className="package-popular">MOST CHOSEN</span>}
        <div className="package-plan-top"><span>0{index+1} · {data.shortTitle.toUpperCase()}</span><h3>{tier.name}</h3><p>{tier.summary}</p></div>
        <div className="package-price"><strong>{tier.price}</strong><span>{tier.cadence}</span></div>
        <div className="package-plan-highlights">{tier.highlights.map(item=><span key={item}><Check size={15}/>{item}</span>)}</div>
        <div className="package-includes"><span>IN THIS PACKAGE</span>{tier.details.map(item=><p key={item}><i/>{item}</p>)}</div>
        <PackagePurchase packageName={tier.name} price={tier.price} service={data.shortTitle}/>
      </article>)}</div>
    </div></section>

    <section className="package-comparison"><div className="package-wrap">
      <div className="package-section-heading"><div><span className="package-kicker"><i/>SIDE-BY-SIDE</span><h2>Compare what’s <em>included.</em></h2></div><p>Review the scope across all three plans. We’ll confirm requirements and any platform-specific details with you before work begins.</p></div>
      <div className="package-table-scroll"><table><colgroup><col style={{width:'34%'}}/>{data.tiers.map(tier=><col key={tier.name} style={{width:`${66/data.tiers.length}%`}}/>)}</colgroup><thead><tr><th scope="col">Deliverable</th>{data.tiers.map(tier=><th scope="col" key={tier.name}>{tier.name}<small>{tier.price}{tier.cadence?.includes('one-time')?tier.cadence:tier.cadence?.startsWith('/ month')? ' / month':''}</small></th>)}</tr></thead><tbody>{data.comparison.map((row,index)=><Fragment key={row.label}>{row.section&&row.section!==data.comparison[index-1]?.section&&<tr className="package-table-section"><th colSpan={data.tiers.length+1} scope="colgroup">{row.section}</th></tr>}<tr><th scope="row">{row.label}</th>{row.values.map((value,valueIndex)=><td key={`${row.label}-${valueIndex}`}>{value==='—'?<Minus size={16} aria-label="Not included"/>:value==='Included'?<Check className="package-included-check" size={19} strokeWidth={3} aria-label="Included"/>:value}</td>)}</tr></Fragment>)}<tr className="package-table-purchase"><th scope="row">Choose your plan</th>{data.tiers.map(tier=><td key={tier.name}><PackagePurchase packageName={tier.name} price={tier.price} service={data.shortTitle}/></td>)}</tr></tbody></table></div>
      <p className="package-price-note">Package inclusions are based on the plans listed on Sansoft’s package pages. Final scope, timing and account access are confirmed before kickoff.</p>
    </div></section>

    <section className="package-faq"><div className="package-wrap package-faq-grid"><div><span className="package-kicker"><i/>COMMON QUESTIONS</span><h2>Before you<br/><em>choose a plan.</em></h2><p>Need help deciding? Share your goals and we’ll talk through the options with you.</p></div><div className="package-faq-list">{data.faqs.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="package-cta"><div className="package-wrap"><div><span>NOT SURE WHICH PACKAGE FITS?</span><h2>Let’s find a useful<br/><em>way forward.</em></h2><p>Tell us what you’re trying to achieve. We’ll help you choose a starting scope.</p></div><Link href={`/request-quote/?service=${encodeURIComponent(data.shortTitle)}`}>Talk through your goals <ArrowUpRight size={18}/></Link></div></section>
  </main>;
}
