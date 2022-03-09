import styled from 'styled-components';
import { Link } from 'gatsby'
import Colors from '../../themes/Colors';

import Metrics from '../../themes/Metrics';

export const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid #F0F1F6;
  padding: ${Metrics.smallSpacer} 0;
`;

export const InnerContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  padding: 0 12px;
  margin-left: auto;
  margin-right: auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 20px;
  grid-gap: 20px;
  margin: 0 0 30px 0;

  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const Block = styled.div`
  font-size: 14px;

  h5 {
    font-size: 14px;
    margin: 0 0 10px 0;
  }

  a {
    color: ${Colors.red};

    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    padding: 0;
    list-style-type: none;

    li {
      margin: 12px 0;
      padding: 3px 0;

      @media screen and (min-width: 600px) {
        padding: 0;
        margin: 0 0 6px 0;
      }
    }
  }
`;

export const BtnLink = styled(Link)`
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid ${Colors.red};
  border-radius: 3px;

  &:hover {
    color: white;
    background-color: ${Colors.red};
  }
`;

export const Icons = styled.ul``;

export const Legal = styled.p`
  opacity: 0.5;
  font-size: 14px;
  margin: 0;
  padding: 0 20px;
`;
