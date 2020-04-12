import styled from 'styled-components/native';

import {colors, fonts} from '~/styles';

export const Container = styled.View`
  flex: 1;
`;

export const Card = styled.View`
  display: flex;
  margin-top: -80px;
  align-items: center;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.white_};
  font-weight: bold;
  margin: 0px;
  font-size: ${fonts.small_big}px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {marginTop: 10, padding: 0, paddingBottom: 160},
})``;
