import { useState } from 'react';
import { useStore } from '../store';
import { NodeGenerator } from '../components/nodeGenerator';
import { NodeConfigModal } from '../components/nodeConfigModal';

export function ConditionalNode({ id, data }) {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const values = { leftOperand: data?.leftOperand ?? '', operator: data?.operator ?? 'equals', rightOperand: data?.rightOperand ?? '' };
  const operatorLabel = { equals: 'equals', not_equals: 'does not equal', contains: 'contains', greater_than: 'is greater than', less_than: 'is less than' }[values.operator];

  return (
    <NodeGenerator title="Conditional" inputs={[{ id: 'value' }]} outputs={[{ id: 'true' }, { id: 'false' }]} accentColor="#f59e0b">
      <button className="node-config-button nodrag" type="button" onClick={() => setIsConfigOpen(true)}>Set condition</button>
      <span className="node-config-hint">{values.leftOperand || 'Value'} {operatorLabel} {values.rightOperand || 'value'}</span>
      {isConfigOpen && <NodeConfigModal title="Set condition" description="Configure the comparison sent to the backend. Connect the true and false handles to separate branches." values={values} onChange={(field, value) => updateNodeField(id, field, value)} onClose={() => setIsConfigOpen(false)} fields={[
        { name: 'leftOperand', label: 'Left value', placeholder: 'e.g. status' },
        { name: 'operator', label: 'Comparison', type: 'select', options: [
          { value: 'equals', label: 'Equals' }, { value: 'not_equals', label: 'Does not equal' }, { value: 'contains', label: 'Contains' }, { value: 'greater_than', label: 'Greater than' }, { value: 'less_than', label: 'Less than' },
        ] },
        { name: 'rightOperand', label: 'Right value', placeholder: 'e.g. approved' },
      ]} />}
    </NodeGenerator>
  );
}
