import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, Phone, Building, Trash2, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { usePageTitle } from '../../hooks/use-page-title';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string | null;
  items: unknown;
  status: string;
  source: string;
  created_at: string;
  updated_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  read: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  quoted: 'bg-green-500/10 text-green-400 border-green-500/20',
  closed: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const STATUS_OPTIONS = ['new', 'read', 'quoted', 'closed'];

const AdminQuotes = () => {
  usePageTitle('Manage Quotes | AMPVIA');
  const { admin } = useAdminAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    let query = supabase.from('quote_requests').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter);
    const { data } = await query;
    setQuotes(data || []);
    setLoading(false);
  };

  useEffect(() => { if (admin) load(); }, [admin, filter]);

  if (!admin) return <Navigate to="/admin/login" replace />;

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('quote_requests').update({ status }).eq('id', id);
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  const deleteQuote = async (id: string) => {
    if (!confirm('Delete this quote?')) return;
    await supabase.from('quote_requests').delete().eq('id', id);
    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Quote Requests</h2>
        <div className="relative">
          <select
            value={filter}
            onChange={e => { setFilter(e.target.value); setLoading(true); }}
            className="appearance-none bg-gray-800 border border-gray-700 text-sm text-white rounded-xl px-4 py-2 pr-8 focus:outline-none focus:border-crimson"
          >
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-crimson border-t-transparent rounded-full animate-spin" />
        </div>
      ) : quotes.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No quotes found</p>
      ) : (
        <div className="space-y-3">
          {quotes.map(q => (
            <div key={q.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-white truncate">{q.name}</p>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border uppercase ${STATUS_COLORS[q.status] || STATUS_COLORS.new}`}>
                      {q.status}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">{q.source}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate">{q.subject || q.email}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-xs text-gray-500 hidden sm:block">{new Date(q.created_at).toLocaleDateString()}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded === q.id ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {expanded === q.id && (
                <div className="px-5 pb-5 border-t border-gray-800 pt-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Mail className="w-4 h-4" /> {q.email}
                    </div>
                    {q.phone && <div className="flex items-center gap-2 text-gray-400"><Phone className="w-4 h-4" /> {q.phone}</div>}
                    {q.company && <div className="flex items-center gap-2 text-gray-400"><Building className="w-4 h-4" /> {q.company}</div>}
                  </div>
                  {q.message && (
                    <p className="text-sm text-gray-300 bg-gray-800 rounded-xl p-4 whitespace-pre-wrap">{q.message}</p>
                  )}
                  {Array.isArray(q.items) && q.items.length > 0 && (
                    <div className="text-sm text-gray-300 bg-gray-800 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-2">Cart Items:</p>
                      <ul className="space-y-1">
                        {(q.items as { name: string; category: string }[]).map((item, i) => (
                          <li key={i} className="text-xs">{item.name} <span className="text-gray-500">({item.category})</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex items-center gap-3 pt-2">
                    <select
                      value={q.status}
                      onChange={e => updateStatus(q.id, e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-sm text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-crimson"
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                    <button
                      onClick={() => deleteQuote(q.id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminQuotes;
