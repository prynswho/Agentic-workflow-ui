// toolbar.js

import { useState } from 'react';
import { DraggableNode } from './draggableNode';
import { useStore } from './store';

export const PipelineToolbar = () => {
    const [activeTab, setActiveTab] = useState('library');
    const runResult = useStore((state) => state.runResult);

    return (
        <aside className="node-sidebar">
          <div className="sidebar-tabs" role="tablist" aria-label="Workspace sidebar">
            <button className={activeTab === 'library' ? 'active' : ''} type="button" role="tab" aria-selected={activeTab === 'library'} onClick={() => setActiveTab('library')}>Library</button>
            <button className={activeTab === 'results' ? 'active' : ''} type="button" role="tab" aria-selected={activeTab === 'results'} onClick={() => setActiveTab('results')}>Results</button>
          </div>
          {activeTab === 'library' ? <>
          <div className="sidebar-heading">
            <span className="eyebrow">Node library</span>
            <h1>Build your flow</h1>
            <p>Drag a block onto the canvas to get started.</p>
          </div>
          <div className="node-group">
            <span className="group-label">Core</span>
            <DraggableNode type="customInput" label="Input" icon="↳" />
            <DraggableNode type="llm" label="AI prompt" icon="✦" />
            <DraggableNode type="text" label="Text template" icon="T" />
            <DraggableNode type="customOutput" label="Output" icon="↱" />
          </div>
          <div className="node-group">
            <span className="group-label">Integrations</span>
            <DraggableNode type="DatabaseQueryNode" label="Database query" icon="◫" />
            <DraggableNode type="HTTPRequestNode" label="HTTP request" icon="↗" />
            <DraggableNode type="ReadEmailNode" label="Read email" icon="✉" />
            <DraggableNode type="SendEmailNode" label="Send email" icon="➤" />
            <DraggableNode type="WebScraperNode" label="Web scraper" icon="◌" />
            <DraggableNode type="createFolder" label="Create folder" icon="□" />
          </div>
          </> : <div className="results-panel">
            <span className="eyebrow">Latest run</span>
            <h2>AI result</h2>
            {runResult ? <div className="result-message">{runResult}</div> : <div className="empty-result"><span>✦</span><p>Run a flow to see the latest AI response here.</p></div>}
            <p className="result-note">Results are kept only for this session.</p>
          </div>}
        </aside>
    );
};
