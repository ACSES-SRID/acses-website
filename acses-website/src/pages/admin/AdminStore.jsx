import React, { useState, useEffect } from 'react';

const AdminStore = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', originalPrice: '', category: 'Apparel', badge: '', badgeColor: '', image: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/store`);
    const data = await res.json();
    setProducts(data);
  };

  const handleEdit = (prod) => {
    setEditing(prod._id);
    setForm({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      originalPrice: prod.originalPrice || '',
      category: prod.category,
      badge: prod.badge || '',
      badgeColor: prod.badgeColor || '',
      image: prod.image
    });
  };

  const handleSave = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/store`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editing, ...form })
    });
    setEditing(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/store`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchProducts();
  };

  const handleAdd = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', description: '', price: '', originalPrice: '', category: 'Apparel', badge: '', badgeColor: '', image: '' });
    fetchProducts();
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage Store Products</h2>

      {/* Add New */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
        <input className="border p-2 mr-2 mb-2" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        <input className="border p-2 mr-2 mb-2" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
        <input className="border p-2 mr-2 mb-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
        <input className="border p-2 mr-2 mb-2" type="number" placeholder="Original Price (optional)" value={form.originalPrice} onChange={(e) => setForm({...form, originalPrice: e.target.value})} />
        <select className="border p-2 mr-2 mb-2" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
          <option value="Apparel">Apparel</option>
          <option value="Accessories">Accessories</option>
          <option value="Tech Gear">Tech Gear</option>
        </select>
        <input className="border p-2 mr-2 mb-2" placeholder="Badge (optional)" value={form.badge} onChange={(e) => setForm({...form, badge: e.target.value})} />
        <input className="border p-2 mr-2 mb-2" placeholder="Badge Color" value={form.badgeColor} onChange={(e) => setForm({...form, badgeColor: e.target.value})} />
        <input className="border p-2 mr-2 mb-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </div>

      {/* List */}
      {products.map((prod) => (
        <div key={prod._id} className="bg-white p-4 rounded shadow mb-2">
          {editing === prod._id ? (
            <div>
              <input className="border p-2 mr-2 mb-2 w-full" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
              <input className="border p-2 mr-2 mb-2 w-full" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
              <input className="border p-2 mr-2 mb-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
              <input className="border p-2 mr-2 mb-2" type="number" placeholder="Original Price" value={form.originalPrice} onChange={(e) => setForm({...form, originalPrice: e.target.value})} />
              <select className="border p-2 mr-2 mb-2" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
                <option value="Tech Gear">Tech Gear</option>
              </select>
              <input className="border p-2 mr-2 mb-2" placeholder="Badge" value={form.badge} onChange={(e) => setForm({...form, badge: e.target.value})} />
              <input className="border p-2 mr-2 mb-2" placeholder="Badge Color" value={form.badgeColor} onChange={(e) => setForm({...form, badgeColor: e.target.value})} />
              <input className="border p-2 mr-2 mb-2 w-full" placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
              <button onClick={() => setEditing(null)} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          ) : (
            <div className="flex justify-between">
              <div>
                <strong>{prod.name}</strong> - ${prod.price} ({prod.category})
              </div>
              <div>
                <button onClick={() => handleEdit(prod)} className="bg-yellow-600 text-white px-4 py-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(prod._id)} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminStore;