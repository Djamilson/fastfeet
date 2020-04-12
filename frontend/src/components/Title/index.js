import React from 'react';

import PropTypes from 'prop-types';

import { Container, StyledTitle } from './styles';

export default function Title({ children }) {
  return (
    <Container>
      <StyledTitle>{children}</StyledTitle>
    </Container>
  );
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
};
