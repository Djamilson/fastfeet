import React from 'react';

import PropTypes from 'prop-types';

import { Navigation, Item, Button } from './styles';

export default function Pagination({ loadPage, pages }) {
  const pageNumbers = [];

  for (let i = 1; i <= pages; ++i) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.length > 1 && (
        <Navigation>
          <Item>
            <Button onClick={() => loadPage(1)}>{`<<`}</Button>
          </Item>
          {pageNumbers.map((number) => (
            <Item key={number}>
              <Button onClick={() => loadPage(number)}>{`${number}`}</Button>
            </Item>
          ))}
          <Item>
            <Button onClick={() => loadPage(pageNumbers.length)}>{`>>`}</Button>
          </Item>
        </Navigation>
      )}
    </div>
  );
}

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  loadPage: PropTypes.func.isRequired,
};
