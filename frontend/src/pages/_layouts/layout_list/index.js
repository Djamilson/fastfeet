import React from 'react';

import PropTypes from 'prop-types';

import { WList, Content } from './styles';

export default function List({ children }) {
  return (
    <WList>
      <Content> {children} </Content>
    </WList>
  );
}

List.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element]).isRequired,
};
