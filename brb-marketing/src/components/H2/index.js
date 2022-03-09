/**
 *
 * H1
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Colors from '../../themes/Colors'

export class H2 extends React.Component {
  render() {
    return <H {...this.props}>{this.props.children}</H>
  }
}

export class H2md extends React.Component {
  render() {
    return <Div {...this.props}>{this.props.children}</Div>
  }
}

const H = styled.h2`
  text-align: ${props => (props.align ? props.align : 'center')};
  font-size: 38px;
  color: #373737;
  letter-spacing: -1.09px;
  line-height: 38px;
  margin: 0 0 20px 0;
  padding: 0 12px;

  span, em, strong {
    color: ${Colors.red};
  }
`

const Div = styled.div`
  h2 {
    text-align: ${props => (props.align ? props.align : 'center')};
    font-size: 38px;
    color: #373737;
    letter-spacing: -1.09px;
    line-height: 38px;
    margin: 0 0 20px 0;
    padding: 0 12px;

    span, em, strong {
      color: ${Colors.red};
      font-style: normal;
    }
  }
`

H2.propTypes = {
  children: PropTypes.any,
}

export default H2
