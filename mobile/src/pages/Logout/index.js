import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Avatar from '~/components/Avatar';
import Background from '~/components/Background/default';
import {signOut} from '~/store/modules/auth/actions';

import {
  Container,
  ContainerAvatar,
  Content,
  Label,
  InfoText,
  SubmitButton,
} from './styles';

export default function Logout() {
  const deliveryman = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <ContainerAvatar>
          <Avatar data={deliveryman} number={2.5} />
        </ContainerAvatar>
        <Content>
          <Label>Nome completo</Label>
          <InfoText>{deliveryman.person.name}</InfoText>
          <Label>Email</Label>
          <InfoText>{deliveryman.person.email}</InfoText>
          <Label>Data de cadastro</Label>
          <InfoText>{deliveryman.created_at}</InfoText>
        </Content>
        <SubmitButton loading={false} onPress={() => handleLogout()}>
          Logout
        </SubmitButton>
      </Container>
    </Background>
  );
}
