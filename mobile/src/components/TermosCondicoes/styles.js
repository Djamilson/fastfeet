import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Background = styled(LinearGradient).attrs({
  colors: ['#7159c1', '#ab59c1'],
})`
  flex: 1;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const Item = styled.View`
  flex: 1;
  margin-top: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  padding: 3px;
  max-height: 95%;
`;
export const ApproveButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;

  background-color: #27ddc5;
  border-radius: 5px;
  height: 54px;
  align-items: center;
  justify-content: center;
`;

export const ApproveButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 2.8px;
`;
export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: 30px;
  padding: 10px;
  max-height: 43px;
`;
export const Title = styled.Text`
  font-size: 20px;
  text-align: left;
  color: red;
  font-weight: bold;
`;

export const NoButton = styled(TouchableOpacity)`
  height: 43px;
  background: #3b9eff;
  border-radius: 7px;

  align-items: center;
  justify-content: center;

  margin-top: 10px;
  width: 110px;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
