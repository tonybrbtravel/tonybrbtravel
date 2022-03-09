/**
 *
 * HalfContainer
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class HalfContainer extends React.Component {
  render() {
    const { flex, flexAlign, justifyContent } = this.props
    return (
      <Div flex={flex} flexAlign={flexAlign} justifyContent={justifyContent}>
        {this.props.children}
      </Div>
    )
  }
}

const Div = styled.div`
  width: 100%;
  display: ${props => (props.flex ? 'flex' : 'block')};
  align-items: ${props => (props.flexAlign ? props.flexAlign : '')};
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : ''};
  padding: 0;

  @media screen and (min-width: 600px) {
    width: 50%;
    min-width: 50%;
    padding: 0 10px;
  }
`

HalfContainer.propTypes = {
  children: PropTypes.any,
  flex: PropTypes.bool,
  flexAlign: PropTypes.string,
  justifyContent: PropTypes.string,
}

export default HalfContainer
