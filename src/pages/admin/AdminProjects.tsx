import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { usePageTitle } from '../../hooks/use-page-title';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string | null;
  location: string | null;
  image_url: string | null;
  sort_order: number;
}

type ProjectForm = Omit<Project, 'id'> & { id?: string };

const PROJECT_CATEGORIES = ['Commercial', 'Industrial', 'Residential', 'Infrastructure'];

const emptyForm: ProjectForm = {
  title: '', category: PROJECT_CATEGORIES[0], description: '', location: '', image_url: '', sort_order: 0,
};

const AdminProjects = () => {
  usePageTitle('Manage Projects | AMPVIA');
  const { admin } = useAdminAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; form: ProjectForm }>({ open: false, form: { ...emptyForm } });
  const [saving, setSaving] = useState(false);
  const [opError, setOpError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('sort_order');
    if (error) setOpError('Failed to load projects.');
    else setProjects(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { if (admin) load(); }, [admin, load]);

  const closeModal = () => setModal({ open: false, form: { ...emptyForm } });

  const openNew = () => setModal({ open: true, form: { ...emptyForm } });

  const openEdit = (p: Project) => setModal({ open: true, form: { ...p } });

  const save = async () => {
    setSaving(true);
    setOpError(null);
    const { id, ...rest } = modal.form;

    const { error } = id
      ? await supabase.from('projects').update(rest).eq('id', id)
      : await supabase.from('projects').insert({ ...rest });

    if (error) {
      setOpError('Failed to save project. Please try again.');
    } else {
      closeModal();
      load();
    }
    setSaving(false);
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project permanently?')) return;
    setOpError(null);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) setOpError('Failed to delete project. Please try again.');
    else setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateField = (field: keyof ProjectForm, value: string | number) =>
    setModal(prev => ({ ...prev, form: { ...prev.form, [field]: value } }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Projects</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-crimson text-white text-sm font-semibold rounded-xl hover:bg-crimson-dark transition-colors">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {opError && (
        <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{opError}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-crimson border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No projects found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 group">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-crimson/10 text-crimson uppercase">{p.category}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(p)} aria-label="Edit project" className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteProject(p.id)} aria-label="Delete project" className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{p.title}</h3>
              {p.location && <p className="text-xs text-gray-500 mb-2">{p.location}</p>}
              {p.description && <p className="text-xs text-gray-400 line-clamp-2">{p.description}</p>}
            </div>
          ))}
        </div>
      )}

      {modal.open && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50" onClick={closeModal} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{modal.form.id ? 'Edit Project' : 'Add Project'}</h3>
                <button onClick={closeModal} aria-label="Close" className="p-2 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-3">
                {(
                  [
                    { label: 'Title', field: 'title' },
                    { label: 'Location', field: 'location' },
                    { label: 'Image URL', field: 'image_url' },
                    { label: 'Sort Order', field: 'sort_order', type: 'number' },
                  ] as { label: string; field: keyof ProjectForm; type?: string }[]
                ).map(({ label, field, type = 'text' }) => (
                  <div key={field}>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={(modal.form[field] as string | number) ?? ''}
                      onChange={e => updateField(field, type === 'number' ? Number(e.target.value) : e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-gray-800 border border-gray-700 focus:border-crimson rounded-xl outline-none text-white"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Category</label>
                  <select value={modal.form.category} onChange={e => updateField('category', e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-800 border border-gray-700 focus:border-crimson rounded-xl outline-none text-white">
                    {PROJECT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Description</label>
                  <textarea value={modal.form.description || ''} onChange={e => updateField('description', e.target.value)} rows={3}
                    className="w-full px-4 py-2.5 text-sm bg-gray-800 border border-gray-700 focus:border-crimson rounded-xl outline-none text-white resize-none" />
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

export default AdminProjects;
