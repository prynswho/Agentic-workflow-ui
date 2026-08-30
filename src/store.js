// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    runResult: null,
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'bezier', animated: false, style: { stroke: '#a1a1aa', strokeWidth: 2 }, markerEnd: {type: MarkerType.Arrow, color: '#a1a1aa', height: 18, width: 18}}, get().edges),
      });
    },
    deleteSelectedNodes: () => {
      const selectedIds = new Set(get().nodes.filter((node) => node.selected).map((node) => node.id));
      if (selectedIds.size === 0) return;
      set({
        nodes: get().nodes.filter((node) => !selectedIds.has(node.id)),
        edges: get().edges.filter((edge) => !selectedIds.has(edge.source) && !selectedIds.has(edge.target)),
      });
    },
    setRunResult: (result) => set({ runResult: result }),
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => node.id === nodeId
          ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
          : node),
      });
    },
  }));
