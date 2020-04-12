import styled from 'styled-components/native';

import Button from '~/components/Button';
import {colors, fonts} from '~/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 30px;
  justify-content: center;
  align-items: center;
`;

export const ContainerAvatar = styled.View`
  margin-bottom: 20px;
`;

export const Content = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  margin-top: 10px;
  font-weight: normal;
  font-size: ${fonts.small}px;
  color: ${colors.regular};
`;

export const InfoText = styled.Text`
  margin-top: 4px;
  font-size: ${fonts.bigbig}px;
  color: ${colors.dark};
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  align-self: stretch;
  margin-top: 20px;
  background: ${colors.red};
`;
