import { useState } from 'react';
import { useStore } from '../store';
import { NodeGenerator } from '../components/nodeGenerator';
import { NodeConfigModal } from '../components/nodeConfigModal';
import axios from 'axios';

export function HumanInTheLoopNode({ id, data }) {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const pendingApproval = useStore((state) => state.pendingApproval);
  const setPendingApproval = useStore((state) => state.setPendingApproval);
  const setRunResult = useStore((state) => state.setRunResult);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const decision = data?.decision ?? 'pending';
  const values = { prompt: data?.prompt ?? 'Review this step before continuing.' };
  const isPendingNode = pendingApproval?.node_id === id;

  const approveOrReject = async (nextDecision) => {
    updateNodeField(id, 'decision', nextDecision);
    if (!isPendingNode) return;

    try {
      setIsSubmitting(true);
      setError('');
      const response = await axios.post(`http://localhost:8081/pipelines/resume/${pendingApproval.run_id}`, { decision: nextDecision });
      if (response.data.status === 'success') {
        const runResults = Object.entries(response.data.results || {})
          .filter(([, output]) => output.status === 'success' && typeof output.results === 'string')
          .map(([node, output]) => ({ node, message: output.results }));
        setRunResult(runResults);
        setPendingApproval(null);
      } else {
        setError(response.data.error || 'The flow could not be resumed.');
      }
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to send the approval decision.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NodeGenerator title="Human in the Loop" inputs={[{ id: 'request' }]} outputs={[{ id: 'approved' }, { id: 'rejected' }]} accentColor="#ec4899">
      <button className="node-config-button nodrag" type="button" onClick={() => setIsConfigOpen(true)}>Configure review</button>
      <div className="decision-buttons nodrag">
        <button type="button" disabled={isSubmitting} className={decision === 'approved' ? 'selected approve' : 'approve'} onClick={() => approveOrReject('approved')}>Approve</button>
        <button type="button" disabled={isSubmitting} className={decision === 'rejected' ? 'selected reject' : 'reject'} onClick={() => approveOrReject('rejected')}>Reject</button>
      </div>
      <span className="node-config-hint">{isPendingNode ? 'Waiting for your approval' : `Decision: ${decision}`}</span>
      {error && <span className="node-config-hint">{error}</span>}
      {isConfigOpen && <NodeConfigModal title="Configure human review" description="Write the question shown to the reviewer. Approve or reject on the node; that decision is sent to the backend." values={values} onChange={(field, value) => updateNodeField(id, field, value)} onClose={() => setIsConfigOpen(false)} fields={[{ name: 'prompt', label: 'Review prompt', type: 'textarea', placeholder: 'What should the reviewer confirm?' }]} />}
    </NodeGenerator>
  );
}
