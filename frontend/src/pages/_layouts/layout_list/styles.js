import styled from 'styled-components';
import media from 'styled-media-query';

export const WList = styled.div`
  width: 85%;
  margin-left: 7.5%;
  padding: 20px;
  padding-bottom: 30px;

  ${media.lessThan('515px')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-left: 0;
`}
`;

export const Content = styled.div`
  flex: 1;
`;
