import React from 'react';
import { MdEdit, MdDeleteForever, MdVisibility } from 'react-icons/md';

import PropTypes from 'prop-types';

import { colors, fonts } from '~/styles';

import {
  Container,
  DropdownList,
  Dropdown,
  Left,
  StyledLink,
  Visualizar,
  DeleteDiv,
} from './styles';

export default function DropdownObject({
  visible,
  visibleLink,
  handleEdit,
  showDelete,
  detail,
}) {
  const edit = handleEdit;
  return (
    <Container visible={visible}>
      <DropdownList>
        <Visualizar visibleLink={visibleLink}>
          <Left>
            <button type="button" onClick={detail}>
              <MdVisibility
                style={{ marginRight: '5px' }}
                color={colors.third}
                size={fonts.small}
              />
              Visualizar
            </button>
          </Left>
        </Visualizar>
        <Dropdown>
          <StyledLink to={edit}>
            <MdEdit
              style={{ margin: '0 5px 0 -10px' }}
              color={colors.green_}
              size={fonts.small}
            />
            Editar
          </StyledLink>
        </Dropdown>

        <DeleteDiv>
          <Left>
            <button type="button" onClick={showDelete}>
              <MdDeleteForever
                style={{ marginRight: '5px' }}
                color={colors.red}
                size={fonts.small}
              />
              Excluir
            </button>
          </Left>
        </DeleteDiv>
      </DropdownList>
    </Container>
  );
}

DropdownObject.propTypes = {
  showDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  visibleLink: PropTypes.bool.isRequired,
  detail: PropTypes.func,
};
