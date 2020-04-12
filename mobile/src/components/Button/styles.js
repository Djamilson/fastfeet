import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const Container = styled(RectButton)`
  height: 46px;
  background: #3b9eff;
  border-radius: 4px;
  opacity: ${props => (props.enabled ? 1 : 0.7)};
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${colors.white_};

  font-weight: bold;
`;
