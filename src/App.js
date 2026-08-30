import { useEffect, useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

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
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
          </button>
          <SubmitButton />
        </div>
      </header>
      <main className="workspace">
        <PipelineToolbar />
        <PipelineUI theme={theme} />
      </main>
    </div>
  );
}

export default App;
