import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Notification, NotificationType } from '@/types';
import { NOTIFICATION_DURATION } from '@/utils/constants';

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (type: NotificationType, message: string, duration?: number) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const showNotification = useCallback(
    (type: NotificationType, message: string, duration?: number) => {
      const id = `${Date.now()}-${Math.random()}`;
      const defaultDuration = NOTIFICATION_DURATION[type.toUpperCase() as keyof typeof NOTIFICATION_DURATION];
      const finalDuration = duration !== undefined ? duration : defaultDuration;

      const notification: Notification = {
        id,
        type,
        message,
        duration: finalDuration,
      };

      setNotifications(prev => [...prev, notification]);

      // Auto remove after duration
      if (finalDuration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, finalDuration);
      }
    },
    [removeNotification]
  );

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotification,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
