import styled from 'styled-components'
import Colors from '../../themes/Colors'
import { fadeInDown } from '../../themes/animations'
import Gradients from '../../themes/Gradients'

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.bgColor ? props.bgColor : '#FFF6F9'};
  border-radius: 6px;
  overflow: hidden;
  color: #090A27;
  margin: 12px;
  display: flex;
  flex-direction: column;
  transform: scale(1);

  @media screen and (min-width: 720px) {
    order: ${(props) => props.order ? (props.order + 1)  : ''};
    max-width: 380px;
    /* transform: ${(props) => props.small ? 'scale(0.92)' : 'scale(1)'}; */
  }
`;

export const Header = styled.div`
  background: ${(props) => props.bg ? props.bg : Gradients.sunset};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
    padding: 20px 20px 0 20px;
    font-size: 28px;
    letter-spacing: -0.58px;
  }

  p {
    padding: 0px 20px 20px 20px;
    margin: 0px;
    letter-spacing: -0.33px;

    span {
      font-size: 22px;
      letter-spacing: -0.46px;
      font-weight: 900;
    }
  }
`;

export const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  display: ${(props) => props.active ? 'block' : 'none'};
  animation: ${fadeInDown} 0.5s ease-in-out;

  h4 {
    font-size: 18px;
    letter-spacing: -0.38px;
    margin: 0;
    margin-bottom: 12px;
  }

  @media screen and (min-width: 720px) {
    display: block;
    position: relative;
    padding-bottom: 100px;
  }
`;

export const Btn = styled.a`
  display: block;
  text-align: center;
  color: ${Colors.red};
  border: 1px solid ${Colors.red};
  border-radius: 3px;
  margin: 12px 0 12px 0;
  padding: 12px;
  position: bottom;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${Colors.red};
    color: white;
  }

  @media screen and (min-width: 720px) {
    position: absolute;
    bottom: 20px;
    width: 87%;
  }
`;

export const Ul = styled.ul`
  margin: 0;
  padding: 0px;
  list-style-type: none;
  padding-bottom: 12px;

  li {
    padding-bottom: 6px;
    padding-left: 30px;

    &::before {
      content: '${(props) => props.cross ? '×' : '✓'}';
      margin-left: -28px;
      margin-right: 12px;
    }
  }
`;

export const Caret = styled.div`
  display: block;
  padding: 20px;
  transform: rotate(${props => props.active ? '90deg' : '0deg'});
  transition: transform 0.1s;

  img {
    width: 20px;
    height: 20px;
  }

  @media screen and (min-width: 720px) {
    display: none;
  }
`;
