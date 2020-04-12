import styled from 'styled-components';

import { fonts, colors } from '~/styles';

export const Container = styled.thead``;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const ColumnSpan = styled.th`
  display: flex;
  width: 80px;
  padding-left: 30px;
  color: ${colors.dark};
  font-size: ${fonts.small}px;
  font-weight: bold;
`;
