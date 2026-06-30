// textNode.js

import { useUpdateNodeInternals } from "reactflow";
import { NodeGenerator } from "../components/nodeGenerator";
import {useState, useEffect} from "react";
import { AutoResizeTextBox } from "../components/fieldRender";

function TextNode({id,data}){
    const [text,setText] = useState(data?.text || '');
    const updateNodeIntervals = useUpdateNodeInternals();

    const extractValidVars = (text) => {
        const allValues = new Set();
        const jsRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
        const matched = text.matchAll(jsRegex);
        for(const matches of matched){
            allValues.add(matches[1]);
        }
        return Array.from(allValues);
    };

    const validVariables = extractValidVars(text);
    // console.log(validVariables);

    const input = [];
    if(validVariables.length > 0){
        validVariables.forEach(variable => {
            input.push({id:variable,type:"text"});
        });
    }

    useEffect(() =>{
        updateNodeIntervals(id);
    },[input.length,updateNodeIntervals,id]);


    return (
        <NodeGenerator
        title="Text Node"
        inputs={input}
        outputs={[{id: "output1"}]}
        accentColor = "#f2d200"
        >
            <AutoResizeTextBox value={text} onChange={setText} placeholder= "text here" />
        </NodeGenerator>
    )
}

export  {TextNode};