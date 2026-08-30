import { useState } from 'react';
import { useStore } from '../store';
import { NodeGenerator } from '../components/nodeGenerator';
import { NodeConfigModal } from '../components/nodeConfigModal';

export function LoopNode({ id, data }) {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const values = { iterations: data?.iterations ?? 3, itemName: data?.itemName ?? 'item' };

  return (
    <NodeGenerator title="Loop" inputs={[{ id: 'items' }]} outputs={[{ id: 'each' }]} accentColor="#38bdf8">
      <button className="node-config-button nodrag" type="button" onClick={() => setIsConfigOpen(true)}>Configure loop</button>
      <span className="node-config-hint">Repeat up to {values.iterations} times as {values.itemName}</span>
      {isConfigOpen && <NodeConfigModal title="Configure loop" description="Choose the maximum number of iterations. The setting is sent to the backend with this node." values={values} onChange={(field, value) => updateNodeField(id, field, field === 'iterations' ? Math.max(1, Number(value) || 1) : value)} onClose={() => setIsConfigOpen(false)} fields={[
        { name: 'iterations', label: 'Maximum iterations', type: 'number', min: 1, hint: 'Stops after this many iterations.' },
        { name: 'itemName', label: 'Item name', placeholder: 'item', hint: 'A label for the value emitted on each pass.' },
      ]} />}
    </NodeGenerator>
  );
}
