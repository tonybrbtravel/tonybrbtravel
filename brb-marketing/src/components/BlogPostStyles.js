import styled from 'styled-components'
import { Link } from 'gatsby'
import Colors, { rgba } from '../themes/Colors'
import Metrics, { unitless } from '../themes/Metrics'
import Breakpoints from '../themes/Breakpoints'
import Decorations from '../themes/Decorations'


export const Wrapper = styled.div`
  display: block;
  width: 100%;
  max-width: ${Breakpoints.medium};
  margin: ${Metrics.bigSpacer} auto;

  @media screen and (min-width: ${Breakpoints.large}) {
    max-width: ${unitless(Breakpoints.large) - 2 * unitless(Metrics.hugeSpacer)}px;
  }
`

export const TitleBar = styled.div`
  width: 100%;
  margin: auto;
  padding: 0 16px;
  font-size: 18px; // Other sizes cascade based on this

  h1 {
    margin: 0;
    letter-spacing: -4px;
    max-width: 16em;
    font-size: 2em;
    line-height: 1.1;
    margin-bottom: ${Metrics.tinySpacer};
    letter-spacing: -2px;
  }

  h2 {
    font-weight: 500;
    width: 100%;
    max-width: 20em;
    margin: 0;
    margin-bottom: ${Metrics.smallSpacer};
    letter-spacing: -1.14px;
    font-size: 1.2em;
    line-height: 1.2;
  }

  p {
    color: ${Colors.lightGrey};
    font-size: 16px; // Same size all breakpoints
    line-height: 1;
    margin-bottom: ${Metrics.smallSpacer};
  }

  @media screen and (min-width: ${Breakpoints.medium}) {
    font-size: 22px;
  }

  @media screen and (min-width: ${Breakpoints.large}) {
    font-size: 24px;
  }

  @media screen and (min-width: ${Breakpoints.extraLarge}) {
    font-size: 28px;
  }

`

export const ShareButton = styled.a`
  color: white;
  border-radius: 2px;
  display: inline-flex;
  font-size: 14px;
  letter-spacing: 1.3px;
  text-transform: uppercase;
  padding: 8px 12px;
  line-height: 18px;
  margin-right: 12px;
  width: 140px;
  justify-content: space-between;
  background-color: ${props => (props.twitter ? '#4DB6EE' : '#3965A0')};
  margin-bottom: 20px;

  img {
    height: 18px;
  }
`

export const ArticleImage = styled.img`
  width: 100%;
  margin-bottom: ${Metrics.smallSpacer};
`;

export const Article = styled.div`
  max-width: 32em;
  font-size: 18px; // The article scales off this, mostly
  width: 80%;
  margin: auto;
  margin-top: 30px;
  padding: 0px;

  @media screen and (min-width: ${Breakpoints.large}) {
    font-size: 20px;
  }

  @media screen and (min-width: ${Breakpoints.extraLarge}) {
    font-size: 22px;
  }

  p, li {
    line-height: 1.5;
    margin-bottom: ${Metrics.smallSpacer};
  }

  ul, ol {
    padding-left: ${Metrics.smallSpacer};

    @media screen and (min-width: ${Breakpoints.medium}) {
      padding-right: ${Metrics.smallSpacer};
    }
  }

  ul {
    list-style-type: none;

    &.compact li {
      margin-bottom: 0;
    }

    li:before {
      content: "";
      display: block;
      position: absolute;
      background-color: ${Colors.red};
      border-radius: 1px;
      width: .5em;
      height: .5em;
      margin-top: .375em; // Adjust for 1.5 line-height
      margin-left: -1.25em;
    }
  }

  p:first-of-type {
    font-size: 1.2em;
    line-height: 1.4;
    margin-bottom: ${Metrics.smallSpacer};

    @media screen and (min-width: ${Breakpoints.small}) {
      font-size: 1.4em;
    }
  }

  p:first-of-type::first-letter {
    color: ${Colors.red};
    float: left;
    font-weight: 900;
    font-size: 3em; // Just bigger than double the host <p> line height
    line-height: .8; // Adjust for vertical alignment
    margin-bottom: -.25em; // Ensure third line always has space to flow
    margin-top: .1em;
    margin-right: .1em;
  }

  h1 {
    font-size: 1.4em;
    line-height: 1.1;
    margin-top: ${Metrics.bigSpacer};
    margin-bottom: ${Metrics.smallSpacer};

    @media screen and (min-width: ${Breakpoints.small}) {
      font-size: 2em;
    }
  }

  h2 {
    font-size: 1.2em;
    line-height: 1.2;
    margin-top: 1em;
    margin-bottom: ${Metrics.smallSpacer};

    @media screen and (min-width: ${Breakpoints.small}) {
      font-size: 1.4em;
    }
  }

  h3 {
    font-size: 1.1em;
    line-height: 1.3;
    margin-bottom: ${Metrics.smallSpacer};
  }

  a {
    color: ${Colors.red};
    text-decoration: underline;
  }

  table {
    width: 125%; // Break out of the 80% container on small devices
    margin-left: -12.5%;
    font-size: .6em;
    border-collapse: separate;
    border-spacing: 0 5px;

    th, td {
      text-align: left;
      padding: .25em;
    }

    th {
      vertical-align: bottom;
      border-bottom: 1px solid ${Colors.lightGrey};
    }

    tr:nth-child(2n) {
      background-color: ${rgba(Colors.lightGrey, .2)};
    }

    @media screen and (min-width: ${Breakpoints.small}) {
      font-size: .8em;
    }

    @media screen and (min-width: ${Breakpoints.medium}) {
      width: 100%;
      margin-left: 0;
      font-size: .9em;
    }
    @media screen and (min-width: ${Breakpoints.large}) {
      font-size: 1em;
    }

  }

  img {
    display: block;
    width: 100%;
    max-width: 24em;
    object-fit: cover;
    border-radius: 2px;
    margin: 0 0 ${Metrics.tinySpacer};
    box-shadow: ${Decorations.shadow.light};
  }
`

export const Back = styled(Link)`
  display: block;
  margin: 20px 16px 0px 20px;
  color: ${Colors.red};
  font-size: 22px;

  span {
    font-size: 32px;
  }
`
