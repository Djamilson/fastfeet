import styled from 'styled-components/native';

import {colors, metrics} from '~/styles';

export const Container = styled.View`
  padding: 0 15px;
  height: 45px;
  background: ${colors.white_};
  border-radius: ${metrics.border_radius}px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#DDDDDD',
})`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
`;
