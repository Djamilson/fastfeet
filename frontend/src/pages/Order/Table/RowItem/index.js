import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Dropdown from '~/components/Dropdown';

import { Container, ColumnSpan, ColumnButton } from './styles';

export default function RowItem({ data, showDelete, detail, getOrderSelect }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    getOrderSelect();
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
        <strong>ID</strong>#{data.id}
      </td>
      <td>
        <strong>Destinatário</strong>
        {data.recipient.person.name}
      </td>
      <td>
        <strong>Entregador</strong>
        {data.deliveryman.person.name}
      </td>
      <td>
        <strong>Cidade</strong>
        {data.recipient.address.city.name}
      </td>
      <td>
        <strong>Estado</strong>
        {data.recipient.address.city.state.name}
      </td>
      <ColumnSpan color={data.color.color_two}>
        <div>
          <span />
          <h3>{data.status}</h3>
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
        visibleLink
        visibleEdit
        handleEdit={() => handleEdit(data.id)}
        showDelete={() => newHandleDelete()}
        detail={() => newHandleDetail()}
        nameButton="Excluir"
      />
    </Container>
  );
}

RowItem.propTypes = {
  detail: PropTypes.func.isRequired,
  getOrderSelect: PropTypes.func.isRequired,
  showDelete: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    color: PropTypes.shape({
      color_two: PropTypes.string.isRequired,
    }).isRequired,
    deliveryman: PropTypes.shape({
      person: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    recipient: PropTypes.shape({
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
            acronym: PropTypes.string,
          }),
        }),
      }),
    }),
    cancelable: PropTypes.bool,
    start_date: PropTypes.string,
    status: PropTypes.string,
    canceled_at: PropTypes.string,
  }).isRequired,
};
