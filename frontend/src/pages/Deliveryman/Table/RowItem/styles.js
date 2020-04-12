import styled from 'styled-components';

import { metrics, colors } from '~/styles';

export const Container = styled.tr``;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const ColumnSpan = styled.td`
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    border-radius: 10px;
    width: 70%;
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

export const ImageTD = styled.td``;
