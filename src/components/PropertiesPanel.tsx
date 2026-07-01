import React from 'react';
import { SwarmNode } from '../types';

interface PropertiesPanelProps {
  node: SwarmNode | null;
  updateNodeData: (nodeId: string, newData: any) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ node, updateNodeData }) => {
  if (!node) {
    return (
      <aside className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col justify-center items-center text-center h-full z-10 shadow-sm relative">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
          <span className="text-gray-400 text-2xl font-serif italic">§</span>
        </div>
        <p className="text-sm text-gray-400">Select a node in the canvas to view and edit its properties.</p>
      </aside>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateNodeData(node.id, { [e.target.name]: e.target.value });
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col h-full z-10 shadow-sm relative">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="font-semibold text-gray-800 capitalize">{node.type} Properties</h2>
        <div className="text-[10px] text-gray-400 font-mono mt-1">ID: {node.id}</div>
      </div>
      <div className="p-5 flex flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Node Label</label>
          <input
            type="text"
            name="label"
            value={node.data.label as string}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Name your node..."
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Description (Optional)</label>
          <textarea
            name="description"
            value={(node.data.description as string) || ''}
            onChange={handleChange}
            rows={2}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Internal notes..."
          />
        </div>

        {node.type === 'agent' && (
          <>
            <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Agent Role</label>
              <select
                name="role"
                value={node.data.role as string}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
              >
                <option value="Planner">Planner</option>
                <option value="Critic">Critic</option>
                <option value="Executor">Executor</option>
                <option value="Summarizer">Summarizer</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">System Prompt</label>
              <textarea
                name="systemPrompt"
                value={node.data.systemPrompt as string}
                onChange={handleChange}
                rows={5}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-xs resize-y"
                placeholder="You are a helpful assistant..."
              />
            </div>
          </>
        )}

        {node.type === 'userInput' && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Prompt Template</label>
            <textarea
              name="promptTemplate"
              value={node.data.promptTemplate as string}
              onChange={handleChange}
              rows={4}
              className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-xs resize-y"
              placeholder="{user_message}"
            />
          </div>
        )}

        {node.type === 'adapter' && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Adapter ID (HuggingFace/Local)</label>
            <input
              type="text"
              name="adapterId"
              value={node.data.adapterId as string}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
              placeholder="e.g. org/model-lora-v1"
            />
          </div>
        )}

        {node.type === 'router' && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-100">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Routing Condition (Code/Expression)</label>
            <textarea
              name="routingCondition"
              value={node.data.routingCondition as string}
              onChange={handleChange}
              rows={3}
              className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-xs resize-y"
              placeholder="if (confidence > 0.8) return 'executor';"
            />
          </div>
        )}
      </div>
    </aside>
  );
};
