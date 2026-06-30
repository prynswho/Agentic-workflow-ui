// inputNode.js

import { useState } from 'react';
import { NodeGenerator } from "../components/nodeGenerator";
import { fieldRender } from "../components/fieldRender";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const fields = [
    { id: 'name', label: 'Name', type: 'text', value: currName, onChange: setCurrName },
    { id: 'type', label: 'Type', type: 'select', options: ['Text', 'File'], value: inputType, onChange: setInputType },
  ];

  return (
    <NodeGenerator title="Input" outputs={[{ id: 'value' }]} inputs={[]} accentColor="#0ea5e9">
      {fields.map((field) => (
        <label key={field.id} style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem', gap: 4 }}>
          {field.label}
          {fieldRender(field, field.value, field.onChange)}
        </label>
      ))}
    </NodeGenerator>
  );
}
