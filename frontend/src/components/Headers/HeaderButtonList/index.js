import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';

import PropTypes from 'prop-types';

import { colors } from '~/styles';

import { Container, NextLink, ContainerInput } from './styled';

export default function HeaderButton({
  handleChange,
  search,
  placeholder,
  titleNext,
  next,
}) {
  const path = `/${next}`;

  return (
    <Container>
      <ContainerInput>
        <AiOutlineSearch
          size={16}
          style={{ margin: '0px 5px 0 0' }}
          color={colors.nine}
        />
        <label htmlFor="search-input">
          <input
            type="search"
            name="search"
            value={search}
            id="search-input"
            placeholder={placeholder}
            onChange={handleChange}
          />
        </label>
      </ContainerInput>

      <NextLink to={path}>
        <MdAdd style={{ marginRight: '5px' }} color={colors.white_} size="20" />
        {titleNext}
      </NextLink>
    </Container>
  );
}

HeaderButton.propTypes = {
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  next: PropTypes.string.isRequired,
  titleNext: PropTypes.string.isRequired,
};
