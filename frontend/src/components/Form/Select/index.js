import React, { useRef, useEffect } from 'react';
import Select from 'react-select/creatable';

import PropTypes from 'prop-types';

import { useField } from '@unform/core';

import { Container } from '../styles';

const CreatableSelect = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <Container>
      <Select
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </Container>
  );
};
export default CreatableSelect;

CreatableSelect.propTypes = {
  name: PropTypes.string.isRequired,
  rest: PropTypes.element.isRequired,
};
