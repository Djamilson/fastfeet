import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import PropTypes from 'prop-types';

import {Container, Info, Name} from './styles';

export default function Message({children, nameIcon}) {
  return (
    <Container>
      <Icon name={nameIcon} size={30} color="#ffe119" />
      <Info>
        <Name>{children}</Name>
      </Info>
    </Container>
  );
}

Message.propTypes = {
  children: PropTypes.string.isRequired,
  nameIcon: PropTypes.string.isRequired,
};
