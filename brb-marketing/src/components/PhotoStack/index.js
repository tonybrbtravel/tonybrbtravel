/**
 *
 * PhotoStack
 *
 */

import React from 'react'
import styled from 'styled-components'

import img1 from '../../images/social-proof/1.jpg'
import img2 from '../../images/social-proof/2.jpg'
import img3 from '../../images/social-proof/3.jpg'
import img4 from '../../images/social-proof/4.jpg'

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow: scroll;
  width: 100%;
`

const ImgContainer = styled.div`
  width: 48%;
  margin-bottom: 18px;

  img {
    max-width: 100%;
  }

  @media screen and (min-width: 600px) {
    max-width: 25%;
    &:nth-of-type(odd) {
      padding-top: 32px;
    }
  }
`

function PhotoStack() {
  return (
    <Wrapper>
      <ImgContainer>
        <img src={img1} alt="A BRB customer" />
      </ImgContainer>
      <ImgContainer>
        <img src={img4} alt="A BRB customer" />
      </ImgContainer>
      <ImgContainer>
        <img src={img3} alt="A BRB customer" />
      </ImgContainer>
      <ImgContainer>
        <img src={img2} alt="A BRB customer" />
      </ImgContainer>
    </Wrapper>
  )
}

PhotoStack.propTypes = {}

export default PhotoStack
