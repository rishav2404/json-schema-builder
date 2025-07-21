import React, { useState, useCallback } from 'react';
import SchemaBuilderControls from './SchemaBuilderControls';
import JsonPreview from './JsonPreview';

export interface SchemaFieldType {
  id: string;
  key: string;
  type: 'string' | 'number' | 'float' | 'objectId' | 'boolean' | 'array' | 'nested';
  value?: unknown;
  children?: SchemaFieldType[];
}

const SchemaPage: React.FC = () => {
  const [fields, setFields] = useState<SchemaFieldType[]>([]);

  const generateUniqueId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const addField = useCallback((parentId?: string) => {
    const newField: SchemaFieldType = {
      id: generateUniqueId(),
      key: 'newField',
      type: 'string',
      value: ''
    };

    if (parentId) {
      setFields(prevFields => updateNestedFields(prevFields, parentId, (children) => [
        ...(children || []),
        newField
      ]));
    } else {
      setFields(prevFields => [...prevFields, newField]);
    }
  }, []);

  const updateField = useCallback((id: string, updates: Partial<SchemaFieldType>) => {
    setFields(prevFields => updateNestedField(prevFields, id, updates));
  }, []);

  const deleteField = useCallback((id: string) => {
    setFields(prevFields => removeNestedField(prevFields, id));
  }, []);

  const updateNestedFields = (
    fields: SchemaFieldType[],
    parentId: string,
    updater: (children?: SchemaFieldType[]) => SchemaFieldType[]
  ): SchemaFieldType[] => {
    return fields.map(field => {
      if (field.id === parentId) {
        return { ...field, children: updater(field.children) };
      }
      if (field.children) {
        return { ...field, children: updateNestedFields(field.children, parentId, updater) };
      }
      return field;
    });
  };

  const updateNestedField = (fields: SchemaFieldType[], id: string, updates: Partial<SchemaFieldType>): SchemaFieldType[] => {
    return fields.map(field => {
      if (field.id === id) {
        const updatedField = { ...field, ...updates };
        // If changing to non-nested type, remove children
        if (updates.type && updates.type !== 'nested') {
          delete updatedField.children;
        }
        // If changing to nested type and no children exist, initialize empty children
        if (updates.type === 'nested' && !updatedField.children) {
          updatedField.children = [];
        }
        return updatedField;
      }
      if (field.children) {
        return { ...field, children: updateNestedField(field.children, id, updates) };
      }
      return field;
    });
  };

  const removeNestedField = (fields: SchemaFieldType[], id: string): SchemaFieldType[] => {
    return fields
      .filter(field => field.id !== id)
      .map(field => {
        if (field.children) {
          return { ...field, children: removeNestedField(field.children, id) };
        }
        return field;
      });
  };

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex gap-6 h-full w-full">
        {/* Schema Builder - Left Side */}
        <div className="flex-1 min-w-0">
          <SchemaBuilderControls
            fields={fields}
            onAddField={addField}
            onUpdateField={updateField}
            onDeleteField={deleteField}
          />
        </div>

        {/* JSON Preview - Right Side */}
        <div className="flex-1 min-w-0">
          <JsonPreview fields={fields} />
        </div>
      </div>
    </div>
  );
};

export default SchemaPage;