import { useHistory } from 'react-router-dom';
import { Grid, Header, Image } from 'semantic-ui-react';
import logo from '../../../../assets/images/logo.svg';
import { BRBButton } from '../../../../components/BRBButton/BRBButton';
import './SignUpHeader.less';

export interface Props {
  signUp: boolean;
}
export const SignUpHeader = ({ signUp }: Props) => {
  const history = useHistory();
  const login = () => {
    history.push('/signin');
  };
  const register = () => {
    history.push('/signup');
  };
  return (
    <div className="sign-up-banner">
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Image src={logo} />
          </Grid.Column>

          <Grid.Column textAlign="right">
            {signUp && (
              <div className="already-member">
                <Header as="h5">Already a member?</Header>
                <BRBButton onClick={login}>Sign In</BRBButton>
              </div>
            )}
            {!signUp && (
              <div className="already-member">
                <Header as="h5">Don’t have an account?</Header>
                <BRBButton onClick={register}>Sign Up</BRBButton>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
