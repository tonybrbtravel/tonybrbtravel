import { ReactNode } from 'react';

import './BRBPinkText.less';

export interface Props {
  children: ReactNode;
  size?:
  | 'tiny'
  | 'mini'
  | 'small'
  | 'big'
  | 'huge'
  | 'large'
  | 'massive'
  | string;
}

const BRBPinkText = ({ children, size = '' }: Props) => <span className={`brb-pink-text ${size}`}>{children}</span>;

export default BRBPinkText;
