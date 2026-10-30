import { useEffect, useRef, useState } from 'react';
import { asset, projects, type Project } from '../content/projects';
import { Icon } from './Icon';
import { curvedWindow } from './railGeometry';

const railProjects = [projects[3], projects[5], projects[1], projects[8], projects[0], projects[9], projects[6], projects[4]];

const renderedProjects = [...railProjects, ...railProjects];

export function WorkRail({ onSelect, suspended }: { onSelect: (project: Project) => void; suspended: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const position = useRef(0);
  const moved = useRef(false);
  const pointerActive = useRef(false);
  const actions = useRef({ step: (_direction: number) => {}, focus: (_index: number) => {} });
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    const element = viewport.current!;
    let width = element.clientWidth;
    let scale = width <= 820 ? width / 640 : Math.min(width / 1440, window.innerHeight / 1080);
    let pitch = 196 * scale;
    let height = element.clientHeight;
    const clock = element.animate([], { duration: 1e9 });
    let frame = 0;
    let last = 0;
    let velocity = 0;
    let dragging = false;
    let focused = !!element.querySelector(':focus-visible');
    let visible = true;
    let pointerX = 0;
    let originX = 0;
    let pointerTime = 0;
    const wrap = (value: number) => {
      const total = pitch * renderedProjects.length;
      return ((value + total / 2) % total + total) % total - total / 2;
    };
    const paint = () => {
      cards.current.forEach((card, index) => {
        if (!card) return;
        const offset = wrap((index - 3) * pitch + position.current);
        if (Math.abs(offset) > width / 2 + 300 * scale) {
          card.style.transform = 'translate3d(-10000px, 0, 0)';
          return;
        }
        const shape = curvedWindow(offset, width / 2, scale);
        card.style.visibility = 'visible';
        card.style.width = `${shape.width}px`;
        card.style.height = `${shape.height}px`;
        card.style.transform = `translate3d(${width / 2 + shape.x - shape.width / 2}px, ${height / 2 + shape.rise - shape.height / 2}px, 0)`;
        card.style.clipPath = shape.clip;
        card.style.setProperty('--caption-inset', `${shape.bottomInset + 14 * scale}px`);
      });
    };
    const canAnimate = () => !paused && !reduced && !suspended && !dragging && !focused && visible && !document.hidden;
    const tick = () => {
      const time = Number(clock.currentTime ?? 0);
      frame = 0;
      if (!canAnimate()) return;
      const delta = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      position.current = wrap(position.current + (-50 * scale + velocity) * delta);
      velocity *= Math.pow(0.05, delta);
      paint();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (canAnimate()) { clock.play(); frame = requestAnimationFrame(tick); }
      else clock.pause();
    };
    actions.current = {
      step(direction) { velocity = 0; position.current += direction * pitch; paint(); },
      focus(index) { velocity = 0; position.current -= wrap((index - 3) * pitch + position.current); paint(); },
    };
    const resize = new ResizeObserver(() => {
      width = element.clientWidth;
      const oldPitch = pitch;
      scale = width <= 820 ? width / 640 : Math.min(width / 1440, window.innerHeight / 1080);
      pitch = 196 * scale;
      position.current *= pitch / oldPitch;
      height = element.clientHeight;
      paint();
    });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const focusIn = () => { focused = !pointerActive.current; sync(); };
    const focusOut = (event: FocusEvent) => { focused = element.contains(event.relatedTarget as Node); sync(); };
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      dragging = true;
      pointerActive.current = true;
      moved.current = false;
      velocity = 0;
      originX = pointerX = event.clientX;
      pointerTime = event.timeStamp;
      sync();
    };
    const move = (event: PointerEvent) => {
      if (!dragging || !event.isPrimary) return;
      const delta = event.clientX - pointerX;
      if (Math.abs(event.clientX - originX) > 6) {
        moved.current = true;
        element.setPointerCapture(event.pointerId);
        element.dataset.dragging = 'true';
      }
      if (moved.current) {
        position.current += delta;
        velocity = Math.max(-1800, Math.min(1800, delta / Math.max((event.timeStamp - pointerTime) / 1000, 0.008)));
        paint();
      }
      pointerX = event.clientX;
      pointerTime = event.timeStamp;
    };
    const up = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      pointerActive.current = false;
      if (event.type === 'pointercancel' || reduced || event.timeStamp - pointerTime > 100) velocity = 0;
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
      delete element.dataset.dragging;
      sync();
    };
    const lostCapture = (event: PointerEvent) => { if (event.target === element) up(event); };
    const events = { pointerdown: down, pointermove: move, pointerup: up, pointercancel: up, lostpointercapture: lostCapture, focusin: focusIn, focusout: focusOut };
    for (const [name, handler] of Object.entries(events)) element.addEventListener(name, handler as EventListener);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pointerup', up);
    resize.observe(element);
    intersection.observe(element);
    paint();
    sync();
    return () => {
      cancelAnimationFrame(frame);
      clock.cancel();
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pointerup', up);
      for (const [name, handler] of Object.entries(events)) element.removeEventListener(name, handler as EventListener);
    };
  }, [paused, reduced, suspended]);

  return <div className="rail-section">
    <p className="sr-only" id="rail-help">左右拖动浏览作品，或使用左右方向键切换；按 Tab 选择作品，按 Enter 打开案例。</p>
    <div ref={viewport} className="rail-viewport" role="region" aria-roledescription="轮播" aria-label="作品展台" aria-describedby="rail-help"
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') moved.current = false;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          const index = cards.current.indexOf(document.activeElement as HTMLButtonElement);
          const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + railProjects.length) % railProjects.length;
          cards.current[next]?.focus({ preventScroll: true });
        }
      }}
      onClickCapture={event => { if (moved.current) { event.preventDefault(); event.stopPropagation(); } }}>
      {renderedProjects.map((item, index) => <button ref={node => { cards.current[index] = node; }} key={index}
        className={`project-card project-card-${item.id}`} style={{ backgroundColor: item.color }}
        tabIndex={index >= railProjects.length ? -1 : 0} aria-hidden={index >= railProjects.length ? true : undefined} aria-label={`查看${item.title}`} onFocus={() => { if (!pointerActive.current) { moved.current = false; actions.current.focus(index); } }} onClick={() => onSelect(item)}>
        <img className="card-image" src={asset(item.cover!)} alt="" width={item.id === 1 ? 208 : 780} height={item.id === 1 ? 369 : 440} draggable="false" />
        <span className="card-caption"><span className="card-open squircle"><Icon name="arrow" /></span><span className="card-title">{item.shortTitle}</span></span>
      </button>)}
    </div>
    <div className="rail-controls" aria-label="展台控制">
      <button className="icon-button squircle" aria-label="上一个作品" onClick={() => actions.current.step(1)}><Icon name="left" /></button>
      <button className="icon-button squircle" aria-label={reduced ? '已遵循减少动态效果设置' : paused ? '播放作品展台' : '暂停作品展台'} aria-pressed={paused || reduced} disabled={reduced} onClick={() => setPaused(value => !value)}><Icon name={paused || reduced ? 'play' : 'pause'} /></button>
      <button className="icon-button squircle" aria-label="下一个作品" onClick={() => actions.current.step(-1)}><Icon name="right" /></button>
    </div>
  </div>;
}
