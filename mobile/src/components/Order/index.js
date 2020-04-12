import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import PropTypes from 'prop-types';

import HeaderOrder from '~/components/HeaderOrder';
import Modal from '~/components/Modal';
import {colors, fonts} from '~/styles';

import {
  Container,
  CardHeader,
  CardContent,
  Separator,
  CircleAwaitingWithdrawal,
  CircleWithdrawal,
  CircleDelivered,
  Card,
  AwaitingWithdrawalView,
  AwaitingWithdrawal,
  Withdrawal,
  Delivered,
  ButtonView,
  CardFooter,
  CardFooterLabel,
  CardFooterBotton,
  Annotation,
  FooterText,
  FooterView,
  CancelLinkText,
  SeeDetailsLink,
  SeeDetailsLinkText,
} from './styles';

export default function Order({navigation, data, display, handleCancel}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleProductDetail(item) {
    navigation.navigate('ProductDetail', {item});
  }

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <>
      <Container>
        <CardHeader>
          <HeaderOrder product={data.ord.product} />
        </CardHeader>
        <CardContent>
          <Separator>
            <CircleAwaitingWithdrawal />
            <CircleWithdrawal withdrawal={data.ord.withdrawal} />
            <CircleDelivered delivered={data.ord.delivered} />
          </Separator>
          <Card>
            <AwaitingWithdrawalView>
              <AwaitingWithdrawal>Aguardando</AwaitingWithdrawal>
              <AwaitingWithdrawal>Retirada</AwaitingWithdrawal>
            </AwaitingWithdrawalView>
            <Withdrawal>Retirada</Withdrawal>
            <Delivered>Entregue</Delivered>
          </Card>
        </CardContent>
        <CardFooter>
          <CardFooterLabel>
            <Annotation>
              <FooterText>Data</FooterText>
              <FooterView>{data.created_at}</FooterView>
            </Annotation>

            <Annotation>
              <FooterText>Cidade</FooterText>
              <FooterView>{data.ord.recipient.address.city.name}</FooterView>
            </Annotation>
          </CardFooterLabel>
          <CardFooterBotton>
            {display ? (
              <SeeDetailsLink
                navigate={navigation}
                onPress={() => handleProductDetail(data)}>
                <SeeDetailsLinkText>Ver Detalhes</SeeDetailsLinkText>
              </SeeDetailsLink>
            ) : (
              <SeeDetailsLink
                navigate={navigation}
                onPress={() => toggleModal()}>
                <ButtonView>
                  <Icon
                    name="closecircleo"
                    size={fonts.big}
                    color={colors.red}
                  />
                  <CancelLinkText>Cancelar</CancelLinkText>
                </ButtonView>
              </SeeDetailsLink>
            )}
          </CardFooterBotton>
        </CardFooter>
      </Container>
      <Modal
        toggleModal={toggleModal}
        handle={handleCancel}
        isModalVisible={isModalVisible}>
        Tem certeza que deseja cancelar essa encomenda?
      </Modal>
    </>
  );
}

Order.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Order.propTypes = {
  handleCancel: PropTypes.func.isRequired,

  display: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    created_at: PropTypes.string.isRequired,

    ord: PropTypes.shape({
      withdrawal: PropTypes.bool,
      delivered: PropTypes.bool,
      product: PropTypes.string,
      observation: PropTypes.string,
      recipient: PropTypes.shape({
        person: PropTypes.shape({
          name: PropTypes.string,
          phone: PropTypes.shape({
            prefix: PropTypes.string,
            number: PropTypes.string,
          }),
        }),
        address: PropTypes.shape({
          number: PropTypes.string,
          street: PropTypes.string,
          complement: PropTypes.string,
          zip_code: PropTypes.string,
          district: PropTypes.string,
          city: PropTypes.shape({
            name: PropTypes.string,
            state: PropTypes.shape({
              acronym: PropTypes.string,
            }),
          }),
        }),
      }),
      cancelable: PropTypes.bool,
      start_date: PropTypes.string,
      status: PropTypes.string,
      canceled_at: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
