import { useEffect, useState } from 'react';
import { FileText, Package, FolderOpen, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { usePageTitle } from '../../hooks/use-page-title';

interface Stats {
  totalQuotes: number;
  newQuotes: number;
  totalProducts: number;
  totalProjects: number;
}

interface RecentQuote {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new:    'bg-blue-500/10 text-blue-400',
  read:   'bg-yellow-500/10 text-yellow-400',
  quoted: 'bg-green-500/10 text-green-400',
  closed: 'bg-gray-500/10 text-gray-400',
};

const AdminDashboard = () => {
  usePageTitle('Admin Dashboard | AMPVIA');
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState<Stats>({ totalQuotes: 0, newQuotes: 0, totalProducts: 0, totalProjects: 0 });
  const [recent, setRecent] = useState<RecentQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) return;

    const load = async () => {
      const [recentRes, totalQuotesRes, newQuotesRes, productsRes, projectsRes] = await Promise.all([
        supabase.from('quote_requests').select('id, name, email, subject, status, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('quote_requests').select('id', { count: 'exact', head: true }),
        supabase.from('quote_requests').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        totalQuotes:   totalQuotesRes.count  ?? 0,
        newQuotes:     newQuotesRes.count    ?? 0,
        totalProducts: productsRes.count     ?? 0,
        totalProjects: projectsRes.count     ?? 0,
      });
      setRecent(recentRes.data || []);
      setLoading(false);
    };

    load();
  }, [admin]);

  const cards = [
    { label: 'Total Quotes',  value: stats.totalQuotes,   icon: FileText,  color: 'text-blue-400',   bg: 'bg-blue-500/10' },
    { label: 'New Quotes',    value: stats.newQuotes,     icon: Eye,       color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Products',      value: stats.totalProducts, icon: Package,   color: 'text-green-400',  bg: 'bg-green-500/10' },
    { label: 'Projects',      value: stats.totalProjects, icon: FolderOpen,color: 'text-crimson',    bg: 'bg-crimson/10' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-white">Dashboard</h2>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-crimson border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map(c => (
              <div key={c.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className={`inline-flex items-center justify-center w-10 h-10 ${c.bg} rounded-xl mb-3`}>
                  <c.icon className={`w-5 h-5 ${c.color}`} />
                </div>
                <p className="text-2xl font-bold text-white">{c.value}</p>
                <p className="text-xs text-gray-500 mt-1">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h3 className="font-semibold text-white">Recent Quotes</h3>
              <Link to="/admin/quotes" className="text-xs text-crimson hover:underline">View all</Link>
            </div>
            {recent.length === 0 ? (
              <p className="text-sm text-gray-500 p-6 text-center">No quotes yet</p>
            ) : (
              <div className="divide-y divide-gray-800">
                {recent.map(q => (
                  <div key={q.id} className="flex items-center justify-between px-6 py-3.5">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{q.name}</p>
                      <p className="text-xs text-gray-500 truncate">{q.subject || q.email}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase ${STATUS_COLORS[q.status] ?? STATUS_COLORS.new}`}>
                        {q.status}
                      </span>
                      <span className="text-xs text-gray-500 hidden sm:block">{new Date(q.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/admin/quotes" className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-crimson/30 transition-colors group">
              <p className="text-sm font-semibold text-white group-hover:text-crimson transition-colors">Manage Quotes</p>
              <p className="text-xs text-gray-500 mt-1">Review and update quote requests</p>
            </Link>
            <Link to="/admin/products" className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-crimson/30 transition-colors group">
              <p className="text-sm font-semibold text-white group-hover:text-crimson transition-colors">Manage Products</p>
              <p className="text-xs text-gray-500 mt-1">Add, edit or remove products</p>
            </Link>
            <Link to="/admin/projects" className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-crimson/30 transition-colors group">
              <p className="text-sm font-semibold text-white group-hover:text-crimson transition-colors">Manage Projects</p>
              <p className="text-xs text-gray-500 mt-1">Update featured projects</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
