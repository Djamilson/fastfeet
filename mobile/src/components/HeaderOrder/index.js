import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import PropTypes from 'prop-types';

import {colors, fonts} from '~/styles';

import {Container, Top, Title} from './styles';

export default function HeaderOrder({product}) {
  return (
    <Container>
      <Icon name="truck" size={fonts.bigbig} color={colors.third} />
      <Top>
        <Title>{product}</Title>
      </Top>
    </Container>
  );
}

HeaderOrder.propTypes = {
  product: PropTypes.string.isRequired,
};
