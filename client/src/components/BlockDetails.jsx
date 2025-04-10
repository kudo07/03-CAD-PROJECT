import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BlockDetails({ block }) {
  const [fullData, setFullData] = useState(null);

  useEffect(() => {
    async function fetchBlock() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/block/${block.id}`
        );
        setFullData(res.data);
      } catch (err) {
        console.error('Block fetch error', err);
      }
    }
    fetchBlock();
  }, [block]);

  if (!fullData) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">{fullData.name}</h2>
      <p>
        <strong>Type:</strong> {fullData.type}
      </p>
      <p>
        <strong>File:</strong> {fullData.file?.name}
      </p>
      <pre className="mt-2 bg-gray-100 p-2 rounded text-sm overflow-x-auto">
        {JSON.stringify(fullData, null, 2)}
      </pre>
    </div>
  );
}
