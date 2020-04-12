import styled from 'styled-components/native';

import {RectButton} from 'react-native-gesture-handler';

import {colors, fonts, metrics} from '~/styles';

export const Container = styled.View`
  height: 100px;
  border-radius: ${metrics.border_radius}px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;

export const ReportProblem = styled(RectButton)`
  display: flex;
  width: 33.2%;
  height: 100px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${colors.fourth};
  border-radius: ${metrics.border_radius}px;
`;

export const TabText = styled.Text`
  font-size: ${fonts.small}px;
  color: ${colors.sixX};
`;

export const ViewProblems = styled(RectButton)`
  display: flex;
  width: 33.2%;
  height: 100px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${colors.fourth};
  box-shadow: 1px 1px 1px ${colors.sixX};
`;

export const ConfirmDelivery = styled(RectButton)`
  display: flex;
  width: 33.2%;
  height: 100px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${colors.fourth};
  border-radius: ${metrics.border_radius}px;
`;
