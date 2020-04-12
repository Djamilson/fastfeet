import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Dropdown from '~/pages/Problem/Dropdown';

import { Container, ColumnButton } from './styles';

export default function RowItem({
  data,
  showDelete,
  detail,
  getProblemSelect,
}) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    getProblemSelect();
    setVisible(!visible);
  }

  function handleEdit(id) {
    return `/orders/${id}/edit`;
  }

  // pega o valor para oculta modal
  function newHandleDelete() {
    showDelete();
    setVisible(!visible);
  }

  // pega o valor para oculta modal detail
  function newHandleDetail() {
    setVisible(!visible);
    detail();
  }

  return (
    <Container>
      <td>
        <strong>ID</strong>#{data.order_id}
      </td>
      <td>
        <strong>Problema</strong>
        {data.description}
      </td>
      <ColumnButton>
        <button type="button" onClick={() => handleToggleVisible()}>
          <span />
          <span />
          <span />
        </button>
      </ColumnButton>

      <Dropdown
        visible={visible}
        data={data}
        handleEdit={() => handleEdit(data.id)}
        showDelete={() => newHandleDelete()}
        detail={() => newHandleDetail()}
        nameButton="Cancelar encomenda"
      />
    </Container>
  );
}

RowItem.propTypes = {
  showDelete: PropTypes.func.isRequired,
  getProblemSelect: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
