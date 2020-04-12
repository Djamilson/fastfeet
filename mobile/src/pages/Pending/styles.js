import {StyleSheet} from 'react-native';

import styled from 'styled-components/native';

import {colors, fonts, metrics} from '~/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  border-color: ${colors.fourth};
`;

export const ProfileContainer = styled.View`
  padding: 0 ${metrics.padding}px;
  padding-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  display: flex;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: ${fonts.bigbig}px;
  color: ${colors.dark};
  margin-top: 5px;
`;

export const ProfileInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  display: flex;
`;

export const OrderDeliveredLink = styled.TouchableOpacity`
  padding-right: 20px;
`;

export const OrderWithdrawLink = styled.TouchableOpacity``;

export const PendingLinkText = styled.Text`
  color: ${colors.third};
  font-weight: bold;
  font-size: ${fonts.small}px;
`;

export const SubLinhaButton = styled.View`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${colors.third};
`;

export const SignLinkText = styled.Text`
  color: ${colors.sixX};
  font-weight: bold;
  font-size: ${fonts.small}px;
`;

export const ContentList = styled.View`
  display: flex;
  margin-top: 10px;
  margin-bottom: 30px;
  padding-bottom: 50px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {marginTop: 20, padding: 15, bottom: 30},
})``;
