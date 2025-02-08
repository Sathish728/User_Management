import axios from 'axios';

const API_URL = 'http://localhost:3500/api';

const uploadUsers = async (file, token) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


const exportUsers = async (token) => {
  const response = await axios.get(`${API_URL}/download`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    responseType: 'blob',
  });
  return response.data;
};



const API = axios.create({ baseURL: "http://localhost:3500/api" });


export const getProfile = (token) => API.get("/profile", { headers: { Authorization: `Bearer ${token}` } });

export const updateProfile = (token, data) => API.put("/update", data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteProfile = (token) => API.delete("/delete", { headers: { Authorization: `Bearer ${token}` } });


export {  uploadUsers, exportUsers };