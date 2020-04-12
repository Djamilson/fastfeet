import styled from 'styled-components';
import media from 'styled-media-query';

import { colors } from '~/styles';

export const Container = styled.div`
  width: 100%;
  margin: 5px 0px;
`;

export const Content = styled.div`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background: ${colors.white_};
  margin-top: 20px;

  ${media.lessThan('974px')`   
    margin-top: 40px;
  `}

  ${media.lessThan('600px')`
    margin-top: 100px;
  `}
`;
