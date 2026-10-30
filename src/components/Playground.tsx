import { asset, playgroundProjects, type Project } from '../content/projects';
import { Icon } from './Icon';

export function Playground({ onSelect }: { onSelect: (project: Project) => void }) {
  return <section id="playground" className="playground section-wrap" aria-labelledby="playground-title">
    <div className="editorial-heading"><h2 id="playground-title">也做一些，<br />有意思的事。</h2><span>PLAYGROUND</span></div>
    <div className="playground-grid">{playgroundProjects.map(project => <article key={project.id} className={`experiment experiment-${project.slug}`}>
      <button className="experiment-image squircle" onClick={() => onSelect(project)} aria-label={`查看${project.title}案例`}>
        <img src={asset(project.image!.src)} alt={project.image!.alt} width={project.image!.width} height={project.image!.height} loading="lazy" decoding="async" />
        <span className="media-open squircle" aria-hidden="true"><Icon name="arrow" /></span>
      </button>
      <div className="experiment-caption"><h3><button onClick={() => onSelect(project)}>{project.title}</button></h3>
        <a href={project.demoUrl} target="_blank" rel="noreferrer" aria-label={`打开${project.title}在线作品（新标签页）`}><Icon name="arrow" /></a>
      </div><p>{project.line}</p>
    </article>)}</div>
  </section>;
}
