import { ReactNode } from 'react';
import { toast } from 'react-toastify';
import { BRBNotification } from './BRBNotification';

export interface Notification {
  title: ReactNode;
  content: ReactNode;
  link?: string;
  onClick?: () => void;
  inverted?: boolean;
  image?: ReactNode;
}

export const showNotification = {
  success: (notification: Notification) => toast((props) => (
    <BRBNotification {...props} {...notification} type="success" />
  )),
  error: (notification: Notification) => toast((props) => (
    <BRBNotification {...props} {...notification} type="error" />
  )),
  info: (notification: Notification) => toast((props) => (
    <BRBNotification {...props} {...notification} type="info" />
  )),
  warning: (notification: Notification) => toast((props) => (
    <BRBNotification {...props} {...notification} type="warning" />
  )),
};
