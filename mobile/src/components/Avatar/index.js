import React from 'react';

import PropTypes from 'prop-types';

import localhostConfig from '~/_config/host';

import {Avatar} from './styles';

const {WEBHOST, PORT} = localhostConfig;

export default function Header({data, number}) {
  let url = `${data.person.avatar.url}`;

  if (__DEV__) {
    url = `http://${WEBHOST}:${PORT}/files/${data.person.avatar.path}`;
  }

  return (
    <Avatar
      number={number}
      source={{
        uri: data
          ? `${url}`
          : `https://api.adorable.io/avatar/50/${data.person.name}.png`,
      }}
    />
  );
}

Header.propTypes = {
  number: PropTypes.number.isRequired,
  data: PropTypes.shape({
    person: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
