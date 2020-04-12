import React from 'react';

import { Container, Image } from './styles';

export default function RowItem() {
  return (
    <Container>
      <tr>
        <th>ID</th>
        <Image>Foto</Image>
        <th>Nome</th>
        <th>Email</th>
        <th colSpan={2}>Ação</th>
      </tr>
    </Container>
  );
}
