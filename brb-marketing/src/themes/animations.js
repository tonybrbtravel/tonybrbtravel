import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const scrollRight = keyframes`
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-300px);
  }
  100% {
    transform: translateX(0px);
  }
`;

export const scrollLeft = keyframes`
  0% {
    transform: translateX(-300px);
  }
  50% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-300px);
  }
`;

export const bounce = keyframes`
  0% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(5px);
  }
`;
