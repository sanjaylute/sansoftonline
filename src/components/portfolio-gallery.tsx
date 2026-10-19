'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Search, X } from 'lucide-react';
import { portfolioProjects, type PortfolioProject } from '@/lib/portfolio-projects';

const pageSize = 12;
const serviceFilters = ['All services', 'SEO', 'Local SEO', 'Flyer design', 'Paid media', 'Social media', 'Web design'];

function websiteFor(title: string) {
  const value = title.trim().replace(/^https?:\/\//, '');
  return /^[\w.-]+\.[a-z]{2,}$/i.test(value) ? `https://${value}` : null;
}

export function PortfolioGallery() {
  const categories = useMemo(() => [...new Set(portfolioProjects.map((project) => project.category))].sort(), []);
  const [category, setCategory] = useState('All industries');
  const [service, setService] = useState('All services');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return portfolioProjects.filter((project) => {
      const matchesCategory = category === 'All industries' || project.category === category;
      const matchesService = service === 'All services' || project.services?.includes(service) === true;
      const matchesQuery = !normalizedQuery || `${project.title} ${project.category} ${(project.services ?? []).join(' ')}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesService && matchesQuery;
    });
  }, [category, service, query]);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [category, service, query]);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selected]);

  const shownProjects = filteredProjects.slice(0, visibleCount);
  const additionalResults = selected?.results?.filter((result) => result.label.trim() && result.value.trim()) ?? [];
  const selectedWebsite = selected ? websiteFor(selected.title) : null;

  return <>
    <main className="portfolio-page">
      <section className="portfolio-hero"><div className="portfolio-wrap portfolio-hero-grid">
        <div className="portfolio-hero-copy"><span className="portfolio-kicker"><i/>SANSOFT · SELECTED WORK</span><h1>Good work.<br/><em>Real-world reach.</em></h1><p>Explore digital projects created for businesses across industries. Open any thumbnail to view the showcase and any results published for that project.</p><a className="portfolio-hero-link" href="#portfolio-projects">Explore projects <ArrowDown size={17}/></a></div>
        <div className="portfolio-hero-aside"><span>BUILT OVER TIME</span><strong>220</strong><b>project showcases</b><div/><strong>30</strong><b>industries represented</b><small>Every project starts with a different business challenge.</small></div>
      </div></section>
      <section className="portfolio-archive" id="portfolio-projects"><div className="portfolio-wrap">
        <div className="portfolio-heading"><div><span className="portfolio-kicker"><i/>THE PORTFOLIO</span><h2>A look at the <em>work.</em></h2><p>Browse projects by service or client industry. Select a thumbnail to see the project snapshot.</p></div><div className="portfolio-count"><b>{filteredProjects.length}</b><span>{service !== 'All services' ? `${service} projects` : category === 'All industries' ? 'projects in the archive' : `${category} projects`}</span></div></div>
        <div className="portfolio-filters" aria-label="Filter portfolio projects by service">{serviceFilters.map((item)=><button key={item} type="button" className={service===item?'is-active':''} aria-pressed={service===item} onClick={()=>setService(item)}>{item}</button>)}</div>
        <div className="portfolio-toolbar"><label className="portfolio-search"><Search size={17}/><span className="visually-hidden">Search projects</span><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search project or industry"/></label><label className="portfolio-filter"><span>Client industry</span><select value={category} onChange={(event)=>setCategory(event.target.value)}><option>All industries</option>{categories.map((item)=><option key={item}>{item}</option>)}</select></label></div>
        {shownProjects.length ? <div className="portfolio-grid">{shownProjects.map((project,index)=><PortfolioCard key={project.id} project={project} index={index} onSelect={()=>setSelected(project)}/>)}</div> : <div className="portfolio-empty"><span>No projects found</span><p>{service !== 'All services' ? `No projects are currently tagged “${service}”. Add this service to matching entries in src/lib/portfolio-data.json to include them here.` : 'Try another search or industry.'}</p><button type="button" onClick={()=>{setQuery('');setCategory('All industries');setService('All services')}}>Reset filters</button></div>}
        {shownProjects.length < filteredProjects.length && <div className="portfolio-load-more"><button type="button" onClick={()=>setVisibleCount((count)=>count+pageSize)}>Load more projects <ArrowDown size={16}/></button><span>Showing {shownProjects.length} of {filteredProjects.length}</span></div>}
      </div></section>
      <section className="portfolio-cta"><div className="portfolio-wrap"><div><span>HAVE A PROJECT IN MIND?</span><h2>Let’s make your next<br/><em>result worth sharing.</em></h2></div><a href="/request-quote/">Start a conversation <ArrowUpRight size={18}/></a></div></section>
    </main>

    {selected && <div className="portfolio-modal-backdrop" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)setSelected(null)}}>
      <section className="portfolio-modal" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title">
        <button type="button" className="portfolio-modal-close" onClick={()=>setSelected(null)} aria-label="Close project details"><X size={20}/></button>
        <div className="portfolio-modal-image"><img src={selected.thumbnail} alt={`${selected.title} project showcase`}/><span>PROJECT SHOWCASE</span></div>
        <div className="portfolio-modal-content"><span className="portfolio-modal-category"><i/>{selected.category}</span><h2 id="portfolio-modal-title">{selected.title}</h2>
          {selected.summary && <p className="portfolio-modal-summary">{selected.summary}</p>}
          <div className="portfolio-modal-results"><span>RESULTS ACHIEVED</span>{additionalResults.length ? <div>{additionalResults.map((result)=><article key={`${result.label}-${result.value}`}><b>{result.value}</b><small>{result.label}</small></article>)}</div> : <p>No project-specific results have been published for this entry yet.</p>}</div>
          {selectedWebsite && <a className="portfolio-modal-website" href={selectedWebsite} target="_blank" rel="noreferrer">Visit project website <ArrowUpRight size={16}/></a>}
        </div>
      </section>
    </div>}
  </>;
}

function PortfolioCard({ project, index, onSelect }: { project: PortfolioProject; index: number; onSelect: () => void }) {
  return <article className={`portfolio-card${index===0?' portfolio-card-featured':''}`}>
    <button type="button" className="portfolio-card-image" onClick={onSelect} aria-label={`Open results for ${project.title}`}><span className="portfolio-image-frame"><img src={project.thumbnail} alt={`${project.title} portfolio thumbnail`} loading="lazy"/></span><span className="portfolio-card-open">View project <ArrowUpRight size={16}/></span></button>
    <div className="portfolio-card-meta"><span>{project.category}</span><span>PROJECT {String(project.id).padStart(5,'0')}</span></div>
    <button type="button" className="portfolio-card-title" onClick={onSelect}>{project.title}</button>
  </article>;
}
