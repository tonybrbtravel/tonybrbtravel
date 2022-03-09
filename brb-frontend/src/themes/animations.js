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

export const spinIn = keyframes`
  0% {
    transform: rotate(0deg) scale(0);
  }
  80% {
    transform: translateX(180deg) scale(3);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(100%);
  } to {
    transform: translateY(0px);
  }
`;

export const pulse = keyframes`
  from {
    opacity: 0.8;
  }
  to {
    opacity: 0.1;
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

export const popIn = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
