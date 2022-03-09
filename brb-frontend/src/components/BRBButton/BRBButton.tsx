import clsx from 'clsx';
import { Button, ButtonProps } from 'semantic-ui-react';
import './BRBButton.less';

export interface Props
  extends Omit<ButtonProps, 'color' | 'circular' | 'primary'> {
  className?: string;
}

export const BRBButton = (props: Props) => {
  const {
    icon,
    fluid,
    labelPosition,
    onClick,
    className,
    children,
  } = props;

  return (
    <Button
      icon={icon}
      fluid={fluid}
      labelPosition={
        icon && !labelPosition ? 'left' : labelPosition
      }
      secondary
      {...props}
      circular
      className={clsx('brb-button', className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
