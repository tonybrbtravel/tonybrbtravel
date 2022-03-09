import styled from 'styled-components';
import Colors from '../../themes/Colors';

export const Container = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  position: relative;

  background: ${(props) => (props.bg ? `url(${props.bg})` : '')};

  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  transform: scale(1);

  color: black;

  transition: transform 300ms cubic-bezier(0, 0, 0.58, 1);

  p {
    font-weight: 600;
    font-size: 18px !important;
    transform: ${(props) =>
    props.selected ? 'translateY(-16px)' : 'translateY(0)'};
    background: white;
    line-height: 1;
    padding: 8px;
    border-radius: 2px;
    box-shadow: 0px 0px 5px ${Colors.shadow};

    transition: transform 300ms;
  }

  &::after {
    content: 'Selected ✈️';
    width: 100px;
    height: 40px;
    background-color: white;
    border-radius: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: black;

    position: absolute;
    right: 0px;
    left: 0px;
    margin-left: auto;
    margin-right: auto;
    bottom: 30px;
    z-index: 9999;
    box-shadow: 0px 2px 8px ${Colors.shadow};
    transform: ${(props) => (props.selected ? 'scale(1)' : 'scale(0)')};

    transition: transform 300ms;
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: scale(0.95);
  }
`;
