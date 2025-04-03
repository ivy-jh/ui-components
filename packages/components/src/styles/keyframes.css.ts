import { keyframes } from '@vanilla-extract/css';

const slideAmount = 2;

export const slideUpAndFade = keyframes({
  from: {
    opacity: 0,
    transform: `translateY(${slideAmount}px)`
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)'
  }
});

export const slideRightAndFade = keyframes({
  from: {
    opacity: 0,
    transform: `translateX(-${slideAmount}px)`
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)'
  }
});

export const slideDownAndFade = keyframes({
  from: {
    opacity: 0,
    transform: `translateY(-${slideAmount}px)`
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)'
  }
});

export const slideLeftAndFade = keyframes({
  from: {
    opacity: 0,
    transform: `translateX(${slideAmount}px)`
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)'
  }
});
