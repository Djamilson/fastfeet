import React from 'react';

import {Container, Content, TRegulation, Title} from './styles';

export default function Regulation() {
  return (
    <Container>
      <Content>
        <Title>Privacidade e Termos</Title>
        <TRegulation>
          Para acessar o FastFeet, você precisa concordar com os Termos de
          Serviços abaixo.
          {'\n\n'}
          Além disso, quando você acessa, nós processamos suas informações
          conforme descrito na nossa Política de Privacidade, incluindo estes
          pontos-chave:
          {'\n\n'}
          Os dados que processamos quando você usa o FastFeet, nós armazenamos
          as informações fornecidas.
          {'\n\n'}
          Quando você usa o serviço da FastFeet para ação como fazer uma
          finalização de entrega, as informações que são inseridas são
          armazenada. Também processamos os tipos de informação descritos acima
          quando você usa o app ou site que usam serviço do FastFeet.
          {'\n\n'}Por que processamos esses dados para os fins descritos na
          nossa política, incluindo o seguinte:
          {'\n\n'}
          Melhorar a qualidade dos nossos serviços e desenvolver novos;{'\n'}
          Melhorar a segurança, protegendo contra fraudes e abusos.{'\n'}
          Você poderá revogar seu consentimento no futuro sempre que quiser.
        </TRegulation>
      </Content>
    </Container>
  );
}
