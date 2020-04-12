import styled from 'styled-components/native';

import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  margin: 0px 10px 5px 10px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 20px;
`;

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 5px;
  height: 20px;
  margin-left: 5px;
  width: 90%;
`;

export const Title = styled.Text`
  font-size: ${fonts.regular}px;
  color: ${colors.third};
  font-weight: bold;
  margin-left: 8px;
`;
