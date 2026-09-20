import { useCallback, useEffect, useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081';

export function WorkflowLibrary({ onOpen }) {
  const [workflows, setWorkflows] = useState([]);
  const [message, setMessage] = useState('Loading saved workflows…');
  const [runningId, setRunningId] = useState(null);
  const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('flow-studio-auth-token') || ''}` });

  const load = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows`, { headers: headers() });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.detail || 'Unable to load saved workflows.');
      setWorkflows(body.workflows || []);
      setMessage(body.workflows?.length ? '' : 'No saved workflows yet. Build a flow, then choose Save workflow.');
    } catch (error) { setMessage(error.message || 'Unable to load saved workflows.'); }
  }, []);

  useEffect(() => { load(); }, [load]);
  const run = async (workflow) => {
    try {
      setRunningId(workflow.id);
      const response = await fetch(`${API_BASE_URL}/workflows/${workflow.id}/run`, { method: 'POST', headers: headers() });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.detail || 'Unable to run workflow.');
      setMessage(body.status === 'success' ? `“${workflow.name}” completed.` : `“${workflow.name}”: ${body.status}.`);
    } catch (error) { setMessage(error.message || 'Unable to run workflow.'); }
    finally { setRunningId(null); }
  };

  return <main className="workflow-library">
    <section className="workflow-library-heading"><span className="eyebrow">Your library</span><h1>My workflows</h1><p>Saved definitions are stored in your PostgreSQL account and can be opened or run whenever you need them.</p><button type="button" onClick={load}>Refresh</button></section>
    {message && <p className="workflow-library-message">{message}</p>}
    <section className="saved-workflow-grid">{workflows.map((workflow) => <article key={workflow.id} className="saved-workflow-card">
      <span className="eyebrow">Saved workflow</span><h2>{workflow.name}</h2><p>{workflow.definition.nodes.length} nodes · {workflow.definition.edges.length} connections</p><code>{workflow.digest.slice(0, 12)}…</code>
      <div><button type="button" onClick={() => onOpen(workflow.definition)}>Open</button><button type="button" disabled={runningId === workflow.id} onClick={() => run(workflow)}>{runningId === workflow.id ? 'Running…' : 'Run now'}</button></div>
    </article>)}</section>
  </main>;
}
