/**
 *
 * ModalWindow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Colors from '../../themes/Colors';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.offWhite};
  min-height: 400px;

  @media screen and (min-width: 720px) {
    flex-direction: ${(props) => props.reversed ? 'row' : 'row-reverse'};
    max-height: 600px;
  }
`;

const Container = styled.div`
  width: 100%;
  @media screen and (min-width: 720px) {
    width: 50%;
  }
`;

const TextContainer = styled(Container)`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    max-width: 420px;

    ul {
      padding-inline-start: 18px;
    }
  }
`;

const A = styled.a`
  display: inline-block;
  color: ${Colors.red};
  font-size: 18px;
  margin: 30px 0 20px 0;
  position: relative;

  &::after {
    content: '→';
    display: block;
    transform: translate(0, 0);
    position: absolute;
    right: -30px;
    top: 0px;

    transition: transform 0.2s;
  }

  &:hover {
    &::after {
      transform: translate(6px, 0);
    }
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover!important;
`

class ImageText extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const { image, reversed, ctaLink, ctaText } = this.props;
    return (
      <Wrapper reversed={reversed}>
        <Container>
          {image &&
            <Img src={image} alt="BRB Travellers" />
          }
        </Container>
        <TextContainer>
          <div>
            {this.props.children}
            <A href={ctaLink}>{ctaText}</A>
          </div>
        </TextContainer>
      </Wrapper>
    );
  }
}

ImageText.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  ctaLink: PropTypes.string,
  ctaText: PropTypes.string,
  image: PropTypes.object,
  reversed: PropTypes.bool,
};

export default ImageText;
