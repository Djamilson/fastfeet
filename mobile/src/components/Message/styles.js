import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const Container = styled.View`
  margin-top: 60px;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: ${colors.third};
  color: ${colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-left: 25px;
  margin-right: 25px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.white};
  padding-right: 20px;
`;
