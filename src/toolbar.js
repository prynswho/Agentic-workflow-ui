// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='DatabaseQuery' label='Database Query Node' />
                <DraggableNode type='HTTPRequestNode' label='HTTPRequestNode' />
                <DraggableNode type='ReadEmailNode' label='ReadEmailNode' />
                <DraggableNode type='SendEmailNode' label='SendEmailNode' />
                <DraggableNode type='WebScraperNode' label='WebScraperNode' />
                <DraggableNode type='createFolder' label='Create Folder' />
            </div>
        </div>
    );
};
