import { useEffect } from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistDrawer = () => {
  const { items, remove, clear, close: closeDrawer, isOpen } = useWishlist();
  const { add: addToCart, open: openCart } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleQuote = (item: typeof items[0]) => {
    addToCart({ id: item.id, name: item.name, category: item.category, image: item.image, href: item.href });
    closeDrawer();
    openCart();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={closeDrawer} />
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-950 z-[101] shadow-deep flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-crimson fill-crimson" />
            <h2 className="font-bold text-lg text-crimson-dark dark:text-white" style={{ fontFamily: '"DM Serif Display", serif' }}>
              Wishlist
            </h2>
            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full font-medium">{items.length}</span>
          </div>
          <button onClick={closeDrawer} aria-label="Close wishlist" className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-crimson-dark dark:hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-5">
              <Heart className="w-9 h-9 text-gray-300 dark:text-gray-600" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">Your wishlist is empty</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Save products you're interested in to review later.</p>
            <button onClick={closeDrawer} className="px-6 py-2.5 bg-crimson text-white text-sm font-semibold rounded-full hover:bg-crimson-dark transition-colors">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-auto py-4">
            <div className="px-6 space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl group hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Link to={item.href} onClick={closeDrawer} className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-crimson uppercase tracking-widest font-semibold">{item.category}</span>
                    <Link to={item.href} onClick={closeDrawer}>
                      <p className="text-sm font-semibold text-crimson-dark dark:text-white truncate hover:text-crimson transition-colors">{item.name}</p>
                    </Link>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button onClick={() => handleQuote(item)} aria-label={`Quote ${item.name}`} className="w-8 h-8 rounded-lg bg-crimson/10 flex items-center justify-center text-crimson hover:bg-crimson hover:text-white transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`} className="w-8 h-8 rounded-lg bg-gray-200/60 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex gap-3">
              <button onClick={clear} className="flex-1 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-500 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Clear All
              </button>
              <button
                onClick={() => {
                  items.forEach(item => addToCart({ id: item.id, name: item.name, category: item.category, image: item.image, href: item.href }));
                  clear(); closeDrawer(); openCart();
                }}
                className="flex-1 py-2.5 bg-crimson text-white text-sm font-semibold rounded-xl hover:bg-crimson-dark transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Quote All
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistDrawer;
