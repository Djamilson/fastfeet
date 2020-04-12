import React from 'react';
import { MdDeleteForever, MdVisibility } from 'react-icons/md';

import PropTypes from 'prop-types';

import { colors, fonts } from '~/styles';

import {
  Container,
  DropdownList,
  Dropdown,
  Left,
  Leftt,
  Visualizar,
} from './styles';

export default function DropdownObject({ visible, showDelete, detail }) {
  return (
    <Container visible={visible}>
      <DropdownList>
        <Visualizar>
          <Leftt>
            <button type="button" onClick={detail}>
              <MdVisibility
                style={{ marginRight: '5px' }}
                color={colors.third}
                size={fonts.small}
              />
              Visualizar
            </button>
          </Leftt>
        </Visualizar>
        <Dropdown>
          <Left>
            <button type="button" onClick={showDelete}>
              <MdDeleteForever
                style={{ marginRight: '5px' }}
                color={colors.red}
                size={fonts.small}
              />
              Cancelar encomenda
            </button>
          </Left>
        </Dropdown>
      </DropdownList>
    </Container>
  );
}

DropdownObject.propTypes = {
  showDelete: PropTypes.func.isRequired,
  detail: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
