import { NodeGenerator } from "../components/nodeGenerator";
import { useState } from "react";
import { useStore } from "../store";
import { EmailEditorModal } from "../components/promptEditorModal";

export const SendEmailNode =({id,data}) =>{
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const updateNodeField = useStore((state) => state.updateNodeField);
    const emailDetails = {
        recipient: data?.recipient || '',
        subject: data?.subject || '',
        body: data?.body || '',
    };
    return (
        <NodeGenerator
        title="Send Email"
        inputs={[{id: "input1"}]}
        outputs={[{id: "output1"}]}
        accentColor = "#a78bfa"
        >
            <button className="node-config-button nodrag" type="button" onClick={() => setIsEditorOpen(true)}>Configure email</button>
            <span className="node-config-hint">{emailDetails.recipient ? `To: ${emailDetails.recipient}` : 'Set recipient, subject, and message'}</span>
            {isEditorOpen && <EmailEditorModal values={emailDetails} onChange={(field, value) => updateNodeField(id, field, value)} onClose={() => setIsEditorOpen(false)} />}
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
        accentColor = "#34d399"
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
        accentColor = "#fb923c"
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
        accentColor = "#2dd4bf"
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
        accentColor = "#f472b6"
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
        accentColor = "#fbbf24"
        >
            {fields.map(field => (
            <input key={field.id} type={field.type} placeholder={field.id}/>
            ))}
        </NodeGenerator>
    )
}

