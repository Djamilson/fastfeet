import styled from 'styled-components/native';

import Button from '~/components/Button';
import InputTextArea from '~/components/InputTextArea';
import colors from '~/styles/colors';
import metrics from '~/styles/metrics';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: metrics.padding_20},
})`
  margin-top: ${metrics.margin_top}px;
  align-self: stretch;
`;

export const FormInput = styled(InputTextArea)``;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
  background: ${colors.third};
  height: ${metrics.height_button}px;
`;
