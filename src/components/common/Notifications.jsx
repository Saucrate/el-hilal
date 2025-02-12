import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle',
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`${colors[type]} text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px]`}
    >
      <i className={icons[type]} />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-white/80 hover:text-white">
        <i className="fas fa-times" />
      </button>
    </motion.div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // Expose the addNotification function globally
  window.notify = addNotification;

  return createPortal(
    <div className="fixed bottom-4 right-4 space-y-4 z-50">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default Notifications; 