import { useState } from 'react';
import { useStore } from '../store';
import { NodeGenerator } from '../components/nodeGenerator';
import { NodeConfigModal } from '../components/nodeConfigModal';

export function HumanInTheLoopNode({ id, data }) {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const decision = data?.decision ?? 'pending';
  const values = { prompt: data?.prompt ?? 'Review this step before continuing.' };

  return (
    <NodeGenerator title="Human in the Loop" inputs={[{ id: 'request' }]} outputs={[{ id: 'approved' }, { id: 'rejected' }]} accentColor="#ec4899">
      <button className="node-config-button nodrag" type="button" onClick={() => setIsConfigOpen(true)}>Configure review</button>
      <div className="decision-buttons nodrag">
        <button type="button" className={decision === 'approved' ? 'selected approve' : 'approve'} onClick={() => updateNodeField(id, 'decision', 'approved')}>Approve</button>
        <button type="button" className={decision === 'rejected' ? 'selected reject' : 'reject'} onClick={() => updateNodeField(id, 'decision', 'rejected')}>Reject</button>
      </div>
      <span className="node-config-hint">Decision: {decision}</span>
      {isConfigOpen && <NodeConfigModal title="Configure human review" description="Write the question shown to the reviewer. Approve or reject on the node; that decision is sent to the backend." values={values} onChange={(field, value) => updateNodeField(id, field, value)} onClose={() => setIsConfigOpen(false)} fields={[{ name: 'prompt', label: 'Review prompt', type: 'textarea', placeholder: 'What should the reviewer confirm?' }]} />}
    </NodeGenerator>
  );
}
