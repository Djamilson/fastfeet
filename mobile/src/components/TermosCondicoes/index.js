import React, {useState} from 'react';
import ModalReact from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';

import PropTypes from 'prop-types';

import Regulation from '~/components/Regulation';
import {acceptionRegulation} from '~/store/modules/auth/actions';

import {
  Container,
  Background,
  Item,
  ApproveButton,
  ApproveButtonText,
  Footer,
  NoButton,
  Text,
} from './styles';

export default function TermosCondicoes({
  toggleModal,
  isModalVisible,
  navigation,
  isApproveButton,
}) {
  const [privacy] = useState(useSelector((state) => state));
  const dispatch = useDispatch();
  const [id] = useState(useSelector((state) => state.user.profile.id));

  function handleAcceptRegulation() {
    const newPrivacy = !privacy;

    const {navigate} = navigation;
    dispatch(acceptionRegulation({id, newPrivacy, navigate}));
    toggleModal();
  }

  return (
    isModalVisible && (
      <Container>
        <ModalReact isVisible={isModalVisible} animationType="slide">
          <Background>
            <Item>
              <Regulation />
            </Item>

            {isApproveButton && (
              <ApproveButton onPress={handleAcceptRegulation}>
                <ApproveButtonText>Não aceito os termos</ApproveButtonText>
              </ApproveButton>
            )}
          </Background>
          <Footer>
            <NoButton loading onPress={toggleModal}>
              <Text>Fechar</Text>
            </NoButton>
          </Footer>
        </ModalReact>
      </Container>
    )
  );
}

TermosCondicoes.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  isApproveButton: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
