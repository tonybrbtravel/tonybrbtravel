import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { ToastContentProps } from 'react-toastify';
import { Header } from 'semantic-ui-react';

import './BRBNotification.less';

export interface Props extends ToastContentProps {
  type: 'success' | 'warning' | 'info' | 'error';
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  inverted?: boolean;
  image?: ReactNode;
}

export const BRBNotification = ({
  content,
  title,
  type,
  inverted,
  closeToast,
  image,
}: Props) => {
  const renderImage = () => image;

  return (
    <div className={clsx(`brb-notification ${type}`, { inverted })}>
      <svg className="close" onClick={closeToast} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 17 17" fill="none">
        <path d="M15 2L2 15" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 2L15 15" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="content">
        <div className="image">{renderImage()}</div>
        <div className="text">
          <Header as="h4">{title}</Header>
          {content}
        </div>
      </div>
    </div>
  );
};
