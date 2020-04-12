import styled from 'styled-components';

import { colors, fonts } from '~/styles';

export const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const StyledTitle = styled.span`
  font-size: ${fonts.small_big}px;
  font-weight: bold;
  color: ${colors.dark};
`;
