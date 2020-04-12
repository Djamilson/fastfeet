import { Link } from 'react-router-dom';

import styled from 'styled-components';
import media from 'styled-media-query';

import { fonts } from '~/styles';

export const Navigation = styled.ul`
  display: none;
  flex-direction: column;
  margin-top: var(--space-sm) var(--space-sm);
  &.active {
    display: flex;
  }

  ${media.greaterThan('974px')`
    display: flex;
    flex-direction: row;
    align-items: center;
  `}
`;

export const NavigationLink = styled(Link)`
  color: ${(props) => (props.selected ? '#444' : '#999')};

  position: relative;
  font-size: ${fonts.small}px;
  font-weight: bold;
  padding: 0 var(--space-sm);
  margin-bottom: var(--space-sm);
  text-align: center;

  ${media.greaterThan('medium')`
    margin-left: var(--space-sm);
    margin-bottom: 0;

  `}

  ${media.greaterThan('large')`
    margin-left: var(--space);

  `}

  &:after {
    ${media.greaterThan('medium')`
      content: '';
      display: inline-block;
      width: 0;
      height: 4px;

      background: var(--primary-color);
      position: absolute;
      left: 0;
      bottom: -10px;
      opacity: 0;

    `}
  }

  &.active {
    font-weight: bold;
    /*transform: translateY(-5px);*/

    ${media.greaterThan('medium')`
      font-weight: bold;
      color: ${(props) => (props.selected ? '#444' : '#999')};
    `}

    &:after {
      opacity: 1;
      bottom: -10px;
      width: 100%;
    }
  }
`;
