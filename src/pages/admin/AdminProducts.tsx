import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { usePageTitle } from '../../hooks/use-page-title';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: string | null;
  capacity: string | null;
  voltage: string | null;
  features: string[];
  image_url: string | null;
  href: string | null;
  sort_order: number;
}

type ProductForm = Omit<Product, 'id'> & { id?: string };

const CATEGORIES = ['Distribution Panels', 'Lighting Solutions', 'Cables & Wiring', 'Industrial Systems'];

const emptyForm: ProductForm = {
  name: '', category: CATEGORIES[0], description: '', price: '',
  capacity: '', voltage: '', features: [], image_url: '', href: '', sort_order: 0,
};

const AdminProducts = () => {
  usePageTitle('Manage Products | AMPVIA');
  const { admin } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState<{ open: boolean; form: ProductForm }>({ open: false, form: { ...emptyForm } });
  const [featuresInput, setFeaturesInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [opError, setOpError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('products').select('*').order('sort_order');
    if (filter !== 'all') query = query.eq('category', filter);
    const { data, error } = await query;
    if (error) setOpError('Failed to load products.');
    else setProducts(data || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => { if (admin) load(); }, [admin, load]);

  const closeModal = () => setModal({ open: false, form: { ...emptyForm } });

  const openNew = () => {
    setFeaturesInput('');
    setModal({ open: true, form: { ...emptyForm } });
  };

  const openEdit = (p: Product) => {
    setFeaturesInput(p.features.join(', '));
    setModal({ open: true, form: { ...p } });
  };

  const save = async () => {
    setSaving(true);
    setOpError(null);
    const features = featuresInput.split(',').map(f => f.trim()).filter(Boolean);
    const { id, ...rest } = { ...modal.form, features };

    const { error } = id
      ? await supabase.from('products').update(rest).eq('id', id)
      : await supabase.from('products').insert({ ...rest });

    if (error) {
      setOpError('Failed to save product. Please try again.');
    } else {
      closeModal();
      load();
    }
    setSaving(false);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product permanently?')) return;
    setOpError(null);
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) setOpError('Failed to delete product. Please try again.');
    else setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateField = (field: keyof ProductForm, value: string | number) =>
    setModal(prev => ({ ...prev, form: { ...prev.form, [field]: value } }));

  const fieldInput = (label: string, field: keyof ProductForm, type = 'text') => (
    <div key={field}>
      <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={(modal.form[field] as string | number) ?? ''}
        onChange={e => updateField(field, type === 'number' ? Number(e.target.value) : e.target.value)}
        className="w-full px-4 py-2.5 text-sm bg-gray-800 border border-gray-700 focus:border-crimson rounded-xl outline-none text-white"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Products</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select value={filter} onChange={e => setFilter(e.target.value)}
              className="appearance-none bg-gray-800 border border-gray-700 text-sm text-white rounded-xl px-4 py-2 pr-8 focus:outline-none focus:border-crimson">
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-crimson text-white text-sm font-semibold rounded-xl hover:bg-crimson-dark transition-colors">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {opError && (
        <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{opError}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-crimson border-t-transparent rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No products found</p>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">Price</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-5 py-3 text-sm text-white font-medium">{p.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-400 hidden sm:table-cell">{p.category}</td>
                  <td className="px-5 py-3 text-sm text-gray-400 hidden md:table-cell">{p.price || '-'}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} aria-label="Edit product" className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => deleteProduct(p.id)} aria-label="Delete product" className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal.open && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50" onClick={closeModal} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{modal.form.id ? 'Edit Product' : 'Add Product'}</h3>
                <button onClick={closeModal} aria-label="Close" className="p-2 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-3">
                {fieldInput('Name', 'name')}
                {fieldInput('Price', 'price')}
                {fieldInput('Capacity', 'capacity')}
                {fieldInput('Voltage', 'voltage')}
                {fieldInput('Image URL', 'image_url')}
                {fieldInput('Link href', 'href')}
                {fieldInput('Sort Order', 'sort_order', 'number')}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Category</label>
                  <select value={modal.form.category} onChange={e => updateField('category', e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-800 border border-gray-700 focus:border-crimson rounded-xl outline-none text-white">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Description</label>
                  <textarea value={modal.form.description || ''} onChange={e => updateField('description', e.target.value)} rows={3}
                    className="w-full px-4 py-2.5 text-sm bg-gray-800 border border-gray-700 focus:border-crimson rounded-xl outline-none text-white resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Features (comma separated)</label>
                  <input type="text" value={featuresInput} onChange={e => setFeaturesInput(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-800 border border-gray-700 focus:border-crimson rounded-xl outline-none text-white"
                    placeholder="Feature 1, Feature 2, Feature 3" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={closeModal} className="flex-1 py-2.5 border border-gray-700 text-gray-400 rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium">Cancel</button>
                <button onClick={save} disabled={saving} className="flex-1 py-2.5 bg-crimson text-white rounded-xl hover:bg-crimson-dark transition-colors text-sm font-semibold disabled:opacity-60">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProducts;
