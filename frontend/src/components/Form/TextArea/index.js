import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@unform/core';

import { Container } from '../styles';

export default function TextArea({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <textarea ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span className="error">{error}</span>}
    </Container>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  rest: PropTypes.func.isRequired,
};
