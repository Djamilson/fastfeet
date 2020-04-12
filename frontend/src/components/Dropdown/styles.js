import { Link } from 'react-router-dom';

import { lighten } from 'polished';
import styled from 'styled-components';
import media from 'styled-media-query';

import { colors, metrics } from '~/styles';

export const Container = styled.td`
  display: ${(props) => (props.visible ? 'block' : 'none')} !important;
  position: absolute;

  margin-left: -90px; /** direita x esquerda */
  margin-top: 40px; /**move tudo vertical x horizontal  */

  ${media.lessThan('600px')`
  margin-top: 95px; /**move tudo vertical x horizontal  */

  left: calc(50% + 100px);
  `}
`;

export const DropdownList = styled.div`
  position: absolute;
  outline: 0;
  width: 140px;
  background: ${colors.white_};

  border-radius: ${metrics.border_radius}px;
  border: 1px solid ${colors.fourth};

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

    ${media.lessThan('600px')`
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: 122px;
    width: 0;
    height: 0;
    border-left: 5px solid ${colors.fourth};
    border-right: 5px solid ${colors.fourth};
    border-top: 5px solid ${colors.white_};
  `}
  }
`;

export const DeleteDiv = styled.div`
  display: block;
  button {
    margin-left: 0px;
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
  }
`;

export const Visualizar = styled.div`
  display: ${(props) => (props.visibleLink ? 'block' : 'none')} !important;
  /* para inserir um espaço entre as noficações apartir da segunda*/
  & + div {
    margin: 0 10px;
    border-top: ${(props) =>
      props.visibleLink ? `1px solid ${colors.fourth}` : 'none'} !important;
  }

  button {
    margin-left: 0px;
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
  }
`;

export const Dropdown = styled.div`
  border-bottom: 1px solid ${colors.fourth};
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
  margin-right: 70px;
  outline: 0;
`;

export const Left = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 5px;
`;
