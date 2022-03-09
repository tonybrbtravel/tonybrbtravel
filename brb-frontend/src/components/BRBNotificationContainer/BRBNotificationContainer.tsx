import React from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BRBNotificationContainer.less';

type Props = ToastContainerProps;

export const BRBNotificationContainer: React.VFC<Props> = (props) => (
  <ToastContainer
    closeButton={false}
    limit={3}
    autoClose={6000}
    hideProgressBar
    className="brb-notification-container__container"
    toastClassName="brb-notification-container__notification"
    bodyClassName="brb-notification-container__body"
    closeOnClick={false}
    draggable={false}
    {...props}
  />
);
