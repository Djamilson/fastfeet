import React from 'react';
import ModalReact from 'react-native-modal';

import PropTypes from 'prop-types';

import {
  Container,
  Footer,
  NoButton,
  YasButton,
  Title,
  Item,
  Children,
  Text,
} from './styles';

export default function Modal({children, toggleModal, handle, isModalVisible}) {
  return (
    isModalVisible && (
      <Container>
        <ModalReact isVisible={isModalVisible} animationType="slide">
          <Item>
            <Title>Atenção!</Title>

            <Children>{children}</Children>

            <Footer>
              <NoButton loading onPress={toggleModal}>
                <Text>Não</Text>
              </NoButton>
              <YasButton
                onPress={() => {
                  toggleModal();
                  handle();
                }}>
                <Text>Sim</Text>
              </YasButton>
            </Footer>
          </Item>
        </ModalReact>
      </Container>
    )
  );
}

Modal.propTypes = {
  children: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};
