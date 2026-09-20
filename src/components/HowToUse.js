export function HowToUse({ onBuildspace }) {
  return (
    <main className="how-to-page">
      <section className="how-to-hero">
        <span className="eyebrow">Guide</span>
        <h1>Build workflows that stay understandable.</h1>
        <p>Connect inputs, agents, decisions, integrations, and outputs into a visual workflow. Run it when you are ready and inspect every result in the canvas.</p>
        <button className="how-to-cta" type="button" onClick={onBuildspace}>Open buildspace <span>→</span></button>
      </section>
      <section className="workflow-storage-callout">
        <span className="eyebrow">Saved workflows</span>
        <h2>Save it once. Open or run it later.</h2>
        <p>Use <strong>Save workflow</strong> in Buildspace to store the current graph in your account. The My workflows tab lets you reopen the saved canvas after a reload or run that saved version again. Each version receives a digest in PostgreSQL so you can identify the exact definition you stored.</p>
      </section>
      <section className="guide-grid" aria-label="How to use Flow Studio">
        <article className="guide-card">
          <span className="guide-number">01</span>
          <h2>Start with an input</h2>
          <p>Drag an Input node onto the canvas and define the information your workflow starts with.</p>
        </article>
        <article className="guide-card">
          <span className="guide-number">02</span>
          <h2>Add an agent or action</h2>
          <p>Connect an Agent node to reason over your input, then add the integrations needed for the task.</p>
        </article>
        <article className="guide-card">
          <span className="guide-number">03</span>
          <h2>Review and deliver</h2>
          <p>Use conditions, loops, or Human Review when appropriate, then connect the result to an Output node.</p>
        </article>
      </section>
      <section className="capabilities-section">
        <div>
          <span className="eyebrow">Current capabilities</span>
          <h2>Tools your workflow can use</h2>
          <p>Availability depends on the services and credentials configured for this deployment. Human review keeps sensitive actions in your control.</p>
        </div>
        <div className="capability-list">
          <Capability icon="⌕" title="Web search" text="Gather public information and research sources." />
          <Capability icon="▤" title="File tools" text="Read, create, and update workspace files." />
          <Capability icon="✉" title="Gmail" text="Read or send email when a Gmail integration is configured." />
          <Capability icon="⌘" title="GitHub" text="Work with repositories and development workflows when connected." />
          <Capability icon="›_" title="CLI tools" text="Run approved command-line actions through the configured environment." />
        </div>
      </section>
    </main>
  );
}

function Capability({ icon, title, text }) {
  return <article className="capability-card"><span className="capability-icon">{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>;
}
