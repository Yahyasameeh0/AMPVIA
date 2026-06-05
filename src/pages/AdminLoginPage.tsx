import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { usePageTitle } from '../hooks/use-page-title';

const AdminLoginPage = () => {
  usePageTitle('Admin Login | AMPVIA');
  const { admin, login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSending(true);
    const res = await login(email, password);
    setSending(false);
    if (!res.ok) setError(res.error || 'Login failed');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-crimson/10 rounded-2xl mb-5">
            <Lock className="w-7 h-7 text-crimson" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to access the AMPVIA dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8 border border-gray-800 space-y-5">
          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="admin-email" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm bg-gray-800 border border-gray-700 focus:border-crimson rounded-xl outline-none transition-colors text-white"
                placeholder="admin@ampvia.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm bg-gray-800 border border-gray-700 focus:border-crimson rounded-xl outline-none transition-colors text-white"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3.5 bg-crimson text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-crimson-dark transition-colors disabled:opacity-60"
          >
            {sending ? 'Signing in...' : <>Sign In <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">AMPVIA Admin Panel &mdash; Authorized access only</p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
