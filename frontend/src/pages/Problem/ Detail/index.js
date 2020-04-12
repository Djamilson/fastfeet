import React from 'react';

import PropTypes from 'prop-types';

import { Front, Modall } from './styles';

export default function Detail({ onClose, show, description }) {
  return (
    show && (
      <Front className="toggle-button" onClick={onClose}>
        <Modall id="modal">
          <h3>Informações da encomenda</h3>
          <section>
            <p>{description}</p>
          </section>
        </Modall>
      </Front>
    )
  );
}

Detail.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
};
