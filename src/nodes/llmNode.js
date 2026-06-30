// llmNode.js

import { NodeGenerator } from "../components/nodeGenerator";


export const LLMNode = ({ id, data }) => {
  const fields=[];
      return (
          <NodeGenerator
          title="LLM Node"
          inputs={[{id: "input1"}, {id: "input2"}]}
          outputs={[{id: "output1"}]}   
          accentColor = "#ff008c"
          >
              {fields.map(field => (
              <input key={field.id} type={field.type} placeholder={field.id}/>
              ))}
          </NodeGenerator>
      )
}
