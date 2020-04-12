import React from 'react';

import PropTypes from 'prop-types';

import Pagination from '~/components/Table/Pagination';

import { Container, List } from './styles';

export default function Table({ children, loadPage, pages }) {
  return (
    <Container>
      <List cellPadding={0} cellSpacing={0}>
        <>{children}</>
      </List>
      <Pagination pages={pages} loadPage={loadPage} />
    </Container>
  );
}

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string,
  ]).isRequired,
  pages: PropTypes.number,
  loadPage: PropTypes.func.isRequired,
};

Table.defaultProps = {
  pages: 1,
};
