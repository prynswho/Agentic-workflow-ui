// outputNode.js

import { useState } from 'react';
import { NodeGenerator } from "../components/nodeGenerator.js";
import { useStore } from '../store';
import { ResultViewerModal } from '../components/promptEditorModal';

export const OutputNode = ({ id }) => {
  const [isResultOpen, setIsResultOpen] = useState(false);
  const edges = useStore((state) => state.edges);
  const runResults = useStore((state) => state.runResult);
  const incomingNodeIds = edges.filter((edge) => edge.target === id).map((edge) => edge.source);
  const result = runResults?.find((item) => incomingNodeIds.includes(item.node));

  return (
    <NodeGenerator title="Output" inputs={[{ id: 'value' }]} outputs={[]} accentColor="#fb923c">
      <button className="node-config-button nodrag" type="button" disabled={!result} onClick={() => setIsResultOpen(true)}>
        {result ? 'View result' : 'No result available'}
      </button>
      <span className="node-config-hint">{result ? `Latest response from ${result.node}` : incomingNodeIds.length ? 'Run the flow to load this output' : 'Connect a node to view its output'}</span>
      {isResultOpen && result && <ResultViewerModal nodeName={result.node} message={result.message} onClose={() => setIsResultOpen(false)} />}
    </NodeGenerator>
  );
}
