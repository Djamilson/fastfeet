import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';

import api from '~/_services/api';
import Background from '~/components/Background/default';
import HeaderOrder from '~/components/HeaderOrder';
import Tabs from '~/components/Tabs';
import Header from '~/pages/Order/Header';
import {colors, fonts} from '~/styles';

import {
  Container,
  TitleStatus,
  CadProduct,
  Product,
  ContainerProduct,
  ProductView,
  Label,
  InfoText,
  InfoAddress,
  DeliveryDetail,
  HeaderDelivery,
  ContainerTime,
  InfoTime,
  Date,
  Withdrawal,
} from './styles';

export default function ProductDetail({navigation, route}) {
  const deliveryman_id = useSelector((state) => state.user.profile.id);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(route.params.item);

  useEffect(() => {
    setData(data);
  }, [data]);

  function deliveryProblem(item) {
    const {id, end_date, product} = item;

    if (end_date) {
      Alert.alert(
        'Opss !!',
        'Essa entrega já foi realizada, não pode cadastrar problema.',
      );
      return;
    }

    navigation.navigate('DeliveryProblem', {
      orderId: id,
      product,
    });
  }

  function listProblem(item) {
    const {product, id} = item;
    navigation.navigate('ListProblem', {
      orderId: id,
      product,
    });
  }

  function handleSignature(item) {
    const {id: order_id, end_date} = item;
    if (end_date) {
      Alert.alert('Opss !!', 'Essa entrega já foi realizada.');
      return;
    }
    navigation.navigate('Signature', {
      order_id,
    });
  }

  async function handleMakethewithdrawal(order) {
    setLoading(true);

    const {id} = order;

    if (!order.withdrawProduct) {
      setLoading(false);
      Alert.alert(
        'Atenção!',
        'Horário de retirada de produto é entre 08horas e às 18horas!',
      );
      return;
    }

    try {
      const resp = await api.post(`orders/${id}/withdraw`, {
        deliveryman_id,
      });

      setData(resp.data);
      setLoading(false);
      Alert.alert('Sucesso!', 'Produto retirado, já pode ser feito a entrega.');
      navigation.navigate('Dashboard');
    } catch (error) {
      setLoading(false);

      const str = error.toString();
      const final = str.replace(/\D/g, '');

      if (final === '401') {
        Alert.alert(
          'Atenção!',
          'Não existe essa order de retirada cadastrada!',
        );
        return;
      }
      if (final === '402') {
        Alert.alert('Atenção!', 'Produto já foi retirado!');
        return;
      }
      if (final === '403') {
        Alert.alert('Atenção!', 'Só pode retirar 5 produto por dia!');
      }
    }
  }

  return (
    <Background>
      <Container>
        <Header navigation={navigation} />

        <CadProduct>
          <ContainerProduct>
            <Product>
              <HeaderOrder product="Informações da entrega" />
              <ProductView>
                <Label>DESTINATÁRIO</Label>
                <InfoText>{data.ord.recipient.person.name}</InfoText>
                <Label>ENDEREÇO DE ENTREGA</Label>
                <InfoAddress>
                  {data.ord.recipient.address.street},{' '}
                  {data.ord.recipient.address.number},{' '}
                  {data.ord.recipient.address.complement},{' '}
                  {data.ord.recipient.address.district},{' '}
                  {data.ord.recipient.address.city.name}-
                  {data.ord.recipient.address.city.state.acronym},{' '}
                  {data.ord.recipient.address.zip_code},
                </InfoAddress>
                <Label>PRODUTO</Label>
                <InfoText>{data.ord.product}</InfoText>
              </ProductView>
            </Product>
          </ContainerProduct>
          <ContainerProduct>
            <DeliveryDetail>
              <HeaderDelivery>
                <Icon name="calendar" size={fonts.big} color={colors.third} />
                <TitleStatus>Situação da entrega</TitleStatus>
              </HeaderDelivery>
              <Label>STATUS</Label>
              <InfoText>{data.ord.status}</InfoText>
              <ContainerTime>
                <Date>
                  <Label>DATA DE RETIRADA</Label>
                  <InfoTime>
                    {data.start_date !== undefined
                      ? `${data.start_date}`
                      : '-- /-- /--'}
                  </InfoTime>
                </Date>
                <Date>
                  <Label>DATA DE ENTREGA</Label>
                  <InfoTime>
                    {data.end_date !== undefined
                      ? `${data.end_date}`
                      : '-- /-- /--'}
                  </InfoTime>
                </Date>
              </ContainerTime>
            </DeliveryDetail>
          </ContainerProduct>

          {!data.ord.start_date ? (
            <Withdrawal
              loading={loading}
              onPress={() => handleMakethewithdrawal(data.ord)}>
              Fazer retirada
            </Withdrawal>
          ) : (
            <Tabs
              navigation={navigation}
              deliveryProblem={() => deliveryProblem(data.ord)}
              listProblem={() => listProblem(data.ord)}
              handleSignature={() => handleSignature(data.ord)}
            />
          )}
        </CadProduct>
      </Container>
    </Background>
  );
}

ProductDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};
