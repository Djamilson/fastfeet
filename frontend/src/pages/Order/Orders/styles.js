import styled from 'styled-components';
import media from 'styled-media-query';

import { colors, fonts } from '~/styles';

export const SwitchDiv = styled.div`
  display: flex;
  margin-top: -30px;
  justify-content: center;
  align-items: center;

  ${media.lessThan('830px')`
      margin: 15px 0 10px 0;
  `}

  ${media.lessThan('515px')`
      margin: 15px 0 10px 0;
  `}

  span {
    margin-right: 20px;
    font-weight: normal;
    font-size: ${fonts.regular};
    color: ${colors.dark};
  }
`;
