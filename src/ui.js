// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, BackgroundVariant, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { CreateFolder, DatabaseQueryNode, ReadEmailNode, SendEmailNode, WebScraperNode ,HTTPRequestNode} from './nodes/extraNodes';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  DatabaseQueryNode: DatabaseQueryNode,
  SendEmailNode:SendEmailNode,
  ReadEmailNode:ReadEmailNode,
  WebScraperNode:WebScraperNode,
  HTTPRequestNode:HTTPRequestNode,
  createFolder:CreateFolder,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteSelectedNodes: state.deleteSelectedNodes,
});

export const PipelineUI = ({ theme }) => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      deleteSelectedNodes,
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      const defaults = {
        text: {text: ''},
        customInput:{ inputName: nodeID.replace('customInput-', '') },
        customOutput:{ outputName: nodeID.replace('customOutput-', '') },
        llm: { system: '', prompt: '' },
        createFolder: { folderName: '' },
      }
      return {
        id:nodeID,
        nodeType:type,
        ...(defaults[type] || {})
      }
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <section className="canvas-section">
          <div className="canvas-toolbar">
            <div><span className="eyebrow">Canvas</span><strong>Untitled workflow</strong></div>
            <button className="delete-button" type="button" onClick={deleteSelectedNodes}>
              <span>⌫</span> Delete selected
            </button>
          </div>
        <div ref={reactFlowWrapper} className="flow-canvas">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType="bezier"
                defaultEdgeOptions={{ type: 'bezier' }}
                fitView
                style={{ backgroundColor: theme === 'dark' ? '#080808' : '#f7f7f8' }}
            >
                <Background variant={BackgroundVariant.Lines} color={theme === 'dark' ? '#262629' : '#dedee5'} gap={gridSize} size={1} />
                <Controls />
                <MiniMap nodeColor={theme === 'dark' ? '#a1a1aa' : '#71717a'} maskColor={theme === 'dark' ? 'rgba(8, 8, 8, 0.76)' : 'rgba(247, 247, 248, 0.72)'} />
            </ReactFlow>
        </div>
        </section>
    )
}
