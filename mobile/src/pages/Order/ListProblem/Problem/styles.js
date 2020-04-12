import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';
import metrics from '~/styles/metrics';

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: 0,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 30,
  },
  flexGrow: 1,
  justifyContent: 'center',
})`
  width: 100%;
  background: ${colors.white_};
  height: 60px;
  border-radius: ${metrics.border_radius}px;
  padding-top: 0px;
`;

export const Border = styled.View`
  margin-bottom: 20px;
  border-radius: ${metrics.border_radius}px;
  background: ${colors.white_};
  border: 1px solid #c3c3c3;
`;

export const CardContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  padding: 5px;
  margin-top: 20px;
  padding-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: ${fonts.large}px;
  color: ${colors.sixX};
  width: 98%;
  padding-right: 0px;
`;

export const Date = styled.Text`
  font-size: ${fonts.small}px;
  color: ${colors.sixteen};
  margin-right: 10px;
  width: 32%;
  font-weight: normal;
`;
