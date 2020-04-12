import {RectButton} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';
import {colors, fonts} from '~/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerAvatar = styled.View`
  margin-top: 60px;
  margin-bottom: 60px;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: ${(props) => props.number * 60}px;
  height: ${(props) => props.number * 60}px;
  border-radius: ${(props) => props.number * 30}px;
`;

export const CardButton = styled.View`
  padding: 2px;
  margin: 0 5px 10px 5px;
  border-radius: 4px;
  align-items: center;
  margin-top: -130px;
`;

export const ButtonSelect = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 30px;
  width: 60px;
  height: 60px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})`
  align-self: stretch;
`;

export const Label = styled.Text`
  font-size: ${fonts.regular}px;
  color: ${colors.white_};
  font-weight: bold;
`;
export const FormInput = styled(Input)``;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
