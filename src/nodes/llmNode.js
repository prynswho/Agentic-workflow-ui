// llmNode.js
import { useUpdateNodeInternals } from "reactflow";
import { useEffect } from "react";
import { useStore } from "../store";
import { NodeGenerator } from "../components/nodeGenerator";
import { PromptEditorModal } from "../components/promptEditorModal";
import { useState } from "react";

function LLMNode({ id, data }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const updateNodeField = useStore((state) => state.updateNodeField);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const text = data?.text || '';

    const extractValidVars = (text) => {
        const allValues = new Set();
        const jsRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
        const matched = text.matchAll(jsRegex);
        for (const matches of matched) {
            allValues.add(matches[1]);
        }
        return Array.from(allValues);
    };

    const validVariables = extractValidVars(text);

    const input = validVariables.length > 0
        ? validVariables.map(variable => ({ id: variable }))
        : [{ id: 'input' }];

    useEffect(() => {
        updateNodeInternals(id);
    }, [input.length, updateNodeInternals, id]);

    return (
        <NodeGenerator
            title="Agent"
            inputs={input}
            outputs={[{ id: "output1" }]}
            accentColor="#a78bfa"
        >
            <button className="node-config-button nodrag" type="button" onClick={() => setIsEditorOpen(true)}>Configure prompt</button>
            <span className="node-config-hint">{text ? 'Prompt configured' : 'Add instructions for the model'}</span>
            {isEditorOpen && <PromptEditorModal title="Configure agent" description="Write the goal and instructions your agent should follow." value={text} onChange={(newValue) => updateNodeField(id, 'text', newValue)} onClose={() => setIsEditorOpen(false)} placeholder="Describe what you want the agent to do…" />}
        </NodeGenerator>
    );
}

export { LLMNode };
