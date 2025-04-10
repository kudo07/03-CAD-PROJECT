import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BlockList({ onSelect }) {
  const [blocks, setBlocks] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchBlocks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/block', {
        params: { page },
      });
      setBlocks(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error('Fetch error', err);
    }
  };

  const searchBlocks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/block/search', {
        params: { name: search },
      });
      setBlocks(res.data);
      setPagination({});
    } catch (err) {
      console.error('Search error', err);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, [page]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Blocks</h2>
      <div className="mb-2 flex flex-col md:flex-row gap-2">
        <input
          className="p-2 border rounded flex-1"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="definition">Definition</option>
          <option value="instance">Instance</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={searchBlocks}
        >
          Search
        </button>
      </div>
      <ul>
        {blocks.map((block) => (
          <li
            key={block.id}
            className="p-2 hover:bg-gray-100 cursor-pointer border-b"
            onClick={() => onSelect(block)}
          >
            {block.name} -{' '}
            <span className="text-sm text-gray-500">{block.type}</span>
          </li>
        ))}
      </ul>
      {pagination.pages && (
        <div className="mt-2 flex justify-between items-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1 bg-gray-300 rounded"
          >
            Prev
          </button>
          <span>
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            className="px-2 py-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
