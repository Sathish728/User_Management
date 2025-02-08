import React, { useState } from 'react';
import { uploadUsers,exportUsers } from './api';
import "./Export.css"

const UploadForm = ({ token }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadUsers(file, token);
    alert('Users uploaded successfully');
  };


  
    const handleExport = async () => {
      const blob = await exportUsers(token);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.xlsx');
      document.body.appendChild(link);
      link.click();
    };
   

  return (
    <div>
  <div>
    <form onSubmit={handleSubmit} className='form'>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Upload Users</button>
    </form>
    </div>

    <div>
    <button onClick={handleExport}>Download Users</button>
    </div>
    </div>
  );
};

export default UploadForm;