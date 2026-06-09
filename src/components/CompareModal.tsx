import { useEffect } from 'react';
import { X, ShoppingBag, CircleCheck as CheckCircle, Circle as XCircle, ArrowRight, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare, type CompareProduct } from '../context/CompareContext';
import { useCart } from '../context/CartContext';

const SPEC_ROWS: { label: string; key: keyof CompareProduct }[] = [
  { label: 'Category',       key: 'category'      },
  { label: 'Voltage Range',  key: 'voltage'        },
  { label: 'Specifications', key: 'specs'          },
  { label: 'Certification',  key: 'certification'  },
  { label: 'Description',    key: 'description'    },
];

const FEATURES: { label: string; fn: (p: CompareProduct) => boolean }[] = [
  { label: 'IEC Certified',    fn: p => p.certification.includes('IEC') },
  { label: 'CE Marked',        fn: p => p.certification.includes('CE')  },
  { label: 'High Voltage',     fn: p => p.voltage.toLowerCase().includes('kv') || parseInt(p.voltage) >= 400 },
  { label: 'Industrial Grade',  fn: p => ['Industrial Systems','Distribution Panels'].includes(p.category) },
  { label: 'Energy Efficient',  fn: p => p.category === 'Lighting Solutions' },
  { label: 'RoHS Compliant',    fn: p => p.certification.includes('RoHS') },
];

const CompareModal = () => {
  const { items, remove, clear, closeModal, isOpen } = useCompare();
  const { add: addToCart, open: openCart } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeModal]);

  if (!isOpen || items.length === 0) return null;

  const handleQuote = (p: CompareProduct) => {
    addToCart({ id: p.id, name: p.name, category: p.category, image: p.image, href: p.href });
    closeModal();
    openCart();
  };

  const cols = `200px repeat(${items.length}, 1fr)`;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeModal} />

      <div className="relative flex flex-col h-full max-h-screen" style={{ background: 'rgba(10,10,18,0.98)' }}>
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-crimson/20 flex items-center justify-center">
              <GitCompare className="w-5 h-5 text-crimson-light" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: '"DM Serif Display", serif' }}>Product Comparison</h2>
              <p className="text-gray-500 text-xs">Comparing {items.length} products side by side</p>
            </div>
          </div>
          <button onClick={closeModal} aria-label="Close comparison" className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="min-w-[600px] space-y-6">

            {/* Product headers */}
            <div className="grid gap-4" style={{ gridTemplateColumns: cols }}>
              <div />
              {items.map(p => (
                <div key={p.id} className="relative group">
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    <div className="relative h-36 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <button onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-crimson-light">{p.category}</span>
                      <h3 className="text-white font-semibold text-sm mt-1 leading-tight" style={{ fontFamily: '"DM Serif Display", serif' }}>{p.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Specs */}
            <div className="space-y-1">
              <div className="grid gap-4 px-4 py-2" style={{ gridTemplateColumns: cols }}>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-crimson">Specifications</span>
              </div>
              {SPEC_ROWS.map((row, ri) => (
                <div key={row.key} className={`grid gap-4 px-4 py-3 rounded-xl items-center ${ri % 2 === 0 ? 'bg-white/3' : ''}`} style={{ gridTemplateColumns: cols }}>
                  <span className="text-xs text-gray-500 font-medium">{row.label}</span>
                  {items.map(p => (
                    <span key={p.id} className="text-sm text-white font-medium">{String(p[row.key])}</span>
                  ))}
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-1">
              <div className="grid gap-4 px-4 py-2" style={{ gridTemplateColumns: cols }}>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-crimson">Features</span>
              </div>
              {FEATURES.map((feat, fi) => (
                <div key={feat.label} className={`grid gap-4 px-4 py-3 rounded-xl items-center ${fi % 2 === 0 ? 'bg-white/3' : ''}`} style={{ gridTemplateColumns: cols }}>
                  <span className="text-xs text-gray-500 font-medium">{feat.label}</span>
                  {items.map(p => {
                    const yes = feat.fn(p);
                    return (
                      <div key={p.id} className="flex items-center gap-1.5">
                        {yes ? <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-gray-700 flex-shrink-0" />}
                        <span className={`text-xs font-medium ${yes ? 'text-green-400' : 'text-gray-600'}`}>{yes ? 'Yes' : 'No'}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="grid gap-4 pt-4 border-t border-white/8" style={{ gridTemplateColumns: cols }}>
              <div className="flex items-center"><span className="text-xs text-gray-500 font-medium">Actions</span></div>
              {items.map(p => (
                <div key={p.id} className="flex flex-col gap-2">
                  <button onClick={() => handleQuote(p)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-crimson text-white text-xs font-semibold rounded-xl hover:bg-crimson-dark transition-colors">
                    <ShoppingBag className="w-3.5 h-3.5" /> Get Quote
                  </button>
                  <Link to={p.href} onClick={closeModal} className="flex items-center justify-center gap-1.5 px-4 py-2 border border-white/10 text-gray-400 hover:text-white text-xs font-medium rounded-xl hover:bg-white/5 transition-colors">
                    View Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-t border-white/8">
          <p className="text-xs text-gray-600">
            {items.length < 3 ? `You can add ${3 - items.length} more product${3 - items.length > 1 ? 's' : ''}` : 'Maximum 3 products selected'}
          </p>
          <button onClick={clear} className="text-xs text-gray-500 hover:text-crimson transition-colors font-medium">Clear all & close</button>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
