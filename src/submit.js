// submit.js
import { useState ,useEffect} from 'react';
import { useStore } from "./store";
import axios from 'axios';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const setRunResult = useStore((state) => state.setRunResult);
  const setPendingApproval = useStore((state) => state.setPendingApproval);
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null); 

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setRunResult(null);
      setPendingApproval(null);
      const response = await axios.post('http://localhost:8081/pipelines/parse', { nodes, edges });
      console.log('Response from backend:', response.data);
      const runResults = Object.entries(response.data.results || {})
        .filter(([, output]) => output.status === 'success' && typeof output.results === 'string')
        .map(([node, output]) => ({ node, message: output.results }));
      if (response.data.status === 'success') {
        setRunResult(runResults);
      }
      if (response.data.status === 'paused') {
        setPendingApproval(response.data.pending_approval);
      }
      const val = response.data.status === 'success'
        ? 'Flow completed. Open the Results tab to view the latest response.'
        : response.data.status === 'paused'
          ? 'This flow is waiting for a decision in its Human Review node.'
        : (response.data.log?.join(' ') || 'The flow could not be completed.');
      setAlertInfo({
        severity: response.data.status === 'success' || response.data.status === 'paused' ? 'success' : 'error',
        title: response.data.status === 'success' ? 'Success' : response.data.status === 'paused' ? 'Approval needed' : 'Flow error',
        message: val,
      });
    } catch (error) {
      const message = error.response?.data?.detail || 'Unable to reach the pipeline server.';
      setAlertInfo({ severity: 'error', title: 'Error', message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (alertInfo) {
    const timer = setTimeout(() => setAlertInfo(null), 3500);
    return () => clearTimeout(timer);
  }
}, [alertInfo]);


  return (
    <div className="run-flow">
        {alertInfo && (
        <div className={`flow-alert ${alertInfo.severity}`} role="alert">
          <strong>{alertInfo.title}</strong>{alertInfo.message}
        </div>
      )}
      <button
        className="run-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Running…' : 'Run flow'}
      </button>
    </div>
  );
};
