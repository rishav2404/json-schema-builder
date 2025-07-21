import React from 'react';
import { Copy, Check } from 'lucide-react';
import type { SchemaFieldType } from './SchemaPage';

interface JsonPreviewProps {
  fields: SchemaFieldType[];
  schemaKey: string;
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ fields, schemaKey }) => {
  const [copied, setCopied] = React.useState(false);

  const generateJsonSchema = (fields: SchemaFieldType[]): Record<string, unknown> => {
    const schema: Record<string, unknown> = {};
    fields.forEach(field => {
      if (field.type === 'nested') {
        schema[field.key] = field.children && field.children.length > 0 ? generateJsonSchema(field.children) : {};
      } else if (field.value !== undefined) {
        schema[field.key] = field.value;
      } else {
        switch (field.type) {
          case 'string':
            schema[field.key] = "sample string";
            break;
          case 'number':
            schema[field.key] = 42;
            break;
          case 'float':
            schema[field.key] = 3.14;
            break;
          case 'objectId':
            schema[field.key] = "60d5ec49f8c7b7001c8e4d5a";
            break;
          case 'boolean':
            schema[field.key] = true;
            break;
          case 'array':
            schema[field.key] = [];
            break;
        }
      }
    });
    return schema;
  };

  const jsonSchema: Record<string, unknown> = { [schemaKey]: generateJsonSchema(fields) };
  const jsonString = JSON.stringify(jsonSchema, null, 2);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">JSON Schema Preview</h2>
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${copied
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy JSON
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-auto text-sm leading-relaxed min-h-[300px]">
            <code>{jsonString || '{}'}</code>
          </pre>

          {fields.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 rounded-lg">
              <p className="text-gray-400 text-lg">Add some fields to see the JSON preview</p>
            </div>
          )}
        </div>

        {fields.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Schema Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <span className="font-medium">Total Fields:</span> {fields.length}
              </div>
              <div>
                <span className="font-medium">JSON Size:</span> {jsonString.length} characters
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonPreview;