import { X, GitCompare, Plus } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

const CompareBar = () => {
  const { items, remove, clear, openModal } = useCompare();

  if (items.length === 0) return null;

  return (
    <div
      className="fixed bottom-20 lg:bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none"
      style={{ padding: '0 0 env(safe-area-inset-bottom)' }}
    >
      <div
        className="pointer-events-auto mx-4 mb-4 lg:mb-6 w-full max-w-2xl rounded-2xl shadow-deep border border-white/10 overflow-hidden"
        style={{
          background: 'rgba(10,10,18,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Icon + label */}
          <div className="flex items-center gap-2 mr-1">
            <div className="w-8 h-8 rounded-lg bg-crimson/20 flex items-center justify-center flex-shrink-0">
              <GitCompare className="w-4 h-4 text-crimson-light" />
            </div>
            <span className="text-xs font-semibold text-gray-400 whitespace-nowrap hidden sm:block">Compare</span>
          </div>

          {/* Product slots */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-xl px-2.5 py-1.5 min-w-0 group"
              >
                <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-white truncate max-w-[80px] sm:max-w-[110px] font-medium">{item.name}</span>
                <button
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Empty slot placeholder */}
            {items.length < 3 && (
              <div className="flex items-center gap-1.5 border border-dashed border-white/15 rounded-xl px-2.5 py-1.5">
                <Plus className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-xs text-gray-600 hidden sm:block">Add product</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={clear}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 hidden sm:block"
            >
              Clear
            </button>
            <button
              onClick={openModal}
              disabled={items.length < 2}
              className="flex items-center gap-1.5 px-4 py-2 bg-crimson text-white text-xs font-semibold rounded-xl hover:bg-crimson-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <GitCompare className="w-3.5 h-3.5" />
              Compare {items.length < 2 ? `(${items.length}/2)` : `${items.length}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
