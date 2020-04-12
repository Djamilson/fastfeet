import { darken } from 'polished';
import styled from 'styled-components';

import { fonts, metrics, colors } from '~/styles';

export const Container = styled.tr``;

export const ColumnSpan = styled.td`
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background: ${(props) => darken(0.03, props.color)};
    border-radius: 10px;
    width: 100px;
    height: 20px;

    span {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: ${(props) => darken(0.5, props.color)};
      margin-top: 0px;
      margin-left: 5px;
    }

    h3 {
      display: block;
      color: ${(props) => darken(0.5, props.color)};
      font-weight: bold;
      margin-left: 5px;
      text-transform: uppercase;
      font-size: ${fonts.smaller}px;
    }
  }
`;

export const ColumnButton = styled.td`
  border-top-right-radius: ${metrics.border_radius}px;
  border-bottom-right-radius: ${metrics.border_radius}px;
  text-align: right;
  width: auto;

  button {
    border: 0;
    margin-top: 0px;
    margin-left: auto;
    background: none;
    height: 20px;
    border-radius: 16px;
    width: 35px;
    outline: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    span {
      margin-top: 0px;
      background: ${colors.nine};
      width: 4px;
      height: 4px;
      border-radius: 2px;
    }
  }
`;
