import styled from 'styled-components';

import { Spinner } from '~/components/Loading/styles';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #414141 0%, #181818 100%), transparent;
  background-size: 100% 250px, 100%;
  background-repeat: no-repeat;
  background-position: top;
  padding: 0 20px;
`;

export const ContatinerLoding = styled.div`
  display: ${props => (props.loading !== true ? `none` : `flex`)};
  justify-content: center;
  align-items: center;
  border: none;
  z-index: 10;
  ${Spinner} {
    height: 48px;
  }
`;
