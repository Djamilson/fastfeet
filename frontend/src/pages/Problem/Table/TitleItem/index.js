import React from 'react';

import { Container, ColumnSpan } from './styles';

export default function RowItem() {
  return (
    <Container>
      <tr>
        <ColumnSpan>Encomenda</ColumnSpan>
        <th>Problema</th>
        <th colSpan={2}>Ação</th>
      </tr>
    </Container>
  );
}
