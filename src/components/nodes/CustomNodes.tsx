import React from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { User, Bot, Cpu, GitBranch } from 'lucide-react';
import { UserInputNodeData, AgentNodeData, AdapterNodeData, RouterNodeData } from '../../types';

export const UserInputNode = ({ data, selected }: NodeProps<Node<UserInputNodeData, 'userInput'>>) => {
  return (
    <div className={`bg-white border-2 rounded-xl shadow-sm min-w-48 ${selected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}>
      <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-t-xl border-b border-gray-100">
        <User size={16} className="text-blue-600" />
        <div className="font-semibold text-sm text-gray-700">User Input</div>
      </div>
      <div className="p-3">
        <div className="text-sm font-medium text-gray-900">{data.label}</div>
        {data.description && <div className="text-xs text-gray-500 mt-1 line-clamp-2">{data.description}</div>}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500 border-2 border-white" />
    </div>
  );
};

export const AgentNode = ({ data, selected }: NodeProps<Node<AgentNodeData, 'agent'>>) => {
  return (
    <div className={`bg-white border-2 rounded-xl shadow-sm min-w-48 ${selected ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-500 border-2 border-white" />
      <div className="flex items-center justify-between gap-2 bg-purple-50 px-3 py-2 rounded-t-xl border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-purple-600" />
          <div className="font-semibold text-sm text-gray-700">Agent Worker</div>
        </div>
        <div className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-purple-200 text-purple-700 rounded-full">
          {data.role}
        </div>
      </div>
      <div className="p-3">
        <div className="text-sm font-medium text-gray-900">{data.label}</div>
        {data.description && <div className="text-xs text-gray-500 mt-1 line-clamp-2">{data.description}</div>}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500 border-2 border-white" />
    </div>
  );
};

export const AdapterNode = ({ data, selected }: NodeProps<Node<AdapterNodeData, 'adapter'>>) => {
  return (
    <div className={`bg-white border-2 rounded-xl shadow-sm min-w-48 ${selected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-orange-500 border-2 border-white" />
      <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-t-xl border-b border-gray-100">
        <Cpu size={16} className="text-orange-600" />
        <div className="font-semibold text-sm text-gray-700">LoRa Adapter</div>
      </div>
      <div className="p-3">
        <div className="text-sm font-medium text-gray-900">{data.label}</div>
        {data.adapterId && (
          <div className="text-xs font-mono bg-gray-50 px-1 py-0.5 rounded text-gray-600 mt-1 truncate">
            {data.adapterId}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-orange-500 border-2 border-white" />
    </div>
  );
};

export const RouterNode = ({ data, selected }: NodeProps<Node<RouterNodeData, 'router'>>) => {
  return (
    <div className={`bg-white border-2 rounded-xl shadow-sm min-w-48 ${selected ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-green-500 border-2 border-white" />
      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-t-xl border-b border-gray-100">
        <GitBranch size={16} className="text-green-600" />
        <div className="font-semibold text-sm text-gray-700">Router</div>
      </div>
      <div className="p-3">
        <div className="text-sm font-medium text-gray-900">{data.label}</div>
        <div className="text-xs text-gray-500 mt-1">Condition:</div>
        <div className="text-xs font-mono text-gray-700 bg-gray-50 p-1 rounded mt-0.5">{data.routingCondition}</div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-green-500 border-2 border-white" />
    </div>
  );
};

