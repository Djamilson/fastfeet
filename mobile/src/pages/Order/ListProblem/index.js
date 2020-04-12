import React, {useState, useEffect} from 'react';

import PropTypes from 'prop-types';

import api from '~/_services/api';
import Background from '~/components/Background/default';
import Loading from '~/components/Loading_';
import Message from '~/components/Message';
import Header from '~/pages/Order/Header';
import Problem from '~/pages/Order/ListProblem/Problem';

import {Container, Card, Title, List} from './styles';

export default function ListProblem({navigation, route}) {
  const {orderId, product} = route.params;

  const [loading, setLoading] = useState(false);
  const [deliveryProblems, setDeliveryProblems] = useState([]);

  useEffect(() => {
    async function loadDeliveryProblem() {
      setLoading(true);
      await api
        .get(`delivery/${orderId}/problems`)
        .then((res) => {
          setLoading(false);
          setDeliveryProblems(res.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }

    loadDeliveryProblem();
  }, [orderId]);

  return (
    <Background>
      <Container>
        <Header navigation={navigation} />

        {loading && <Loading loading={loading}>Carregando ...</Loading>}
        {!loading && deliveryProblems.length < 1 ? (
          <Message nameIcon="exclamation-triangle">
            Ops!! Essa entrega não tem problema cadastradas no momento!
          </Message>
        ) : (
          <Card>
            <Title>{product}</Title>
            <List
              data={deliveryProblems}
              keyExtractor={(item) => String(item.problem.id)}
              renderItem={({item}) => <Problem data={item} />}
            />
          </Card>
        )}
      </Container>
    </Background>
  );
}

ListProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.number.isRequired,
      product: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
