import React from 'react';

import PropTypes from 'prop-types';

import * as S from './styled';

export default function ButtonMenu({ handleClick, isActive }) {
  return (
    <S.ButtonHamburger
      onClick={handleClick}
      className={isActive ? 'active' : ''}
    >
      <span />
    </S.ButtonHamburger>
  );
}

ButtonMenu.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
