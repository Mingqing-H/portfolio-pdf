import { asset, featuredProjects, type Project } from '../content/projects';
import { Icon } from './Icon';

function ProjectPreview({ project }: { project: Project }) {
  if (project.id === 1) return <div className="scenic-composition" aria-hidden="true">
    <span className="scenic-wordmark">灵境<span>奇旅</span></span>
    <div className="scenic-phones">
      <img src={asset('works/research-scenic-explore.webp')} width="208" height="369" alt="" loading="lazy" decoding="async" />
      <img src={asset('works/research-scenic-walk.webp')} width="208" height="369" alt="" loading="lazy" decoding="async" />
      <img src={asset('works/research-scenic-collection.webp')} width="208" height="369" alt="" loading="lazy" decoding="async" />
    </div>
  </div>;
  const picture = project.image!;
  return <div className="desktop-composition" style={{ backgroundColor: project.color }}>
    <img src={asset(picture.src)} alt={picture.alt} width={picture.width} height={picture.height} loading="lazy" decoding="async" />
  </div>;
}

export function FeaturedWorks({ onSelect }: { onSelect: (project: Project) => void }) {
  return <section id="works" className="featured section-wrap" aria-labelledby="featured-title">
    <div className="editorial-heading"><h2 id="featured-title">从问题出发，<br />让作品回答。</h2><span>SELECTED PROJECTS / 2026</span></div>
    <div className="featured-grid">
      {featuredProjects.map((project, index) => <article className={`feature feature-${index + 1}`} key={project.id}>
        <div className="feature-copy">
          <p className="feature-meta">{String(index + 1).padStart(2, '0')} / {project.group}</p>
          <h3>{project.title}</h3><p className="feature-line">{project.line}</p><p className="feature-status">{project.status}</p>
          <button className="text-link" onClick={() => onSelect(project)} aria-label={`展开${project.title}案例`}>展开案例 <Icon name="arrow" /></button>
        </div>
        <button className="feature-media squircle" onClick={() => onSelect(project)} aria-label={`查看${project.title}项目`}>
          <ProjectPreview project={project} />
          <span className="media-open squircle" aria-hidden="true"><Icon name="arrow" /></span>
        </button>
      </article>)}
    </div>
  </section>;
}
