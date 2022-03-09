/**
 *
 * GridScroll
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LocationBlock from './LocationBlock'

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: ${props =>
    props.colNumber
      ? `10px repeat(${props.colNumber}, 300px) 10px`
      : '10px repeat(6, 300px) 10px'};
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

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

class GridScroll extends React.Component {
  render() {
    const { items, itemCount } = this.props

    return (
      <GridContainer colNumber={itemCount || (items && items.length)}>
        {items &&
          items.map(item => (
            <LocationBlock
              key={item.name}
              city={item.name}
              country={item.country}
              byline={item.byline}
              img={item.url}
              toggled
            />
          ))}
        {this.props.children}
      </GridContainer>
    )
  }
}

GridScroll.propTypes = {
  items: PropTypes.array,
  itemCount: PropTypes.number,
}

export default GridScroll
