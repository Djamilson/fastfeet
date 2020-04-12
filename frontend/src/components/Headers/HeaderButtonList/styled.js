import { Link } from 'react-router-dom';

import { darken } from 'polished';
import styled from 'styled-components';
import media from 'styled-media-query';

import { colors, fonts, metrics } from '~/styles';

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${colors.white_};
  border: 1px solid ${colors.twelve};
  border-radius: 4px;
  height: 35px;
  width: 237px;
  padding: 10px;
  margin: 0px 0 0px;

  ${media.lessThan('515px')`
  width: 100%;
`}
`;

export const SwitchDiv = styled.fieldset`
  width: 300px;

  border: 1px solid green;

  legend {
    padding: 0.2em 0.5em;
    border: 1px solid green;
    color: green;
    font-size: 90%;
    text-align: center;
  }
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    line-height: 20px;
    margin: 5px 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${media.lessThan('515px')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`}

  input {
    outline: 0;
    padding-left: 0px;
    background: ${colors.white_};
    border: 0;
    height: 33px;
    margin: 10px 5px 0px;

    &::placeholder {
      color: ${colors.twelve};
    }
  }

  label {
    top: 0;
    bottom: 0;
    line-height: 3.8;
    left: 0px;
  }
`;

export const Title = styled.span`
  font-size: ${fonts.large}px;
  font-weight: bold;
  color: ${colors.dark};
`;

export const NextLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: row;
  width: 142px;
  height: 35px;
  background: ${colors.third};
  font-weight: bold;
  color: ${colors.white_};
  border: 0;
  border-radius: ${metrics.border_radius_4}px;
  font-size: ${fonts.small}px;
  transition: backgroud 0.2s;

  ${media.lessThan('515px')`
  width: 100%;
  margin:0;
  margin-top: 10px;
`}

  &:hover {
    background: ${darken(0.03, '#3b9eff')};
  }
`;
