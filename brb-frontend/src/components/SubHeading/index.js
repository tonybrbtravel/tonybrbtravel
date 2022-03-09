import styled from 'styled-components';

const Heading = styled.h2`
  font-size: 24px;
  line-height: 30px;
  @media screen and (min-width: 600px) {
    font-size: 36px;
    line-height: 46px;
  }
`;

export const SubHeading = (props) => {
  const { children } = props;
  return (
    <Heading {...props}>
      {children}
    </Heading>
  );
};
