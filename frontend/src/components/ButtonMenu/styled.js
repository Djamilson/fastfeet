import styled from 'styled-components';
import media from 'styled-media-query';

export const ButtonHamburger = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 3px;
  border: none;
  position: absolute;
  background: transparent;
  display: inline-block;

  top: var(--space-sm);
  left: var(--space-sm);

  ${media.greaterThan('974px')`
    display: none;
  `}

  &.active {
    span {
      background: transparent;
      &:before,
      &:after {
        top: 0;
        left: 0;
      }
      &:before {
        transform: rotate(-45deg);
      }
      &:after {
        transform: rotate(45deg);
      }
    }
  }

  span {
    background: var(--text-body-bg);
    border-radius: 10px;
    display: inline-block;
    height: 3px;
    width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:before,
    &:after {
      content: '';
      background: var(--text-body-bg);
      border-radius: 10px;
      display: inline-block;
      height: 3px;
      width: 100%;
      position: absolute;
      left: 0;
      transition: 0.3s;
    }

    &:before {
      top: -10px;
    }

    &:after {
      bottom: -10px;
    }
  }
`;
