import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 30,
    flexGrow: 1,
    paddingBottom: 120,
  },
  showsVerticalScrollIndicator: false,
})``;

export const TRegulation = styled.Text`
  font-size: 18px;
  color: #fff;
  line-height: 26px;
  text-align: justify;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 30px;
  letter-spacing: 2.8px;
  text-transform: uppercase;
`;
