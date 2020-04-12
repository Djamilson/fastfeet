import { Link } from 'react-router-dom';

import { lighten } from 'polished';
import styled from 'styled-components';

import { colors, metrics } from '~/styles';

export const Container = styled.td`
  display: ${(props) => (props.visible ? 'block' : 'none')} !important;
  position: absolute;
  margin-left: -120px; /** direita x esquerda */
  margin-top: 40px; /**move tudo vertical x horizontal  */
  background: none;
  border-radius: ${metrics.border_radius}px;
`;

export const DropdownList = styled.div`
  margin-left: 15px; /** direita x esquerda */
  width: 170px;
  background: ${colors.white_};
  padding: 10px;
  border-radius: ${metrics.border_radius}px;
  border: 1px solid ${colors.fourth};

  position: absolute;
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid ${colors.fourth};
    border-right: 5px solid ${colors.fourth};
    border-bottom: 5px solid ${colors.white_};
  }
`;

export const Visualizar = styled.div`
  display: flex;
  width: 100%;

  button {
    margin-left: 0px;
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
  }
`;

export const Dropdown = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.fourth};
  button {
    margin-left: 0px;
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
  }
`;

export const StyledLink = styled(Link)`
  color: ${lighten(0.2, '#7159c1')};
  margin: 0px;
  margin-left: 10px;
  outline: 0;
`;

export const Left = styled.div`
  width: 100%;
  padding: 0;
  margin-left: -5px;
`;

export const Leftt = styled.div`
  margin-right: 67px;
  width: 100%;
`;
