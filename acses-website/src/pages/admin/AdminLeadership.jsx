import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';

const AdminLeadership = () => {
  const { hasAccess } = useAdmin();
  const [executives, setExecutives] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', image: '', description: '' });

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leadership`);
    const data = await res.json();
    setExecutives(data);
  };

  const handleEdit = (exec) => {
    setEditing(exec._id);
    setForm({ name: exec.name, role: exec.role, image: exec.image, description: exec.description });
  };

  const handleSave = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leadership`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editing, ...form })
    });
    setEditing(null);
    fetchExecutives();
  };

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leadership`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchExecutives();
  };

  const handleAdd = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leadership`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', role: '', image: '', description: '' });
    fetchExecutives();
  };

  if (!hasAccess('executives')) {
    return <BlockedAccess />;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage Leadership</h2>

      {/* Add New */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Add New Executive</h3>
        <input className="border p-2 mr-2" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        <input className="border p-2 mr-2" placeholder="Role" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} />
        <input className="border p-2 mr-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
        <input className="border p-2 mr-2" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </div>

      {/* List */}
      {executives.map((exec) => (
        <div key={exec._id} className="bg-white p-4 rounded shadow mb-2">
          {editing === exec._id ? (
            <div>
              <input className="border p-2 mr-2" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
              <input className="border p-2 mr-2" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} />
              <input className="border p-2 mr-2" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
              <input className="border p-2 mr-2" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
              <button onClick={() => setEditing(null)} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          ) : (
            <div className="flex justify-between">
              <div>
                <strong>{exec.name}</strong> - {exec.role}
              </div>
              <div>
                <button onClick={() => handleEdit(exec)} className="bg-yellow-600 text-white px-4 py-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(exec._id)} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminLeadership;