import { Node, Edge } from '@xyflow/react';

export type NodeType = 'userInput' | 'agent' | 'adapter' | 'router';

export interface BaseNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
}

export interface UserInputNodeData extends BaseNodeData {
  promptTemplate: string;
}

export interface AgentNodeData extends BaseNodeData {
  role: 'Critic' | 'Planner' | 'Executor' | 'Summarizer' | 'Custom';
  systemPrompt: string;
  temperature: number;
}

export interface AdapterNodeData extends BaseNodeData {
  adapterId: string;
  targetModules: string[];
}

export interface RouterNodeData extends BaseNodeData {
  routingCondition: string;
}

export type SwarmNode = Node<BaseNodeData, NodeType>;
export type SwarmEdge = Edge;

export interface RootState {
  nodes: SwarmNode[];
  edges: SwarmEdge[];
  selectedNode: SwarmNode | null;
}
