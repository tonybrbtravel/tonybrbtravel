/**
 *
 * TextBlockGrid
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class TextBlockGrid extends React.Component {
  render() {
    return <Div {...this.props}>{this.props.children}</Div>
  }
}

const Div = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px 60px;

  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

TextBlockGrid.propTypes = {
  children: PropTypes.any,
}

export default TextBlockGrid
