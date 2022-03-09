/**
 *
 * ReviewScroll
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import trustpilotverified from '../../images/trustpilotverified.png'
import Testimonial from '../Testimonials/Testimonial'

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props =>
    props.colNumber
      ? `10px repeat(${props.colNumber}, 320px) 10px`
      : '10px repeat(6, 400px) 10px'};
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  @media screen and (min-width: 500px) {
    grid-template-columns: ${props =>
      props.colNumber
        ? `10px repeat(${props.colNumber}, 450px) 10px`
        : '10px repeat(6, 400px) 10px'};
  }

  &::before {
    display: block;
    content: '';
    width: 10px;
  }
  &::after {
    display: block;
    content: '';
    width: 10px;
  }
`

const Wrapper = styled.div`
  margin-top: 45px;
  img {
    display: block;
    width: 113px;
    margin: 0 auto 16px auto;
  }
`

class GridScroll extends React.Component {
  render() {
    const { items, itemCount, logoTop } = this.props

    return (
      <div>
        {logoTop && 
          <Wrapper>
            <a
              href="https://www.trustpilot.com/review/berightback.travel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={trustpilotverified} alt="Trustpilot verified reviews" />
            </a>
          </Wrapper>
        }
        <GridContainer colNumber={itemCount || (items && items.length)}>
          {items &&
            items.map(item => <Testimonial key={item.author} review={item} />)}
        </GridContainer>
        {!logoTop && 
          <Wrapper>
            <a
              href="https://www.trustpilot.com/review/berightback.travel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={trustpilotverified} alt="Trustpilot verified reviews" />
            </a>
          </Wrapper>
        }
      </div>
    )
  }
}

GridScroll.propTypes = {
  items: PropTypes.array,
  itemCount: PropTypes.number,
}

export default GridScroll
