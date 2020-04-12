import {StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

import {colors, metrics, fonts} from '~/styles';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Card = styled.View`
  flex: 1;
  border-radius: ${metrics.border_radius}px;
  margin: 0 20px;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 15px;
  margin-top: ${metrics.margin_top}px;
  background: ${colors.white_};
`;

export const CardImage = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  margin-bottom: 5px;
  border-radius: ${metrics.border_radius}px;
`;

export const CardContent = styled.View`
  height: 100%;
  padding: 0 30px;
  justify-content: center;
  border: ${StyleSheet.hairlineWidth}px;
  border-radius: ${metrics.border_radius}px;
`;

export const Description = styled.Text`
  font-size: ${fonts.regular}px;
  margin-top: 3px;
  color: ${colors.regular};
`;

export const CardButton = styled.View`
  padding: 5px;
  margin: 0 10px 20px 10px;
  border-radius: 4px;
  align-items: center;
  margin-top: -100px;
`;

export const ButtonSelect = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 40px;
  width: 80px;
  height: 80px;
`;

export const SignatureStyled = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${metrics.border_radius}px;
`;

export const ButtonSave = styled(RectButton)`
  padding: 20px;
  border-radius: 5px;
  background: ${colors.third};
  margin-bottom: -60px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;
