import styled from 'styled-components';
import media from 'styled-media-query';

import { fonts, metrics, colors } from '~/styles';

export const Container = styled.div`
  margin-top: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const List = styled.table`
  width: 100%;
  text-align: left;
  margin-top: -20px;

  border-collapse: separate;
  border-spacing: 0 1em;

  thead th {
    color: ${colors.dark};
    font-size: ${fonts.small}px;
    font-weight: bold;
    letter-spacing: 1.11px;
    padding: 0;

    ${media.lessThan('600px')`
display:none;
  `}

    &:first-child {
      text-align: center;
      padding: 0px 20px 0 10px;
    }

    &:last-child {
      text-align: right;
      padding: 0px 10px;
    }
  }

  tbody tr {
    ${media.lessThan('600px')`
      display:flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      border-bottom: #c3c3c3 1px solid;
      margin-bottom: 20px;
  `}
  }

  tbody td {
    background: ${colors.white_};
    color: ${colors.dark};
    font-size: ${fonts.small}px;
    padding: 0 10px 0 0;
    line-height: 40px;

    strong {
      display: none;
      font-weight: bold;
      color: ${colors.dark};
      font-size: ${fonts.small}px;
      ${media.lessThan('600px')`
            display: block;
      `}
    }

    ${media.lessThan('600px')`
      display:flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: space-between;

      width:100%;
      min-width: 353px;
      padding: 0 20px 0 10px;
  `}

    &:first-child {
      border-top-left-radius: ${metrics.border_radius}px;
      border-bottom-left-radius: ${metrics.border_radius}px;
      text-align: center;
    }

    &:last-child {
      border-top-right-radius: ${metrics.border_radius}px;
      border-bottom-right-radius: ${metrics.border_radius}px;
      text-align: right;
      width: auto;
    }
    img {
      margin-top: 5px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-bottom: -40px;
      margin-left: 70px;
    }
  }
`;
