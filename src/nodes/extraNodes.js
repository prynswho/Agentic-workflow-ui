// import { nodeFactoryFunction } from "./nodeFactoryFunction";
import { useUpdateNodeInternals } from "reactflow";
import { NodeGenerator } from "../components/nodeGenerator";
import {useState, useEffect} from "react";
import { AutoResizeTextBox } from "../components/fieldRender";

export const PythonNode =({id,data}) =>{
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
        title="Python Node"
        inputs={input}
        outputs={[{id: "output1"}]}
        accentColor = "#420eed"
        >
            <AutoResizeTextBox value={text} onChange={setText} placeholder= "text here" />
        </NodeGenerator>
    )
}

export const MLNode = ({id,data}) => {
    const fields=[{id: "field1", type: "text"}, {id: "field2", type: "number"}];
    return (
        <NodeGenerator
        title="ML Node"
        inputs={[{id: "input1"}, {id: "input2"}]}
        outputs={[{id: "output1"}, {id: "output2"},{id: "output3"}]}
        accentColor = "#33FF57"
        >
            {fields.map(field => (
            <input key={field.id} type={field.type} placeholder={field.id}/>
            ))}
        </NodeGenerator>
    )
}

export const CNode =({id,data}) => {
    const fields=[{id: "field1", type: "text"}, {id: "field2", type: "number"}];
    return (
        <NodeGenerator
        title="C++ Node"
        inputs={[{id: "input1"}, {id: "input2"}]}
        outputs={[{id: "output1"}]}   
        accentColor = "#FF5733"
        >
            {fields.map(field => (
            <input key={field.id} type={field.type} placeholder={field.id}/>
            ))}
        </NodeGenerator>
    )
}

export const JavaNode = ({id,data}) => {
    const fields=[{id: "field1", type: "text"}];
    return (
        <NodeGenerator
        title="Java Node"
        inputs={[{id: "input1"}]}
        outputs={[{id: "output1"}]}   
        accentColor = "#276a00"
        >
            {fields.map(field => (
            <input key={field.id} type={field.type} placeholder={field.id}/>
            ))}
        </NodeGenerator>
    )
}

export const RubyNode = ({id,data}) => {
    const fields=[{id: "field1", type: "text"}, {id: "field2", type: "number"}];
    return (
        <NodeGenerator
        title="Ruby Node"
        inputs={[{id: "input1"}]}
        outputs={[{id: "output1"}, {id: "output2"}]}   
        accentColor = "#6a0202"
        >
            {fields.map(field => (
            <input key={field.id} type={field.type} placeholder={field.id}/>
            ))}
        </NodeGenerator>
    )
}




