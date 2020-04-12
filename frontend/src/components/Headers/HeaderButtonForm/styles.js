import { Link } from 'react-router-dom';

import { darken } from 'polished';
import styled from 'styled-components';
import media from 'styled-media-query';

import { colors, fonts, metrics } from '~/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;

  ${media.greaterThan('974px')`
    flex-direction: row;
`}
`;

export const Title = styled.span`
  font-size: ${fonts.large}px;
  font-weight: bold;
  color: ${colors.dark};
  width: 100%;
  ${media.greaterThan('974px')`
  width: 80%;
`}
`;
export const ContentButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
  justify-content: space-between;

  ${media.greaterThan('974px')`
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 20px;
`}

  ${media.lessThan('600px')`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items:center;

    `}
`;

export const GobackLink = styled(Link)`
  display: flex;
  padding-top: 10px;
  padding-right: 30px;
  padding-left: 20px;
  flex-direction: row;
  height: 35px;
  background: ${colors.serven};
  font-weight: bold;
  color: ${colors.white_};
  border: 0;
  border-radius: ${metrics.border_radius_4}px;
  font-size: ${fonts.small}px;
  transition: backgroud 0.2s;

  ${media.greaterThan('974px')`
  margin-right: 20px;
  `}
  ${media.lessThan('600px')`
  width:100%;
  padding-left: 40%;

   height: 45px;
  margin-bottom: 10px;
  padding-top: 15px;
    `}

  &:hover {
    background: ${darken(0.03, '#3b9eff')};
  }
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
  }
`;
