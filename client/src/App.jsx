import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import BlockList from './components/BlockList';
import BlockDetails from './components/BlockDetails';

export default function App() {
  const [selectedBlock, setSelectedBlock] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">CAD Block Viewer</h1>
      <UploadForm />
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <BlockList onSelect={setSelectedBlock} />
        {selectedBlock && <BlockDetails block={selectedBlock} />}
      </div>
    </div>
  );
}
