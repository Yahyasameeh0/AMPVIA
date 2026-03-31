import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from 'lucide-react';

interface NotificationProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose: () => void;
}

export function Notification({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose 
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-amber-600',
    error: 'bg-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -50, x: '-50%' }}
      className={`fixed top-24 left-1/2 z-50 ${bgColors[type]} text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-3`}
    >
      <Bell className="w-5 h-5" />
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

interface AnnouncementBarProps {
  message: string;
  onClose: () => void;
}

export function AnnouncementBar({ message, onClose }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('announcement-closed');
    if (stored) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('announcement-closed', 'true');
    onClose();
  };

  if (!isVisible || !message) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-crimson dark:bg-crimson-light text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium text-center flex-1">{message}</p>
            </div>
            <button
              onClick={handleClose}
              className="hover:bg-white/20 rounded-full p-1 transition-colors flex-shrink-0"
              aria-label="Close announcement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
