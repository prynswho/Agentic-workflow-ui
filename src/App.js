import { useEffect, useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { AuthScreen } from './components/AuthScreen';
import { HowToUse } from './components/HowToUse';
import { SaveWorkflowButton } from './components/SaveWorkflowButton';
import { WorkflowLibrary } from './components/WorkflowLibrary';
import { useStore } from './store';

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('flow-studio-user') || 'null'); } catch { return null; }
  });
  const [view, setView] = useState('buildspace');
  const setPipeline = useStore((state) => state.setPipeline);

  const handleAuthenticated = (authenticatedUser) => {
    localStorage.setItem('flow-studio-user', JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  if (!user) {
    return <div className="app-shell" data-theme={theme}><AuthScreen onAuthenticated={handleAuthenticated} /></div>;
  }

  const logout = () => {
    localStorage.removeItem('flow-studio-auth-token');
    localStorage.removeItem('flow-studio-user');
    setUser(null);
    setView('buildspace');
  };

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">⌘</span>
          <div>
            <strong>Flow Studio</strong>
            <span>Visual automation builder</span>
          </div>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          <button type="button" className={view === 'buildspace' ? 'active' : ''} onClick={() => setView('buildspace')}>Buildspace</button>
          <button type="button" className={view === 'workflows' ? 'active' : ''} onClick={() => setView('workflows')}>My workflows</button>
          <button type="button" className={view === 'guide' ? 'active' : ''} onClick={() => setView('guide')}>How to use</button>
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
          </button>
          {view === 'buildspace' && <SubmitButton />}
          {view === 'buildspace' && <SaveWorkflowButton />}
          <button className="user-menu" type="button" onClick={logout} title="Log out">{user.username?.slice(0, 1).toUpperCase() || 'U'}<span>Log out</span></button>
        </div>
      </header>
      {view === 'buildspace' ? <main className="workspace"><PipelineToolbar /><PipelineUI theme={theme} /></main> : view === 'workflows' ? <WorkflowLibrary onOpen={(pipeline) => { setPipeline(pipeline); setView('buildspace'); }} /> : <HowToUse onBuildspace={() => setView('buildspace')} />}
    </div>
  );
}

export default App;
