import { useEffect, useState } from 'react';
import { projects, type Project } from '../content/projects';

const fromLocation = () => projects.find(item => window.location.hash === `#project=${item.slug}`) ?? null;

export function useProjectLocation() {
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    const update = () => setProject(fromLocation());
    update();
    window.addEventListener('hashchange', update);
    window.addEventListener('popstate', update);
    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('popstate', update);
    };
  }, []);
  const selectProject = (item: Project) => {
    const url = `#project=${item.slug}`;
    if (project) window.history.replaceState(window.history.state, '', url);
    else window.history.pushState({ portfolioCase: true }, '', url);
    setProject(item);
  };
  const closeProject = () => {
    if (window.history.state?.portfolioCase) window.history.back();
    else {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#works`);
      setProject(null);
    }
  };
  return { project, selectProject, closeProject };
}

