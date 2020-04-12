import {StyleSheet} from 'react-native';

import styled from 'styled-components/native';

import {colors, fonts, metrics} from '~/styles';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
  height: 190px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${colors.twelve};
  border-radius: ${metrics.border_radius}px;
`;

export const CardHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding-top: 10px;
  padding-left: 10px;
`;

export const CardContent = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
  padding: 20px 10px 10px 10px;
  height: 10px;
  width: 100%;
`;

export const Separator = styled.View`
  height: 1px;
  background: ${colors.third};
  margin: 0px 30px 0 40px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CircleAwaitingWithdrawal = styled.View`
  width: 9px;
  height: 9px;
  border-radius: 4.5px;
  background: ${colors.third};
`;

export const CircleWithdrawal = styled.View`
  width: 9px;
  height: 9px;
  border-radius: 4.5px;
  background: ${(props) =>
    props.withdrawal === true ? `${colors.third}` : `${colors.white}`};

  border: ${(props) => (props.withdrawal === true ? `0` : `1`)}px solid
    ${(props) =>
      props.withdrawal === true ? `${colors.white}` : `${colors.third}`};
`;

export const CircleDelivered = styled.View`
  width: 9px;
  height: 9px;
  border-radius: 4.5px;
  background: ${(props) =>
    props.delivered === true ? `${colors.third}` : `${colors.white}`};

  border: ${(props) => (props.delivered === true ? `0` : `1`)}px solid
    ${(props) =>
      props.delivered === true ? `${colors.white}` : `${colors.third}`};
`;

export const Card = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 4px;
  margin: 5px 20px 0 20px;
  height: 40px;
`;

export const AwaitingWithdrawalView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AwaitingWithdrawal = styled.Text`
  font-size: ${fonts.minsmall}px;
  color: ${colors.sixX};
`;

export const Withdrawal = styled.Text`
  font-size: ${fonts.minsmall}px;
  color: ${colors.sixX};
`;

export const Delivered = styled.Text`
  font-size: ${fonts.minsmall}px;
  color: ${colors.sixX};
`;

export const CardFooter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background: ${colors.fourteen};
  padding: 0px 15px;
  height: 70px;
`;

export const ButtonView = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const CancelLinkText = styled.Text`
  font-size: ${fonts.regular}px;
  color: ${colors.red};
`;

export const CardFooterLabel = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  padding-left: 10px;
  margin-right: 30px;
`;
export const CardFooterBotton = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
`;

export const Annotation = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const FooterText = styled.Text`
  font-size: ${fonts.minsmall}px;
  color: ${colors.sixX};
`;
export const FooterView = styled.Text`
  font-size: ${fonts.small}px;
  color: ${colors.dark};
  font-weight: bold;
`;

export const SeeDetailsLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 12px 5px 12px 0px;
`;
export const SeeDetailsLinkText = styled.Text`
  padding-top: 8px;
  font-size: ${fonts.regular}px;
  color: ${colors.third};
`;
