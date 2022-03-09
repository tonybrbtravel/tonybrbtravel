/**
 *
 * BodyContainer
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class BodyContainer extends React.Component {
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
  max-width: 960px;
  padding: 0 10px;
  margin: auto;
  display: ${props => (props.flex ? 'flex' : '')};
  align-items: ${props => (props.flexAlign ? props.flexAlign : 'center')};
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : ''};
  flex-wrap: wrap;
  overflow: visible;

  @media screen and (min-width: 600px) {
    flex-wrap: nowrap;
  }
  @media screen and (min-width: 1400px) {
    max-width: 1200px;
  }
`

BodyContainer.propTypes = {
  children: PropTypes.any,
  flex: PropTypes.bool,
  flexAlign: PropTypes.string,
  justifyContent: PropTypes.string,
}

export default BodyContainer
