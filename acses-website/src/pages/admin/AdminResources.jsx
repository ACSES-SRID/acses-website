import React, { useState, useEffect } from 'react';

const AdminResources = () => {
  const [resources, setResources] = useState({ academic: [], tools: [], career: [] });
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ type: 'academic', title: '', description: '', tags: '', name: '', Icon: '' });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/resources`);
    const data = await res.json();
    setResources(data);
  };

  const handleEdit = (res, type) => {
    setEditing({ ...res, type });
    if (type === 'academic' || type === 'career') {
      setForm({ type, title: res.title, description: res.description, tags: res.tags ? res.tags.join(', ') : '', name: '', Icon: '' });
    } else {
      setForm({ type, title: '', description: '', tags: '', name: res.name, Icon: res.Icon });
    }
  };

  const handleSave = async () => {
    const data = editing.type === 'tools' ? { name: form.name, Icon: form.Icon } : { title: form.title, description: form.description, tags: form.tags.split(',').map(t => t.trim()) };
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/resources`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editing._id, type: editing.type, ...data })
    });
    setEditing(null);
    fetchResources();
  };

  const handleDelete = async (id, type) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/resources`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchResources();
  };

  const handleAdd = async () => {
    const data = form.type === 'tools' ? { name: form.name, Icon: form.Icon } : { title: form.title, description: form.description, tags: form.tags.split(',').map(t => t.trim()) };
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: form.type, ...data })
    });
    setForm({ type: 'academic', title: '', description: '', tags: '', name: '', Icon: '' });
    fetchResources();
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage Resources</h2>

      {/* Add New */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Add New Resource</h3>
        <select className="border p-2 mr-2" value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
          <option value="academic">Academic</option>
          <option value="tools">Tools</option>
          <option value="career">Career</option>
        </select>
        {form.type === 'tools' ? (
          <>
            <input className="border p-2 mr-2" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            <input className="border p-2 mr-2" placeholder="Icon" value={form.Icon} onChange={(e) => setForm({...form, Icon: e.target.value})} />
          </>
        ) : (
          <>
            <input className="border p-2 mr-2" placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
            <input className="border p-2 mr-2" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
            <input className="border p-2 mr-2" placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} />
          </>
        )}
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </div>

      {/* Academic */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Academic Resources</h3>
        {resources.academic.map((res) => (
          <div key={res._id} className="bg-white p-4 rounded shadow mb-2">
            {editing && editing._id === res._id ? (
              <div>
                <input className="border p-2 mr-2 w-full mb-2" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
                <textarea className="border p-2 mr-2 w-full mb-2" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
                <input className="border p-2 mr-2 w-full mb-2" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} />
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
                <button onClick={() => setEditing(null)} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <strong>{res.title}</strong> - {res.tags?.join(', ')}
                </div>
                <div>
                  <button onClick={() => handleEdit(res, 'academic')} className="bg-yellow-600 text-white px-4 py-2 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(res._id, 'academic')} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tools */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Tools & Platforms</h3>
        {resources.tools.map((res) => (
          <div key={res._id} className="bg-white p-4 rounded shadow mb-2">
            {editing && editing._id === res._id ? (
              <div>
                <input className="border p-2 mr-2 w-full mb-2" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                <input className="border p-2 mr-2 w-full mb-2" value={form.Icon} onChange={(e) => setForm({...form, Icon: e.target.value})} />
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
                <button onClick={() => setEditing(null)} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <strong>{res.name}</strong>
                </div>
                <div>
                  <button onClick={() => handleEdit(res, 'tools')} className="bg-yellow-600 text-white px-4 py-2 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(res._id, 'tools')} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Career */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Career Resources</h3>
        {resources.career.map((res) => (
          <div key={res._id} className="bg-white p-4 rounded shadow mb-2">
            {editing && editing._id === res._id ? (
              <div>
                <input className="border p-2 mr-2 w-full mb-2" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
                <textarea className="border p-2 mr-2 w-full mb-2" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
                <input className="border p-2 mr-2 w-full mb-2" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} />
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
                <button onClick={() => setEditing(null)} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <strong>{res.title}</strong> - {res.tags?.join(', ')}
                </div>
                <div>
                  <button onClick={() => handleEdit(res, 'career')} className="bg-yellow-600 text-white px-4 py-2 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(res._id, 'career')} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminResources;