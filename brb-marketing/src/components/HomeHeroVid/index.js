/**
 *
 * MarketingHomeHero
 *
 */

import React from 'react'
import BodyContainer from '../BodyContainer'

import { Wrapper, ContentWrapper, Title, P, CTAc, Lightbox, ImgWrapper } from './styles'
import styled from 'styled-components'

import img1 from '../../images/customers/1.jpg';
import img3 from '../../images/customers/3.jpg';
import img4 from '../../images/customers/4.jpg';
import img5 from '../../images/customers/5.jpg';
import img6 from '../../images/customers/6.jpg';
import img7 from '../../images/customers/7.jpg';
import img8 from '../../images/customers/8.jpg';

const Img = styled.div`
  background-image: ${(props) => props.source ? `url(${props.source})` : ''};
  width: 100%;
  height: 100%;
  min-height: 50vh;
  background-size: cover;
  background-position: ${(props) => props.position ? props.position : '50% 50%'};

  @media screen and (min-width: 620px) {
    min-height: 90vh;
  }
`

const imgArray = [
  {
    photo: img1,
    insta: '@gregorygaige',
    destination: 'Barcelona',
    position: '50% 0%'
  },
  {
    photo: img3,
    insta: '@matthewjamescunningtonthethird',
    destination: 'Copenhagen',
    position: '100% 100%'
  },
  {
    photo: img4,
    insta: '@lucyjanewood',
    destination: 'Vienna',
    position: '50% 50%'
  },
  {
    photo: img5,
    insta: '@jason_parmar',
    destination: 'Prague',
    position: '50% 100%'
  },
  {
    photo: img6,
    insta: '@amberphillipsdesign',
    destination: 'Pisa',
    position: '50% 100%'
  },
  {
    photo: img7,
    insta: '@olivia.prinsloo',
    destination: 'Bologna',
    position: '50% 50%'
  },
  {
    photo: img8,
    insta: '@anoushkalila',
    destination: 'Lake Como',
    position: '50% 100%'
  },
]

class HomeHero extends React.Component {
  constructor(props) {
    super(props);

    this.state = { index: 0 }
  }

  componentDidMount() {
    this.play()
  }

  play() {
    setTimeout(() => {
      this.nextSlide();
      this.play();
    }, 2000);
  }

  nextSlide() {
    const { index } = this.state;
    const numItems = imgArray.length || 1;
      this.setState({
        index: index === numItems - 1 ? 0 : index + 1,
      });
  }

  render() {
    const { title1, title2, body, ctaText, to, smaller, color } = this.props;
    return (
      <Wrapper smaller={smaller}>
        <ImgWrapper>
          <Img 
            source={imgArray[this.state.index].photo}
            alt="Customers travelling with BRB"
            position={imgArray[this.state.index].position} 
          />
          <Lightbox>
            <p>
              <b>{imgArray[this.state.index].insta}</b><br />
              {imgArray[this.state.index].destination}
            </p>
          </Lightbox>
        </ImgWrapper>
        <BodyContainer>
          <ContentWrapper color={color} smaller={smaller}>
          <div className="content">
          <Title>
              {title1} <br />
              <span>{title2}</span>
            </Title>
            {body && body.map(para => <P key={para}>{para}</P>)}
            <CTAc href={to}>{ctaText}</CTAc>
          </div>
          </ContentWrapper>
        </BodyContainer>
      </Wrapper>
    );
  }
}

HomeHero.propTypes = {}

export default HomeHero
