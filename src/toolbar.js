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
                <DraggableNode type='python' label='Python' />
                <DraggableNode type='mlNode' label='ML Node' />
                <DraggableNode type='java' label='Java Node' />
                <DraggableNode type='ruby' label='Ruby Node' />
                <DraggableNode type='c' label='C++' />
                <DraggableNode type='createFolder' label='Create Folder' />
            </div>
        </div>
    );
};
