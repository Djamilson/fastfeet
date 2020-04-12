import { Link } from 'react-router-dom';

import { darken } from 'polished';
import styled from 'styled-components';
import media from 'styled-media-query';

import { colors, fonts, metrics } from '~/styles';

export const Navigation = styled.ul`
  display: none;
  flex-direction: column;
  margin-top: var(--space-sm) var(--space-sm);
  &.active {
    display: flex;
  }

  li:first-child {
    margin-right: 20px;
  }

  li:last-child {
    margin-left: 20px;
  }

  ${media.greaterThan('600px')`
    display: flex;
    flex-direction: row;
    align-items: center;
  `}

  ${media.lessThan('600px')`
  display: flex;
    flex-direction: row;
    align-items: center
    `}
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  margin: 0 10px;
`;
export const Button = styled.button`
  display: flex;
  height: 35px;
  padding-right: 30px;
  padding-left: 20px;
  background: ${colors.third};
  font-weight: bold;
  color: ${colors.white_};
  border: 0;
  border-radius: ${metrics.border_radius_4}px;
  font-size: ${fonts.small}px;
  transition: backgroud 0.2s;

  ${media.lessThan('600px')`
   width:100%;
  padding-left: 40%;
   height: 45px;
  padding-top: 10px;
    `}

  &:hover {
    background: ${darken(0.03, '#3b9eff')};
    outline: 0;
  }
`;
