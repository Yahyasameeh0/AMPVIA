import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface Image {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: Image[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex = 0, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoom(1);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoom(1);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-50"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomOut();
            }}
            disabled={zoom <= 1}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors disabled:opacity-30"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomIn();
            }}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 text-white text-sm z-50">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Main Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: zoom, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl max-h-[85vh] p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
          <p className="text-white text-center mt-4 text-lg">{images[currentIndex].alt}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
