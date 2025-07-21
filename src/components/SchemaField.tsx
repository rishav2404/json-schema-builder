import React, { useState } from 'react';
import { Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import type { SchemaFieldType } from './SchemaPage';

interface SchemaFieldProps {
  field: SchemaFieldType;
  onUpdate: (id: string, updates: Partial<SchemaFieldType>) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  level: number;
}

const SchemaField: React.FC<SchemaFieldProps> = ({
  field,
  onUpdate,
  onDelete,
  onAddChild,
  level
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [keyValue, setKeyValue] = useState(field.key ?? '');
  const [value, setValue] = useState(field.value ?? '');

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onUpdate(field.id, { value: e.target.value });
  };

  const handleTypeChange = (type: 'string' | 'number' | 'float' | 'objectId' | 'boolean' | 'array' | 'nested') => {
    onUpdate(field.id, { type });
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyValue(e.target.value);
    onUpdate(field.id, { key: e.target.value });
  };

  const indent = level * 24;

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
        style={{ marginLeft: `${indent}px` }}
      >
        {/* Expand/Collapse for nested fields */}
        {field.type === 'nested' && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}

        {field.type !== 'nested' && <div className="w-6" />}

        {/* Field Key */}
        <div className="flex-1 min-w-0">
          {isEditingKey ? (
            <input
              type="text"
              value={keyValue || ''}
              onChange={handleKeyChange}
              onBlur={() => setIsEditingKey(false)}
              onKeyDown={(e) => { if (e.key === 'Escape') setIsEditingKey(false); }}
              className="w-full px-3 py-2 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingKey(true)}
              className="text-left w-full px-3 py-2 text-sm font-medium text-gray-900 hover:bg-white rounded transition-colors"
            >
              {field.key}
            </button>
          )}
        </div>

        {/* Field Value (for non-nested types) */}
        {field.type !== 'nested' && (
          <input
            type="text"
            value={typeof value === 'string' ? value : value === undefined ? '' : String(value)}
            onChange={handleValueChange}
            className="w-32 px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white mr-2"
            placeholder="Value"
          />
        )}

        {/* Field Type */}
        <div className="flex items-center gap-2">
          <select
            value={field.type}
            onChange={(e) => handleTypeChange(e.target.value as 'string' | 'number' | 'float' | 'objectId' | 'boolean' | 'array' | 'nested')}
            className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="float">Float</option>
            <option value="objectId">ObjectId</option>
            <option value="boolean">Boolean</option>
            <option value="array">Array</option>
            <option value="nested">Nested</option>
          </select>

          {/* Add Child Button (for nested types) */}
          {field.type === 'nested' && (
            <button
              onClick={() => onAddChild(field.id)}
              className="flex items-center gap-1 px-3 py-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
            >
              <Plus size={14} />
              Add Child
            </button>
          )}

          {/* Delete Button */}
          <button
            onClick={() => onDelete(field.id)}
            className="flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Nested Children */}
      {field.type === 'nested' && field.children && isExpanded && (
        <div className="mt-3 space-y-3">
          {field.children.map(child => (
            <SchemaField
              key={child.id}
              field={child}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onAddChild={onAddChild}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SchemaField;