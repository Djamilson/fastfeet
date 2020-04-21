import React, {useState} from 'react';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import api from '~/_services/api';
import Background from '~/components/Background/default';
import Header from '~/pages/Order/Header';
import colors from '~/styles/colors';

import {
  Container,
  Content,
  Card,
  CardImage,
  CardContent,
  Description,
  CardButton,
  ButtonSelect,
  SignatureStyled,
  ButtonSave,
  ButtonText,
} from './styles';

export default function Signature({navigation, route}) {
  const {order_id} = route.params;

  const [image, setImage] = useState({preview: '', file: ''});

  const imagePickerOptions = {
    title: 'Selecione uma assinatura',
    takePhotoButtonTitle: 'Tirar foto',
    chooseFromLibraryButtonTitle: 'Escolher da Galeria',
  };

  function handleSelectImage() {
    ImagePicker.showImagePicker(imagePickerOptions, (upload) => {
      if (upload.didCancel) {
        return;
      }
      if (upload.error) {
        return;
      }
      if (upload.customButton) {
        return;
      }
      if (!upload.uri) {
        return;
      }
      const preview = {uri: `data:image/jpeg;base64, ${upload.data}`};

      let prefix;
      let ext;

      if (upload.fileName) {
        [prefix, ext] = upload.fileName.split('.');
        ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
      } else {
        prefix = new Date().getTime();
        ext = 'jpg';
      }
      const file = {
        uri: upload.uri,
        type: upload.type,
        name: `${prefix}.${ext}`,
      };

      setImage({
        preview,
        file,
      });
    });
  }

  async function handleSubmit() {
    const data = new FormData();

    data.append('file', image.file);
    data.append('order_id', order_id);

    try {
      await api.put(`orders/${order_id}/subscriptions`, data);

      Alert.alert('Sucesso!', 'Assinatura cadastrada!');

      navigation.navigate('Dashboard');
    } catch (error) {
      const str = error.toString();
      const final = str.replace(/\D/g, '');

      if (final === '400') {
        Alert.alert(
          'Atenção',
          'Essa entrega não existe, tente atualizar a lista de entrega!',
        );
        return;
      }
      if (final === '401') {
        Alert.alert(
          'Atenção',
          'Essa entrega  já foi realizada, tente atualizar a lista de entrega!',
        );
        return;
      }

      Alert.alert(
        'Atenção!',
        'Não foi possível finalizar a entrega, tente novamente!',
      );
    }
  }

  return (
    <Background>
      <Container>
        <Header navigation={navigation} />
        <Content>
          <Card>
            <CardImage>
              {!image.preview && (
                <CardContent>
                  <Description>Ops!! Ainda não temos assinatura.</Description>
                </CardContent>
              )}

              {!!image.preview && <SignatureStyled source={image.preview} />}

              <CardButton>
                <ButtonSelect onPress={() => handleSelectImage()}>
                  <Icon name="photo-camera" size={40} color={colors.white} />
                </ButtonSelect>
              </CardButton>
            </CardImage>
            {!!image.preview && (
              <ButtonSave onPress={() => handleSubmit()}>
                <ButtonText>Enviar</ButtonText>
              </ButtonSave>
            )}
          </Card>
        </Content>
      </Container>
    </Background>
  );
}

Signature.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      order_id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
