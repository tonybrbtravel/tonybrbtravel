import { ReactNode } from 'react';
import { Container } from 'semantic-ui-react';

import { SignUpHeader } from '../../features/sign-up/components/SignUpHeader/SignUpHeader';
import BackgroundImage from '../BackgroundImage';

import './Layout.less';

export interface Props {
  children: ReactNode;
  signUp?: boolean;
}
export const Layout = ({ children, signUp = false }: Props) => (
  <>
    {!signUp && <BackgroundImage src="signin_bg.png" isActive />}
    <Container fluid>
      <SignUpHeader signUp={signUp} />
      <div className="sign-up">{children}</div>
    </Container>
  </>
);
