import React from 'react';
import {Modal, ActivityIndicator} from 'react-native';

import PropTypes from 'prop-types';

import {colors} from '~/styles';

import {ModalBackground, ActivityIndicatorWrapper, Name} from './styles';

export default function Loading({children, loading}) {
  return (
    <Modal
      transparent
      animationType="none"
      visible={loading}
      onRequestClose={() => {}}>
      <ModalBackground>
        <ActivityIndicatorWrapper>
          <ActivityIndicator
            animating={loading}
            size="small"
            color={colors.third}
          />
          <Name>{children}</Name>
        </ActivityIndicatorWrapper>
      </ModalBackground>
    </Modal>
  );
}

Loading.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};
