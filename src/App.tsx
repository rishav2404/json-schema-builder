import React from 'react';
import SchemaPage from './components/SchemaPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full h-full">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6" style={{ height: '6vh', minHeight: '40px', maxHeight: '48px' }}>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-900">JSON Schema Builder</h1>
          {/* <span className="text-gray-600 text-base hidden sm:inline">Create and visualize JSON schemas with ease</span> */}
        </div>
      </nav>
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full h-full">
        <SchemaPage />
      </div>
    </div>
  );
}

export default App;