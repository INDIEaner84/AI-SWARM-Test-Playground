import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  useReactFlow,
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';

import { UserInputNode, AgentNode, AdapterNode, RouterNode } from './components/nodes/CustomNodes';
import { Sidebar } from './components/Sidebar';
import { PropertiesPanel } from './components/PropertiesPanel';
import { NodeType, SwarmNode } from './types';

const nodeTypes = {
  userInput: UserInputNode,
  agent: AgentNode,
  adapter: AdapterNode,
  router: RouterNode,
};

const initialNodes: SwarmNode[] = [
  {
    id: '1',
    type: 'userInput',
    position: { x: 250, y: 250 },
    data: { label: 'Main Chat Input', promptTemplate: '{user_input}' },
  },
];

const SwarmEditorContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNodeData = () => {
        switch (type) {
          case 'userInput':
            return { label: 'New Input', promptTemplate: '' };
          case 'agent':
            return { label: 'New Agent', role: 'Planner', systemPrompt: '' };
          case 'adapter':
            return { label: 'New Adapter', adapterId: '' };
          case 'router':
            return { label: 'New Router', routingCondition: '' };
          default:
            return { label: 'Node' };
        }
      };

      const newNode: SwarmNode = {
        id: uuidv4(),
        type,
        position,
        data: newNodeData() as any,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onNodeClick = useCallback((_, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const updateNodeData = useCallback(
    (nodeId: string, newData: any) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === nodeId) {
            return {
              ...n,
              data: { ...n.data, ...newData },
            };
          }
          return n;
        })
      );
    },
    [setNodes]
  );

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) as SwarmNode | null;

  return (
    <div className="flex w-full h-screen bg-gray-50 flex-row overflow-hidden">
      <Sidebar onDragStart={(event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      }} />
      <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
          defaultEdgeOptions={{ style: { strokeWidth: 2, stroke: '#9ca3af' } }}
        >
          <Background color="#e5e7eb" gap={16} size={1} />
          <Controls className="bg-white border-gray-200 shadow-sm" />
        </ReactFlow>
      </div>
      <PropertiesPanel node={selectedNode} updateNodeData={updateNodeData} />
    </div>
  );
};

export default function SwarmEditor() {
  return (
    <ReactFlowProvider>
      <SwarmEditorContent />
    </ReactFlowProvider>
  );
}
