import { useEffect, useRef, useState } from 'react';
import { asset, pdfUrl, projects, type Project, type ProjectImage } from '../content/projects';
import { Icon } from './Icon';
import './project-dialog.css';

type ProjectDialogProps = {
  project: Project | null;
  onClose: () => void;
  onSelect: (project: Project) => void;
};

const mediaUrl = (src: string) => /^https?:\/\//.test(src) ? src : asset(src);

function CaseImage({ image, primary = false }: { image: ProjectImage; primary?: boolean }) {
  return <figure className={'case-figure' + (primary ? ' case-figure-primary' : '') + (image.height > image.width * 1.2 ? ' case-portrait' : '')}>
    <a href={mediaUrl(image.src)} target="_blank" rel="noreferrer" aria-label={`放大查看：${image.alt}`}>
      <img src={mediaUrl(image.src)} alt={image.alt} width={image.width} height={image.height}
        loading={primary ? 'eager' : 'lazy'} decoding="async" />
    </a>
    {image.caption && <figcaption>{image.caption}</figcaption>}
  </figure>;
}

function CaseVideo({ src, title, poster }: { src: string; title: string; poster?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = video.current;
    if (element) { element.src = mediaUrl(src); element.load(); }
    return () => {
      if (!element) return;
      element.pause();
      element.removeAttribute('src');
      element.load();
    };
  }, [src]);
  return <div className="case-video">
    <video ref={video} src={mediaUrl(src)} poster={poster ? mediaUrl(poster) : undefined} controls autoPlay playsInline preload="metadata"
      aria-label={`${title}演示视频`} onError={() => setFailed(true)} />
    {failed && <p role="status">视频暂时无法播放。<a href={mediaUrl(src)} target="_blank" rel="noreferrer">打开视频文件</a></p>}
  </div>;
}

function CaseArticle({ project, onSelect }: { project: Project; onSelect: (project: Project) => void }) {
  const [playVideo, setPlayVideo] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const index = projects.findIndex(item => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];

  async function copyLink() {
    setCopyState('copying');
    const url = new URL(window.location.href);
    url.hash = `project=${encodeURIComponent(project.slug)}`;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url.href);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  }

  return <article className="case-article">
    <div className="case-intro">
      <p className="case-category">{project.category}</p>
      <h2 id="case-title" tabIndex={-1}>{project.title}</h2>
      <p className="case-line">{project.line}</p>
      <p className="case-description">{project.description}</p>
      <div className="case-meta">
        <span>{project.role}</span><span>{project.status}</span>
        <span className="case-tech">{project.tech.join(' · ')}</span>
      </div>
      <div className="case-actions">
        {project.demoUrl && <a className="case-action case-action-primary" href={project.demoUrl} target="_blank" rel="noreferrer">打开作品 <Icon name="arrow" /></a>}
        {project.sourceUrl && <a className="case-action" href={project.sourceUrl} target="_blank" rel="noreferrer">查看项目 <Icon name="arrow" /></a>}
        {project.pdfPage && <a className="case-action" href={`${pdfUrl}#page=${project.pdfPage}`} target="_blank" rel="noreferrer">查看 PDF <Icon name="arrow" /></a>}
        <button className="case-action case-share" onClick={copyLink} disabled={copyState === 'copying'}>
          {copyState === 'copied' ? '链接已复制' : copyState === 'copying' ? '正在复制' : '复制案例链接'}
        </button>
      </div>
      <span className={`case-copy-status${copyState === 'failed' ? ' is-error' : ''}`} role="status" aria-live="polite">
        {copyState === 'copied' ? '已复制，可分享这个案例。' : copyState === 'failed' ? '未能复制，请复制浏览器地址栏链接。' : ''}
      </span>
    </div>
    {project.image && <div className="case-lead-image" style={{ backgroundColor: project.color }}><CaseImage image={project.image} primary /></div>}
    <div className="case-reading">
      {project.chapters.map((chapter, chapterIndex) => <section className="case-chapter" key={chapter.title} aria-labelledby={`chapter-${project.slug}-${chapterIndex}`}>
        <h3 id={`chapter-${project.slug}-${chapterIndex}`}>{chapter.title}</h3>
        <div>{chapter.text.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>)}
      {project.gallery?.length ? <div className="case-gallery">{project.gallery.map(image => <CaseImage key={image.src} image={image} />)}</div> : null}
      {project.video && <section className="case-film" aria-label="项目演示">
        {playVideo ? <CaseVideo src={project.video} title={project.title} poster={project.videoPoster} /> : <button className={`case-play${project.videoPoster ? ' has-poster' : ''}`} onClick={() => setPlayVideo(true)}>{project.videoPoster && <img src={mediaUrl(project.videoPoster)} alt="" width="1280" height="676" loading="lazy" />}<span className="case-play-label"><Icon name="play" /><span>播放项目演示</span></span></button>}
      </section>}
      <section className="case-boundary" aria-labelledby={`boundary-${project.slug}`}>
        <h3 id={`boundary-${project.slug}`}>项目边界</h3><p>{project.boundary}</p>
      </section>
    </div>
    {nextProject && nextProject.slug !== project.slug && <button className="case-next" onClick={() => onSelect(nextProject)}>
      <span><span className="case-next-label">下一件作品</span><span className="case-next-title">{nextProject.title}</span></span><Icon name="arrow" />
    </button>}
  </article>;
}

export function ProjectDialog({ project, onClose, onSelect }: ProjectDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = project !== null;

  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    if (!element) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = 'hidden';
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (trigger?.isConnected && !element.contains(trigger)) trigger.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    const element = dialog.current;
    if (!project || !element?.open) return;
    element.scrollTop = 0;
    element.querySelector<HTMLElement>('#case-title')?.focus({ preventScroll: true });
  }, [project?.slug]);

  return <dialog ref={dialog} className="case-dialog" aria-labelledby="case-title" onCancel={event => { event.preventDefault(); onClose(); }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], video[controls], [tabindex]:not([tabindex="-1"])')]
        .filter(element => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) { event.preventDefault(); return; }
      const active = document.activeElement as HTMLElement;
      if (!controls.includes(active)) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
      else if (event.shiftKey && active === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && active === last) { event.preventDefault(); first.focus(); }
    }}
    onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }}>
    {project && <>
      <div className="case-toolbar"><span>{String(project.id).padStart(2, '0')} / {project.group}</span><button className="case-close" onClick={onClose} aria-label="关闭案例"><Icon name="close" /></button></div>
      <CaseArticle key={project.slug} project={project} onSelect={onSelect} />
    </>}
  </dialog>;
}
