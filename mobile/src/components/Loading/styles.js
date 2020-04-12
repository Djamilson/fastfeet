import styled from 'styled-components';

import {colors} from '~/styles';

export const LoadingView = styled.ActivityIndicator.attrs({
  size: 'small',
  color: `${colors.third}`,
  paddingBottom: 130,
})`
  margin: -60px 0 30px 0;
`;
