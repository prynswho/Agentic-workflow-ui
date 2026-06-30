// outputNode.js

import { useState } from 'react';
import {fieldRender} from '../components/fieldRender.js'
import { NodeGenerator } from "../components/nodeGenerator.js";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const fields = [
    { id: 'name', label: 'Name', type: 'text', value: currName, onChange: setCurrName },
    { id: 'type', label: 'Type', type: 'select', options: ['Text', 'Image'], value: outputType, onChange: setOutputType },
  ];

  return (
    <NodeGenerator title="Output" inputs={[{ id: 'value' }]} outputs={[]} accentColor="#0ea5e9">
      {fields.map((field) => (
        <label key={field.id} style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem', gap: 4 }}>
          {field.label}
          {fieldRender(field, field.value, field.onChange)}
        </label>
      ))}
    </NodeGenerator>
  );
}
