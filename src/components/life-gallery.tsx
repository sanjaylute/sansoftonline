'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const moments = [
  { image: '/about-timeline/early-team.jpg', alt: 'Sansoft colleagues gathered in the early office', title: 'Where it began', caption: 'The people behind Sansoft’s early years.', category: 'Our people', year: '2003' },
  { image: '/about-timeline/us-office.jpg', alt: 'Sansoft founder during a visit to the United States', title: 'New horizons', caption: 'A chapter that opened up international collaboration.', category: 'Milestones', year: '2011' },
  { image: '/about-timeline/office-construction.jpg', alt: 'Construction of Sansoft’s future office in Nagpur', title: 'Building a home', caption: 'A new workplace taking shape in Beltarodi, Nagpur.', category: 'Workplaces', year: '2012' },
  { image: '/about-timeline/owned-office.jpg', alt: 'Sansoft’s own office building in Nagpur', title: 'A place of our own', caption: 'A permanent home for the team and the work ahead.', category: 'Workplaces', year: '2013' },
  { image: '/about-timeline/renovated-office.jpg', alt: 'The renovated Sansoft workplace', title: 'A fresh chapter', caption: 'A renewed space for the next stage of Sansoft.', category: 'Workplaces', year: '2025' },
];

const filters = ['All moments', 'Our people', 'Workplaces', 'Milestones'];

export function LifeGallery() {
  const [filter, setFilter] = useState('All moments');
  const [selected, setSelected] = useState<number | null>(null);
  const shown = moments.map((item, index) => ({ ...item, index })).filter(item => filter === 'All moments' || item.category === filter);
  const current = selected === null ? null : moments[selected];

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowRight') setSelected(index => index === null ? null : (index + 1) % moments.length);
      if (event.key === 'ArrowLeft') setSelected(index => index === null ? null : (index - 1 + moments.length) % moments.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); };
  }, [selected]);

  return <section className="life-gallery-section" id="moments"><div className="life-wrap">
    <div className="life-gallery-head"><div><span className="life-kicker"><i/>A FEW MOMENTS ALONG THE WAY</span><h2>People, places<br/>and <em>progress.</em></h2></div><p>A photo journal of the team and workplaces that have shaped Sansoft through the years.</p></div>
    <div className="life-filters" aria-label="Filter life at Sansoft photos">{filters.map(item => <button type="button" key={item} className={filter === item ? 'is-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
    <div className="life-gallery-grid">{shown.map((item, index) => <button type="button" className={`life-gallery-card${index === 0 ? ' is-featured' : ''}`} key={item.image} onClick={() => setSelected(item.index)} aria-label={`View ${item.title}`}><span className="life-gallery-image"><img src={item.image} alt={item.alt} loading="lazy"/><i>{item.year}</i><span>VIEW MOMENT <ArrowRight size={15}/></span></span><span className="life-gallery-meta"><small>{item.category}</small><strong>{item.title}</strong><span>{item.caption}</span></span></button>)}</div>
  </div>
  {current && <div className="life-lightbox" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}><section role="dialog" aria-modal="true" aria-label={`${current.title}, ${current.year}`} className="life-lightbox-panel"><button type="button" className="life-lightbox-close" onClick={() => setSelected(null)} aria-label="Close photo"><X/></button><button type="button" className="life-lightbox-arrow life-lightbox-prev" onClick={() => setSelected(index => index === null ? null : (index - 1 + moments.length) % moments.length)} aria-label="Previous photo"><ArrowLeft/></button><img src={current.image} alt={current.alt}/><button type="button" className="life-lightbox-arrow life-lightbox-next" onClick={() => setSelected(index => index === null ? null : (index + 1) % moments.length)} aria-label="Next photo"><ArrowRight/></button><div className="life-lightbox-caption"><span>{current.category} · {current.year}</span><strong>{current.title}</strong><p>{current.caption}</p></div></section></div>}
  </section>;
}
