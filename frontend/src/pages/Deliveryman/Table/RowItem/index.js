import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Dropdown from '~/components/Dropdown';

import { Container, ImageTD, ColumnButton } from './styles';

export default function RowItem({ data, showDelete }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleEdit(id) {
    return `/deliverymans/${id}/edit`;
  }

  // pega o valor para oculta modal
  function newHandleDelete() {
    showDelete();
    setVisible(!visible);
  }

  return (
    <Container>
      <td>
        <strong>ID</strong>#{data.password}
      </td>
      <ImageTD>
        <strong>Foto</strong>
        <img
          src={
            data.person.avatar.url ||
            'https://api.adorable.io/avatars/35/abott@adorable.png'
          }
          alt={data.person.name}
        />
      </ImageTD>

      <td>
        <strong>Nome</strong>
        {data.person.name}
      </td>
      <td>
        <strong>Email</strong>
        {data.person.email}
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
        visibleLink={false}
        handleEdit={() => handleEdit(data.id)}
        showDelete={() => newHandleDelete()}
      />
    </Container>
  );
}

RowItem.propTypes = {
  showDelete: PropTypes.func.isRequired,
  data: PropTypes.shape({
    password: PropTypes.string.isRequired,
    person: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    cancelable: PropTypes.bool,
    canceled_at: PropTypes.string,
  }).isRequired,
};
