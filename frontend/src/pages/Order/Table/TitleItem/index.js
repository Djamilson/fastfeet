import React from 'react';

import { Container } from './styles';

export default function RowItem() {
  return (
    <Container>
      <tr>
        <th>ID</th>
        <th>Destinatário</th>
        <th>Entregador</th>
        <th>Cidade</th>
        <th>Estado</th>
        <th>Status</th>
        <th colSpan={2}>Ação</th>
      </tr>
    </Container>
  );
}
