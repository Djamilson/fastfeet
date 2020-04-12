import React, {forwardRef} from 'react';

import PropTypes from 'prop-types';

import {TInput} from './styles';

function InputTextArea({...rest}, ref) {
  return (
    <TInput
      {...rest}
      ref={ref}
      multiline
      numberOfLines={15}
      textAlignVertical="top"
    />
  );
}

InputTextArea.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InputTextArea.defaultProps = {style: {}};

export default forwardRef(InputTextArea);
