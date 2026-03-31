import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Lightbox } from '@/components/Lightbox/Lightbox';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  images?: string[];
  description: string;
  features: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useAppStore((state) => state.addToCart);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const favorites = useAppStore((state) => state.favorites);
  
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([]);
  
  const isFavorite = favorites.includes(product.id);

  const handleImageClick = () => {
    const images = product.images?.length 
      ? product.images.map(img => ({ src: img, alt: product.name }))
      : [{ src: product.image, alt: product.name }];
    
    setLightboxImages(images);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square cursor-pointer" onClick={handleImageClick}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <motion.button
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation();
                handleImageClick();
              }}
              className="p-3 bg-white rounded-full text-gray-900 hover:bg-crimson hover:text-white transition-colors"
              title="Quick View"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product.id);
              }}
              className={`p-3 rounded-full transition-colors ${
                isFavorite 
                  ? 'bg-crimson text-white' 
                  : 'bg-white text-gray-900 hover:bg-crimson hover:text-white'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
          </div>

          {/* Favorite Badge */}
          {isFavorite && (
            <div className="absolute top-3 right-3 p-2 bg-crimson rounded-full">
              <Heart className="w-4 h-4 text-white fill-current" />
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-crimson-dark dark:text-white text-xs font-medium rounded-full">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <ul className="mb-4 space-y-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-crimson rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-crimson dark:text-crimson-light">
              {product.price}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="px-4 py-2 bg-crimson text-white text-sm font-medium rounded-xl hover:bg-crimson-dark transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
