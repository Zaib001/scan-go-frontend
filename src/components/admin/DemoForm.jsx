import { useState } from 'react';
import { createDemo, updateDemo } from '../../services/demoService';

const DemoForm = ({ existingData = null, onSave }) => {
  const [form, setForm] = useState(
    existingData || {
      title: '',
      slug: '',
      type: 'museum',
      content: '',
      curatorKey: 'default',
    }
  );

  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.content.trim().length < 20) {
      return setError('Content must be at least 20 characters long.');
    }

    const slug = form.slug.toLowerCase().replace(/\s+/g, '-');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('slug', slug);
    formData.append('type', form.type);
    formData.append('content', form.content);
    formData.append('curatorKey', form.curatorKey || 'default');
    if (productImage) {
      formData.append('productImage', productImage);
    }

    try {
      if (existingData) {
        await updateDemo(slug, formData); // make sure updateDemo handles FormData
      } else {
        await createDemo(formData); // make sure createDemo handles FormData
      }

      if (onSave) onSave();
    } catch (err) {
      console.error('❌ Error saving demo:', err?.response?.data || err.message);
      setError(err?.response?.data?.error || 'Error saving demo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mt-6" encType="multipart/form-data">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Demo Title"
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="demo-slug"
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="curatorKey"
        placeholder="curatorKey"
        className="w-full p-2 border rounded"
        value={form.curatorKey}
        onChange={handleChange}
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="museum">Museum</option>
        <option value="product">Product</option>
        <option value="health">Health</option>
      </select>

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Demo content (min. 20 characters)"
        rows={4}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {existingData ? 'Update Demo' : 'Create Demo'}
      </button>
    </form>
  );
};

export default DemoForm;
