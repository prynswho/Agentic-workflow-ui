// import { nodeFactoryFunction } from "./nodeFactoryFunction";
import { useUpdateNodeInternals } from "reactflow";
import { NodeGenerator } from "../components/nodeGenerator";
import {useState, useEffect} from "react";
import { AutoResizeTextBox } from "../components/fieldRender";

export const SendEmailNode =({id,data}) =>{
    const fields=[{id: "recipient", type: "text"}, {id: "subject", type: "text"}, {id: "body", type: "text"}];
    return (
        <NodeGenerator
        title="Send Email"
        inputs={[{id: "input1"}]}
        outputs={[{id: "output1"}]}
        accentColor = "#420eed"
        >
            {fields.map(field => (
            <input key={field.id} type={field.type} placeholder={field.id}/>
            ))}
        </NodeGenerator>
    )
}

export const ReadEmailNode = ({id,data}) => {
    const fields=[{id: "mailbox", type: "text"}, {id: "maxCount", type: "number"}];
    return (
        <NodeGenerator
        title="Read Email"
        inputs={[{id: "input1"}]}
        outputs={[{id: "output1"}, {id: "output2"},{id: "output3"}]}
        accentColor = "#33FF57"
        >
            {fields.map(field => (
            <input key={field.id} type={field.type} placeholder={field.id}/>
            ))}
        </NodeGenerator>
    )
}

export const HTTPRequestNode =({id,data}) => {
    const fields=[{id: "url", type: "text"}, {id: "method", type: "text"}];
    return (
        <NodeGenerator
        title="HTTP Request"
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

export const DatabaseQueryNode = ({id,data}) => {
    const fields=[{id: "connection", type: "text"}, {id: "query", type: "text"}];
    return (
        <NodeGenerator
        title="Database Query"
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

export const WebScraperNode = ({id,data}) => {
    const fields=[{id: "url", type: "text"}, {id: "selector", type: "text"}];
    return (
        <NodeGenerator
        title="Web Scraper"
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


export const CreateFolder = ({id,data}) => {
    const fields=[{id: "folder name", type: "text"}, {id: "folder path", type: "text"}];
    return (
        <NodeGenerator
        title="Create Folder"
        inputs={[{id: "input1"}]}
        outputs={[{id: "output1"}]}   //make it variable so inside one folder you can do multiple things 
        accentColor = "#463e3e"
        >
            {fields.map(field => (
            <input key={field.id} type={field.type} placeholder={field.id}/>
            ))}
        </NodeGenerator>
    )
}




