import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Dropdown from '~/components/Dropdown';

import { Container, ColumnSpan, ColumnButton } from './styles';

export default function RowItem({ data, showDelete }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleEdit(id) {
    return `/recipients/${id}/edit`;
  }

  // pega o valor para oculta modal
  function newHandleDelete() {
    showDelete();
    setVisible(!visible);
  }

  return (
    <Container>
      <td>
        <strong>ID</strong>#{data.id}
      </td>
      <td>
        <strong>Nome</strong>
        {data.person.name}
      </td>
      <ColumnSpan>
        <strong>Endereço</strong>
        <div>
          {data.address.street}, {data.address.number}, {data.address.city.name}
          -{data.address.city.state.name}
        </div>
      </ColumnSpan>
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
        visibleLink={false}
        visibleEdit
        handleEdit={() => handleEdit(data.id)}
        showDelete={() => newHandleDelete()}
      />
    </Container>
  );
}

RowItem.propTypes = {
  showDelete: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    person: PropTypes.shape({
      name: PropTypes.string,
    }),
    address: PropTypes.shape({
      number: PropTypes.string,
      street: PropTypes.string,
      complement: PropTypes.string,
      zip_code: PropTypes.string,
      district: PropTypes.string,
      city: PropTypes.shape({
        name: PropTypes.string,
        state: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
