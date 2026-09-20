import { useState } from 'react';
import { useStore } from '../store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081';

export function SaveWorkflowButton() {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('flow-studio-auth-token');
    if (!token) { setMessage('Sign in again before saving a workflow.'); return; }
    try {
      setSaving(true);
      setMessage('');
      const response = await fetch(`${API_BASE_URL}/workflows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, pipeline: { nodes, edges } }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.detail || 'Unable to save this workflow.');
      setMessage(`Saved “${body.workflow.name}”.`);
      setName('');
    } catch (error) {
      setMessage(error.message || 'Unable to save this workflow.');
    } finally { setSaving(false); }
  };

  return <div className="save-workflow">
    <button className="save-workflow-trigger" type="button" onClick={() => { setIsOpen(!isOpen); setMessage(''); }}>Save workflow</button>
    {isOpen && <form className="save-workflow-popover" onSubmit={save}>
      <label>Workflow name<input required maxLength="120" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Research and review" /></label>
      {message && <p>{message}</p>}
      <div><button type="button" onClick={() => setIsOpen(false)}>Cancel</button><button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button></div>
    </form>}
  </div>;
}
