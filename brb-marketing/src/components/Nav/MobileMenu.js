import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Metrics from '../../themes/Metrics'
import Spacer from '../../components/Spacer'

import { Manifest } from './marketingSiteManifest'
import Timings from '../../themes/Timings'
import Decorations from '../../themes/Decorations'

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  background-color: white;
  width: 100%;
  box-shadow: ${Decorations.shadow.light};
  padding: 90px 20px 6px 20px;
  position: fixed;
  z-index: 9000;

  font-weight: 500;
  font-size: 14px;
  color: black;

  transform: ${(props) => `translateY(${props.isActive ? 0 : -100}%)`};

  transition: transform ${Timings.transition.default} ease-in-out;

  a {
    display: block;
    margin-bottom: 12px;
  }
`

function MobileMenu({ isActive, siteMode, handleClick, cta1, cta2 }) {
  return (
    <Wrapper isActive={isActive}>
      {Manifest[siteMode || 'default'].map(link => {
        if (link.path) {
          return (
            <Link key={link.name} to={link.path} onClick={handleClick}>
              {link.name}
            </Link>
          )
        }
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        )
      })}

      <Spacer height={Metrics.smallSpacer} />
      <Link to={cta1.link} onClick={handleClick}>
        {cta1.label}
      </Link>
      <Link to={cta2.link} onClick={handleClick}>
        {cta2.label}
      </Link>
    </Wrapper>
  )
}

MobileMenu.propTypes = {
  isActive: PropTypes.bool,
  handleClick: PropTypes.any,
}

export default MobileMenu
