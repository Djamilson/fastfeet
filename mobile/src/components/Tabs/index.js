import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import PropTypes from 'prop-types';

import {colors, fonts} from '~/styles';

import {
  Container,
  ReportProblem,
  TabText,
  ViewProblems,
  ConfirmDelivery,
} from './styles';

export default function Tabs({
  navigation,
  deliveryProblem,
  listProblem,
  handleSignature,
}) {
  return (
    <Container>
      <ReportProblem navigation={navigation} onPress={() => deliveryProblem()}>
        <Icon name="closecircleo" size={fonts.big} color={colors.red} />
        <TabText>Informar</TabText>
        <TabText>Problema</TabText>
      </ReportProblem>
      <ViewProblems navigation={navigation} onPress={() => listProblem()}>
        <Icon name="infocirlceo" size={fonts.big} color={colors.gargoylegas} />
        <TabText>Visualizar</TabText>
        <TabText>Problemas</TabText>
      </ViewProblems>
      <ConfirmDelivery
        navigation={navigation}
        onPress={() => handleSignature()}>
        <Icon name="checkcircleo" size={fonts.big} color={colors.third} />
        <TabText>Confirmar</TabText>
        <TabText>Entrega</TabText>
      </ConfirmDelivery>
    </Container>
  );
}

Tabs.propTypes = PropTypes.shape({
  deliveryProblem: PropTypes.func.isRequired,
  listProblem: PropTypes.func.isRequired,
  handleSignature: PropTypes.func.isRequired,
});

Tabs.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
