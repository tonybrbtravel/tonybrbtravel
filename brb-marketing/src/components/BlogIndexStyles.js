import styled from 'styled-components'
import { Link } from 'gatsby'

export const ArticleBlock = styled(Link)`
  display: block;

  img {
    width: 100%;
    height: 150px;

    object-fit: cover;
  }
`

export const Title = styled.h4`
  font-size: 24px;
  margin: 12px 0px;
  line-height: 28px;
  letter-spacing: -2px;
`

export const Description = styled.p`
  color: #858585;
`

export const Byline = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  span {
    color: #858585;
  }
`
