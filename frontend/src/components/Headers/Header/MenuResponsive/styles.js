import { Link } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import media from 'styled-media-query';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(80px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(80px);
  }

`;

export const Container = styled.div`
  animation: ${(props) => (props.visible ? fadeOut : fadeIn)} 500ms linear;

  width: 100%;
  height: 95%;
  border: none;
  position: absolute;

  background: rgba(0, 0, 0, 0.6);

  left: 0;
  right: 0;
  bottom: 0;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  justify-content: center;
  -ms-align-items: center;

  top: 63.6px;
  margin-right: calc(50% - 130px);
  z-index: 10;
  display: ${(props) => (props.visible ? 'block' : 'none')};

  ${media.greaterThan('974px')`
    display: none;
  `}

  ul {
    z-index: 11;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2px;
    margin-top: 20px;
  }
`;

export const OrderLI = styled.li`
  margin-left: 10px;
  padding: 15px;
  border-radius: 4px;
  background: #fff;

  max-width: 220px;
  transition: transform 0.3s ease-in-out;
  strong {
    display: block;
    color: #7159c1;
    font-size: 18px;
    font-weight: normal;
    text-align: center;
  }
  &:hover,
  &.active {
    font-weight: bold;
    opacity: 0.6;
    transform: translateY(-5px);
    transition: all 0.2s;

    &:after {
      opacity: 1;
      bottom: -10px;
      width: 100%;
    }
  }
`;

export const NavigationLink = styled(Link)`
  color: var(--text-body-bg);
  text-decoration: none;
  position: relative;
  font-size: 16px;
  font-weight: bold;
  padding: 0 var(--space-sm);
  margin-bottom: var(--space-sm);
  text-align: center;

  &:hover,
  &.active {
    font-weight: bold;
    opacity: 0.6;
    /* transform: translateY(-5px);*/
    transition: all 0.2s;
  }
`;

export const Badge = styled.button`
  background: none;
  border-left: 1px solid #eee;
  margin-left: 20px;
  border: 0;
  position: relative;
  right: 0;
  top: 0;
`;
