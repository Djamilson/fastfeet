import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
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
  SubLinhaButton,
  ProfileInfo,
  Name,
  ProfileContainer,
  OrderDeliveredLink,
  OrderWithdrawLink,
  SignLinkText,
  ContentList,
  List,
  PendingLinkText,
} from './styles';

export default function OrderDelivered({navigation}) {
  const deliveryman_id = useSelector((state) => state.user.profile.id);
  const [deliveries, setDeliveries] = useState([]);

  const animatedValue = new Animated.Value(0);
  const [load, setLoad] = useState(false);

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

      if (load) return;
      if (!shouldRefresh) {
        setLoad(true);
      }
      const res = await api.get(
        `deliveryman/${deliveryman_id}/deliveries?limit=3&page=${pageNumber}`,
      );
      setLoad(false);
      const {list} = res.data;

      setPage(pageNumber + 1);
      setOrderInfo(res.data.orderInfo);
      setDeliveries(shouldRefresh ? list : [...deliveries, ...list]);
    } catch (err) {
      // console.log('error::: ', err);
      setLoad(false);
    } finally {
      // / console.log('loading::: ', load);
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
      setDeliveries([]);
      setVisible(false);
      refreshList();
    }
  }, []);

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
                <PendingLinkText>Pendentes</PendingLinkText>
              </OrderDeliveredLink>
              <OrderWithdrawLink
                onPress={() => navigation.navigate('OrderDelivered')}>
                <SubLinhaButton>
                  <SignLinkText>Entregues</SignLinkText>
                </SubLinhaButton>
              </OrderWithdrawLink>
            </ProfileInfo>
          </ProfileContainer>
          {!load && deliveries.length < 1 ? (
            <Message nameIcon="exclamation-triangle">
              Ops!! Até o momento, você ainda não fez nenhuma entrega!
            </Message>
          ) : (
            <ContentList>
              <List
                data={deliveries}
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
                    handleCancel={() => {}}
                    display={Boolean(true)}
                  />
                )}
              />
              {load && <Loading />}

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

OrderDelivered.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
