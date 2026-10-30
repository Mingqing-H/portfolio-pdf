import { useState } from 'react';
import { asset, projects, type Project, type ProjectGroup } from '../content/projects';
import { Icon } from './Icon';

const filters: ('全部' | ProjectGroup)[] = ['全部', '产品体验', '效率工具', '创意实验'];

export function ProjectArchive({ onSelect }: { onSelect: (project: Project) => void }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('全部');
  const visible = filter === '全部' ? projects : projects.filter(item => item.group === filter);
  return <section id="archive" className="archive section-wrap" aria-labelledby="archive-title">
    <div className="archive-top"><h2 id="archive-title">作品档案<span> / {String(projects.length).padStart(2, '0')}</span></h2>
      <div className="project-filters" role="group" aria-label="按项目类型筛选">{filters.map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
    </div>
    <p className="sr-only" role="status" aria-live="polite">显示{visible.length}个{filter === '全部' ? '' : filter}项目</p>
    <div className="archive-list">{visible.map(project => <button className="archive-row" key={project.id} onClick={() => onSelect(project)}>
      <span className="archive-number">{String(project.id).padStart(2, '0')}</span>
      <span className="archive-thumb squircle" aria-hidden="true">{project.cover
        ? <img src={asset(project.cover)} alt="" width="112" height="70" loading="lazy" decoding="async" />
        : <span>OTP</span>}</span>
      <span className="archive-name">{project.shortTitle}</span><span className="archive-category">{project.category}</span>
      <Icon name="arrow" />
    </button>)}</div>
  </section>;
}
