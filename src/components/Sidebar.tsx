import React from 'react';
import { User, Bot, Cpu, GitBranch } from 'lucide-react';
import { NodeType } from '../types';

interface SidebarProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onDragStart }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full z-10 shadow-sm relative">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="font-semibold text-gray-800">Node Palette</h2>
        <p className="text-xs text-gray-500 mt-1">Drag nodes into the canvas to build your swarm.</p>
      </div>
      <div className="p-4 flex flex-col gap-3 overflow-y-auto">
        <div
          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50 hover:border-blue-300 transition-colors shadow-sm"
          onDragStart={(event) => onDragStart(event, 'userInput')}
          draggable
        >
          <div className="bg-blue-100 p-2 rounded-md">
            <User size={20} className="text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">User Input</div>
            <div className="text-[10px] text-gray-500">Starting point for the chat</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50 hover:border-purple-300 transition-colors shadow-sm"
          onDragStart={(event) => onDragStart(event, 'agent')}
          draggable
        >
          <div className="bg-purple-100 p-2 rounded-md">
            <Bot size={20} className="text-purple-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">Agent Worker</div>
            <div className="text-[10px] text-gray-500">Critic, Planner, or Executor</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50 hover:border-orange-300 transition-colors shadow-sm"
          onDragStart={(event) => onDragStart(event, 'adapter')}
          draggable
        >
          <div className="bg-orange-100 p-2 rounded-md">
            <Cpu size={20} className="text-orange-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">LoRa Adapter</div>
            <div className="text-[10px] text-gray-500">Dynamic weights overlay</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50 hover:border-green-300 transition-colors shadow-sm"
          onDragStart={(event) => onDragStart(event, 'router')}
          draggable
        >
          <div className="bg-green-100 p-2 rounded-md">
            <GitBranch size={20} className="text-green-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">Router</div>
            <div className="text-[10px] text-gray-500">Conditional logic & routing</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
