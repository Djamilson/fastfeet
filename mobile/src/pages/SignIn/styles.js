import {Platform} from 'react-native';

import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';
import colors from '~/styles/colors';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.os === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 0px;
`;

export const FormInput = styled(Input)``;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
  background: ${colors.green};
  height: 45px;
`;

export const LogoImg = styled.Image`
  width: 270px;
  height: 45px;
  margin-bottom: 58px;
`;
