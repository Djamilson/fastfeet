import React, {useState} from 'react';
import {Alert} from 'react-native';

import PropTypes from 'prop-types';

import api from '~/_services/api';
import Background from '~/components/Background/default';
import Header from '~/pages/Order/Header';

import {Container, Form, FormInput, SubmitButton} from './styles';

export default function DeliveryProblem({navigation, route}) {
  const {orderId} = route.params;

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    setLoading(true);
    if (description.length < 10) {
      Alert.alert(
        'Atenção!',
        'A descrição do problema deve ter mais características!',
      );
      setLoading(false);
      return;
    }

    try {
      await api.post(`/delivery/${orderId}/problems`, {description});
      Alert.alert('Sucesso!', 'Problema cadastrado com sucesso!');

      navigation.goBack();
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <Header navigation={navigation} />
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Inclua aqui o problema que ocorreu na entrega."
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={description}
            onChangeText={setDescription}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Salvar
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

DeliveryProblem.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
