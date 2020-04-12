import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import colors from '~/styles/colors';

import {Container, ButtonHeader} from './styles';

export default function Header({navigation}) {
  return (
    <Container>
      <ButtonHeader
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="chevron-left" size={30} color={colors.white} />
      </ButtonHeader>
    </Container>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
