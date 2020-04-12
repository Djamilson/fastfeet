import React from 'react';

import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function Form({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Form.propTypes = {
  children: PropTypes.element.isRequired,
};
