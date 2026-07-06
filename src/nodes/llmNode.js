// llmNode.js
import { useUpdateNodeInternals } from "reactflow";
import { useEffect } from "react";
import { useStore } from "../store";
import { NodeGenerator } from "../components/nodeGenerator";
import { AutoResizeTextBox } from "../components/fieldRender";

function LLMNode({ id, data }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const updateNodeField = useStore((state) => state.updateNodeField);

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
            title="LLM Node"
            inputs={input}
            outputs={[{ id: "output1" }]}
            accentColor="#de00f2"
        >
            <AutoResizeTextBox
                value={text}
                onChange={(newValue) => updateNodeField(id, 'text', newValue)}
                placeholder="text here"
            />
        </NodeGenerator>
    );
}

export { LLMNode };