import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const ApproveButton = styled(RectButton)`
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;

  background-color: #27ddc5;
  border-radius: 5px;
  height: 54px;
  align-items: center;
  justify-content: center;
`;

export const ApproveButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 2.8px;
`;
