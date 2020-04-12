import React from 'react';
import {ActivityIndicator} from 'react-native';

import PropTypes from 'prop-types';

import colors from '~/styles/colors';

import {Container, Text} from './styles';

export default function Button({children, loading, ...rest}) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.white_} />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

Button.default = {loading: false};
