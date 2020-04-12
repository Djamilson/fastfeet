import {StyleSheet} from 'react-native';

import styled from 'styled-components/native';

import {colors, metrics, fonts} from '~/styles';

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: `${colors.sixX}`,
})`
  font-size: ${fonts.large}px;
  margin-left: 5px;
  color: ${colors.sixX};
  background: ${colors.white_};
  padding: 20px;
  border-radius: ${metrics.border_radius}px;
  border: ${StyleSheet.hairlineWidth}px;
`;
