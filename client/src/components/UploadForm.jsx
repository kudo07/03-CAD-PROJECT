import { useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setMessage('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/cad/upload-cad',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setMessage(res.data.message || 'Uploaded successfully');
    } catch (err) {
      console.error(err);
      setMessage('Upload failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow space-y-4 bg-white">
      <h2 className="text-xl font-semibold text-center">Upload CAD File</h2>
      <input
        type="file"
        accept=".dxf"
        onChange={handleFileChange}
        className="w-full"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {message && (
        <p className="text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
