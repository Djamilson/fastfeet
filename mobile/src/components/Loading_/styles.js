import styled from 'styled-components';
import { colors} from '~/styles';
export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.third};
`;

export const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background: #00000040;
`;

export const ActivityIndicatorWrapper = styled.View`
  color: #fff;
  height: 100px;
  width: 100px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
