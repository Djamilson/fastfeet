import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';

import Avatar from '~/components/Avatar';
import TermosCondicoes from '~/components/TermosCondicoes';
import {colors, fonts} from '~/styles';

import {
  Container,
  ContainerAvatar,
  ProfileInfo,
  Name,
  Bio,
  ProfileContainer,
  ButtonContainer,
  ButtonLogout,
  ButtonPrivacy,
} from './styles';

export default function Header({navigation}) {
  const deliveryman = useSelector((state) => state.user.profile);

  const [isApproveButton] = useState(true);
  const [isModalVisiblePrivacy, setIsModalVisiblePrivacy] = useState(false);

  function toggleModalPrivacy() {
    setIsModalVisiblePrivacy(!isModalVisiblePrivacy);
  }

  function changeLogout() {
    navigation.navigate('Logout');
  }

  return (
    <Container>
      <ProfileContainer>
        <ContainerAvatar>
          <Avatar data={deliveryman} number={1} />
        </ContainerAvatar>
        <ProfileInfo>
          <Bio>Bem vindo de volta.</Bio>
          <Name>{deliveryman.person.name}</Name>
        </ProfileInfo>
        <ButtonContainer>
          <ButtonLogout onPress={() => changeLogout()}>
            <Icon
              name="ios-log-in"
              size={fonts.small_big}
              color={colors.rede}
            />
          </ButtonLogout>
          <ButtonPrivacy onPress={toggleModalPrivacy}>
            <FontAwesome
              name="gear"
              size={fonts.small_big}
              color={colors.rede}
            />
          </ButtonPrivacy>
        </ButtonContainer>
      </ProfileContainer>

      <TermosCondicoes
        toggleModal={toggleModalPrivacy}
        isModalVisible={isModalVisiblePrivacy}
        navigation={navigation}
        isApproveButton={isApproveButton}
      />
    </Container>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
