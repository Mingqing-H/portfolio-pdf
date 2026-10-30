import { githubUrl, pdfUrl, projects } from './content/projects';
import { Icon } from './components/Icon';
import { WorkRail } from './components/WorkRail';
import { ProjectDialog } from './components/ProjectDialog';
import { FeaturedWorks } from './components/FeaturedWorks';
import { ProjectArchive } from './components/ProjectArchive';
import { Playground } from './components/Playground';
import { useProjectLocation } from './hooks/useProjectLocation';


export default function App() {
  const { project, selectProject, closeProject } = useProjectLocation();
  return <>
    <a className="skip-link squircle" href="#works">跳至作品</a>
    <header className="header">
      <a className="brand" href="#top" aria-label="黄明清，返回首页"><span className="monogram">mq.</span><span>黄明清</span></a>
      <nav aria-label="主导航"><a href="#works">作品</a><a href="#playground">实验</a><a href="#about">关于</a></nav>
      <a className="pdf-button squircle" href={pdfUrl} target="_blank" rel="noreferrer">作品集 PDF <Icon name="arrow" /></a>
    </header>
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><h1 id="hero-title"><span>把想法，做成</span><span>真正可用的作品。</span></h1><p>黄明清 · 产品设计、工具开发与 AI 实践</p></div>
        <div className="hand-note" aria-hidden="true"><span>从想法到落地</span><svg viewBox="0 0 90 70" fill="none"><path d="M80 5C38 4 19 26 15 58m-8-11 8 12 11-10" stroke="currentColor" strokeWidth="1.6" pathLength="1" /></svg></div>
        <WorkRail onSelect={selectProject} suspended={project !== null} />
        <div className="hero-action"><a className="primary-button squircle" href="#works">浏览作品 <Icon name="down" /></a></div>
        <div className="hero-baseline"><span>SELECTED WORKS / 2026</span><a href="#archive">{projects.length} 件作品，持续探索 <Icon name="down" /></a></div>
      </section>
      <FeaturedWorks onSelect={selectProject} />
      <ProjectArchive onSelect={selectProject} />
      <Playground onSelect={selectProject} />
      <section id="about" className="about section-wrap" aria-labelledby="about-title"><span className="about-label">关于我</span><div>
        <h2 id="about-title">在想法与实现之间，<br />多走一步。</h2>
        <p>我是黄明清。把产品的判断力与工程的执行力放在一起，从真实问题出发，让想法成为可用、可感知的作品。</p>
        <div className="about-links"><a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">GitHub <Icon name="arrow" /></a><a className="text-link" href={pdfUrl} target="_blank" rel="noreferrer">作品集 PDF <Icon name="arrow" /></a></div>
      </div></section>
    </main>
    <footer className="footer"><a className="monogram" href="#top" aria-label="返回顶部">mq.</a><span>黄明清 © 2026</span><a href="#top">回到顶部 <Icon name="arrow" /></a></footer>
    <ProjectDialog project={project} onClose={closeProject} onSelect={selectProject} />
  </>;
}
