import React, {useEffect, useState} from 'react';
import {Alert, Animated} from 'react-native';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';

import api from '~/_services/api';
import Background from '~/components/Background/default';
import Loading from '~/components/Loading';
import Message from '~/components/Message';
import Toast from '~/components/MessageToast';
import Order from '~/components/Order';
import Header from '~/components/SubHeader';

import {
  Container,
  Content,
  ProfileContainer,
  Name,
  ProfileInfo,
  OrderDeliveredLink,
  SubLinhaButton,
  PendingLinkText,
  OrderWithdrawLink,
  SignLinkText,
  ContentList,
  List,
} from './styles';

export default function Pending({navigation}) {
  const deliveryman_id = useSelector((state) => state.user.profile.id);
  const [pending, setPending] = useState([]);
  const [pendingOld, setPendingOld] = useState([]);

  const animatedValue = new Animated.Value(0);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [orderInfo, setOrderInfo] = useState({});

  function closeToast() {
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }

  function callToast() {
    setVisible(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 350,
    }).start(closeToast());
  }

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    try {
      if (!shouldRefresh && page === orderInfo.pages) {
        callToast();
        return;
      }

      if (loading) return;

      if (!shouldRefresh) {
        setLoading(true);
      }
      const res = await api.get(
        `deliveryman/${deliveryman_id}/pending?limit=3&page=${pageNumber}`,
      );
      setLoading(false);
      const {list} = res.data;

      setPage(pageNumber + 1);
      setOrderInfo(res.data.orderInfo);
      setPending(shouldRefresh ? list : [...pending, ...list]);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function refreshList() {
    setOrderInfo({});

    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }
  // para força, pois estava dando error
  useEffect(() => {
    if (page === 1) {
      setPending([]);
      setVisible(false);
      refreshList();
    }
  }, []);

  async function handleCancel(id) {
    setPendingOld(pending);
    await api
      .delete(`orders/${id}/cancelwithdraw`)
      .then(() => {
        Alert.alert('Sucesso', 'Entrega cancelada com sucesso!');

        setPending(
          pending
            .filter((item) => item.ord.id !== id)
            .map((ap, index) => {
              return {...ap, index};
            }),
        );
      })
      .catch(() => {
        setPending(pendingOld);

        Alert.alert(
          'Atenção',
          'Não foi possível fazer a devolução da encomenda, tente novamente!',
        );
      });
  }

  return (
    <Background>
      <Container>
        <Header navigation={navigation} />
        <Content>
          <ProfileContainer>
            <Name>Entregas</Name>
            <ProfileInfo>
              <OrderDeliveredLink
                onPress={() => navigation.navigate('Pending')}>
                <SubLinhaButton>
                  <PendingLinkText>Pendentes</PendingLinkText>
                </SubLinhaButton>
              </OrderDeliveredLink>
              <OrderWithdrawLink
                onPress={() => navigation.navigate('OrderDelivered')}>
                <SignLinkText>Entregues</SignLinkText>
              </OrderWithdrawLink>
            </ProfileInfo>
          </ProfileContainer>
          {!loading && pending.length < 1 ? (
            <Message nameIcon="sign-language">
              Ops!! Você não tem entregas pendentes no momento!
            </Message>
          ) : (
            <ContentList>
              <List
                data={pending}
                keyExtractor={(item) => String(item.ord.id)}
                showsVerticalScrollIndicator={false}
                onRefresh={refreshList}
                refreshing={refreshing}
                onEndReachedThreshold={0.1}
                onEndReached={() => loadPage()}
                renderItem={({item}) => (
                  <Order
                    navigation={navigation}
                    data={item}
                    display={Boolean(false)}
                    handleCancel={() => handleCancel(item.ord.id)}
                  />
                )}
              />
              {loading && <Loading />}
              <Toast
                visible={visible}
                message="Ops! Já não temos mais resgistros para buscar."
              />
            </ContentList>
          )}
        </Content>
      </Container>
    </Background>
  );
}

Pending.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
