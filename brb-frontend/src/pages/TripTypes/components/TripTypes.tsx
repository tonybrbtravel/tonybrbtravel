import { Container } from 'semantic-ui-react';
import './TripTypes.less';
import { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}
export const TripTypes = ({ children }: Props) => (
  <div className="TripTypes-banner">
    <Container>{children}</Container>
  </div>
);
