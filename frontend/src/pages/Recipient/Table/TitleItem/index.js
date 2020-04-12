import React from 'react';

import { Container } from './styles';

export default function RowItem() {
  return (
    <Container>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Endereço</th>
        <th colSpan={2}>Ação</th>
      </tr>
    </Container>
  );
}
