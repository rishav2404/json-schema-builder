import React from 'react';
import { Plus } from 'lucide-react';
import SchemaField from './SchemaField';
import type { SchemaFieldType } from './SchemaPage';

interface SchemaBuilderControlsProps {
  fields: SchemaFieldType[];
  onAddField: (parentId?: string) => void;
  onUpdateField: (id: string, updates: Partial<SchemaFieldType>) => void;
  onDeleteField: (id: string) => void;
}

const SchemaBuilderControls: React.FC<SchemaBuilderControlsProps> = ({
  fields,
  onAddField,
  onUpdateField,
  onDeleteField
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Schema Builder</h2>
          <button
            onClick={() => onAddField()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-3">
          {fields.map(field => (
            <SchemaField
              key={field.id}
              field={field}
              onUpdate={onUpdateField}
              onDelete={onDeleteField}
              onAddChild={onAddField}
              level={0}
            />
          ))}
          
          {fields.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-4">No fields added yet</p>
              <button
                onClick={() => onAddField()}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 mx-auto"
              >
                <Plus size={16} />
                Add Your First Field
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemaBuilderControls;