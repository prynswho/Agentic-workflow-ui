// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <aside className="node-sidebar">
          <div className="sidebar-heading">
            <span className="eyebrow">Node library</span>
            <h1>Build your flow</h1>
            <p>Drag a block onto the canvas to get started.</p>
          </div>
          <div className="node-group">
            <span className="group-label">Core</span>
            <DraggableNode type="customInput" label="Input" icon="↳" />
            <DraggableNode type="llm" label="Agent" icon="✦" />
            <DraggableNode type="customOutput" label="Output" icon="↱" />
            <DraggableNode type="loop" label="Loop" icon="↻" />
            <DraggableNode type="conditional" label="Conditional" icon="◇" />
          </div>
          <div className="node-group">
            <span className="group-label">Integrations</span>
            <DraggableNode type="DatabaseQueryNode" label="Database query" icon="◫" />
            <DraggableNode type="HTTPRequestNode" label="HTTP request" icon="↗" />
            <DraggableNode type="ReadEmailNode" label="Read email" icon="✉" />
            <DraggableNode type="SendEmailNode" label="Send email" icon="➤" />
            <DraggableNode type="WebScraperNode" label="Web scraper" icon="◌" />
            <DraggableNode type="humanInTheLoop" label="Human review" icon="✓" />
          </div>
        </aside>
    );
};
