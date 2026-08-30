// textNode.js
import { useUpdateNodeInternals } from "reactflow";
import { useEffect } from "react";
import { useStore } from "../store";
import { NodeGenerator } from "../components/nodeGenerator";
import { PromptEditorModal } from "../components/promptEditorModal";
import { useState } from "react";

function TextNode({ id, data }) {
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
            title="Text Node"
            inputs={input}
            outputs={[{ id: "output1" }]}
            accentColor="#fbbf24"
        >
            <button className="node-config-button nodrag" type="button" onClick={() => setIsEditorOpen(true)}>Edit template</button>
            <span className="node-config-hint">{text ? 'Template configured' : 'Add reusable text content'}</span>
            {isEditorOpen && <PromptEditorModal title="Edit text template" description="Create your text content and insert variables when needed." value={text} onChange={(newValue) => updateNodeField(id, 'text', newValue)} onClose={() => setIsEditorOpen(false)} placeholder="Write your text template…" />}
        </NodeGenerator>
    );
}

export { TextNode };
