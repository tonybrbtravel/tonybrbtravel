import styled from 'styled-components';

const Heading1 = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 42px;
  line-height: 42px;
  margin-bottom: 18px;
  letter-spacing: -3px;
  padding: 0px 20px;

  @media screen and (min-width: 600px) {
    font-size: 64px;
    line-height: 61px;
    margin-bottom: 22px;
  }
`;

export function H1(props) {
  const { children } = props;
  return <Heading1 {...props}>{children}</Heading1>;
}
