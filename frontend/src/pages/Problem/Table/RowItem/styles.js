import styled from 'styled-components';

import { metrics, colors } from '~/styles';

export const Container = styled.tr`
  td:first-child {
    display: flex;
    padding-left: 30px;
    text-align: right;
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
