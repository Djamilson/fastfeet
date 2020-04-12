import React from 'react';
import { MdInfoOutline } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Front, Modall, ContentModal, Actions } from './styles';

export default function Modal({
  onClose,
  show,
  children,
  nameDelete,
  onDelete,
  nameButton,
}) {
  return (
    show && (
      <Front>
        <Modall id="modal">
          <h3>Atenção!</h3>
          <ContentModal>
            <MdInfoOutline
              style={{ marginRight: '40px' }}
              size={40}
              color="#ffee00"
            />
            <div>
              <span>{children}</span>
              <strong>{nameDelete}</strong>
            </div>
          </ContentModal>
          <Actions>
            <button type="button" className="toggle-button" onClick={onClose}>
              Não
            </button>
            <button type="button" className="toggle-button" onClick={onDelete}>
              Sim, {nameButton}!
            </button>
          </Actions>
        </Modall>
      </Front>
    )
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,

  nameDelete: PropTypes.string.isRequired,
  nameButton: PropTypes.string.isRequired,
};
