import { Link } from 'react-router-dom';

import styled from 'styled-components';
import media from 'styled-media-query';

import { colors, fonts } from '~/styles';

export const Container = styled.div`
  background: ${colors.white_};
  width: 100%;
  padding-left: 20px;
`;

export const ProlifeLink = styled(Link)`
  display: none;

${media.greaterThan('974px')`
  display: flex;
`}

  ${media.greaterThan('medium')`
  display: flex;
`}

  ${media.greaterThan('small')`
  display: flex;
`}

${media.greaterThan('300px')`
      display: flex;
  `}

`;

export const NavLink = styled(Link)`
  display: none;
  padding-right: 20px;
  margin-left: 50px;
  margin-top: 5px;

  ${media.greaterThan('medium')`
      display: flex;
    `}

  ${media.greaterThan('974px')`
    display: flex;
    border-right: 1px solid ${colors.fourth};
    margin-left: 0;
    margin-top: 0px;
  `}

    ${media.greaterThan('small')`
    display: flex;
  `}

  ${media.greaterThan('300px')`
        display: flex;
    `}

`;

export const Content = styled.div`
  height: 64px;
  max-width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: none;
    align-items: center;

    margin-right:  var(--space-lg);

    ${media.greaterThan('931px')`
        display: flex;
        margin-right:  var(--space-lg);
    `}

    ${media.greaterThan('medium')`
    margin-left: 50px;
    margin-left:  var(--space-lg);

    display: flex;
  `}

    ${media.greaterThan('small')`
    display: flex;
    margin-left: 50px;
  `}

  ${media.greaterThan('350px')`
    display: flex;
    margin-left: 50px;
  `}

  ${media.greaterThan('200px')`
        display: flex;
        margin-left: 50px;
    `}
     img {
      display: none;
      margin-right: 20px;
      padding-right: 20px;
      height: 25px;
      border-right: 1px solid #eee;
        ${media.greaterThan('931px')`
          display: flex;
        `}

        ${media.greaterThan('medium')`
        display: flex;
        `}

        ${media.greaterThan('small')`
        display: flex;
        `}

        ${media.greaterThan('350px')`
        display: flex;
        left: var(--space-sm);
        border-right: none;
        `}

        ${media.greaterThan('200px')`
          display: flex;
          border-right: none;
        `}
  }

    a {
      font-weight: bold;
      color: #7159c1;

      @media (max-width: 370px) {
        display: none;
      }
    }

    &:hover a {
      opacity: 0.4;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 500px) {
    display: none;
  }

  strong {
    display: block;
    color: ${colors.dark};
    font-size: ${fonts.smaller}px;
    font-weight: bold;
  }
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  width: 100%;
  display: inline-block;
  margin: 0.5em;
  color: ${colors.red};
  font-size: ${fonts.small}px;

  @media (max-width: 550px) {
    display: none;
  }
`;

export const NavMenu = styled.div`
  width: 100%;
`;
