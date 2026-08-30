// inputNode.js

import { NodeGenerator } from "../components/nodeGenerator";
import { useState } from 'react';
import { useStore } from '../store';
import { NodeConfigModal } from '../components/nodeConfigModal';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const values = { name: data?.name ?? id.replace('customInput-', 'input_'), inputType: data?.inputType ?? 'text', value: data?.value ?? '' };

  return (
    <NodeGenerator title="Input" outputs={[{ id: 'value' }]} inputs={[]} accentColor="#34d399">
      <button className="node-config-button nodrag" type="button" onClick={() => setIsConfigOpen(true)}>Configure input</button>
      <span className="node-config-hint">{values.name}: {values.value ? 'value set' : 'no value set'}</span>
      {isConfigOpen && <NodeConfigModal title="Configure input" description="Set the value supplied when this workflow runs." values={values} onChange={(field, value) => updateNodeField(id, field, value)} onClose={() => setIsConfigOpen(false)} fields={[
        { name: 'name', label: 'Input name', placeholder: 'input' },
        { name: 'inputType', label: 'Input type', type: 'select', options: [{ value: 'text', label: 'Text' }, { value: 'file', label: 'File path' }] },
        { name: 'value', label: 'Value', type: 'textarea', placeholder: 'Enter the input value' },
      ]} />}
    </NodeGenerator>
  );
}
