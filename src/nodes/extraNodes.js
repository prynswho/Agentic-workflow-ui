import { NodeGenerator } from "../components/nodeGenerator";

export const SendEmailNode =({id,data}) =>{
    const fields=[{id: "recipient", type: "text"}, {id: "subject", type: "text"}, {id: "body", type: "text"}];
    return (
        <NodeGenerator
        title="Send Email"
        inputs={[{id: "input1"}]}
        outputs={[{id: "output1"}]}
        accentColor = "#a78bfa"
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


