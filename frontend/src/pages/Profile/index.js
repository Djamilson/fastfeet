import React, { useState, useEffect, useRef } from 'react';
import { MdPhoto } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Scope } from '@unform/core';
import { Form } from '@unform/web';

import api from '~/_services/api';
import Input from '~/components/Form/Input';
import { Content } from '~/components/Form/styles';
import HeaderButton from '~/components/Headers/HeaderButtonForm';
import Background from '~/pages/_layouts/layout_form';
import {
  updateProfileRequest,
  updateProfileAvatarRequest,
  updateProfileSuccess,
} from '~/store/modules/user/actions';
import { colors } from '~/styles';

import {
  Container,
  ImagemDiv,
  ContaineIcon,
  Avatar,
  GroupEmail,
  Password,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state) => state.user.profile);

  const [color] = useState(`${colors.serven}`);

  const formRef = useRef(null);
  const inputRef = useRef();

  const [image, setImage] = useState({ preview: '', file: '', id_file: '' });

  async function load() {
    if (profile.person.avatar) {
      const { id, url } = profile.person.avatar;
      setImage({ preview: url, id_file: id });
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleChange(e) {
    setLoading(true);
    const data = new FormData();
    data.append('file', e.target.files[0]);

    if (typeof profile.avatar !== typeof undefined) {
      const { avatar } = profile.person;
      data.append('id_logo', avatar.id);
      data.append('url_logo', avatar.url);
      data.append('path_logo', avatar.path);

      await api
        .put(`files/${avatar.id}`, data)
        .then((d) => {
          dispatch(updateProfileSuccess({ ...profile, avatar: data }));
          toast.success(
            `Avatar editado com sucesso, imagem poder ser atualizada só no próximo login!`
          );

          setImage({ preview: d.data.file.url, id_file: d.data.file._id });

          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error('Não foi possível editar, tente novamente!');
        });
    } else {
      data.append('person_id', profile.person.id);
      await api
        .post('files', data)
        .then(async (res) => {
          const { _id, url } = res.data;

          setLoading(false);

          const profileNovo = { avatar_id: _id };
          dispatch(updateProfileAvatarRequest(profileNovo));
          setImage({ preview: url, id_file: _id });
        })
        .catch(() => {
          setLoading(false);
          toast.error('Erro no upload da imagem, tente novamente!');
        });
    }
  }

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data.person));
  }

  return (
    <Background>
      <Container>
        <Form ref={formRef} initialData={profile} onSubmit={handleSubmit}>
          <HeaderButton
            title="Perfil do usuário"
            hadleAction={handleSubmit}
            titleAction="Salvar"
            goback="orders"
            loading={loading}
          />
          <Content>
            <ImagemDiv>
              <Avatar color={color}>
                <label>
                  {image.preview ? (
                    <img
                      src={
                        image.preview ||
                        'https://api.adorable.io/avatars/50/abott@adorable.png'
                      }
                      alt={profile.person.name}
                    />
                  ) : (
                    <ContaineIcon>
                      <MdPhoto size={40} color={colors.serven} />
                      Adicionar foto
                    </ContaineIcon>
                  )}
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    ref={inputRef}
                  />
                </label>
              </Avatar>
            </ImagemDiv>
            <Scope path="person">
              <article>
                <label htmlFor="idName">Nome</label>
                <Input type="text" id="idName" name="name" placeholder="Nome" />
              </article>

              <GroupEmail>
                <label htmlFor="idEmail">Email</label>
                <Input
                  name="email"
                  id="idEmail"
                  type="email"
                  placeholder="Seu email"
                />
              </GroupEmail>

              <hr />

              <Password>
                <div>
                  {' '}
                  <label htmlFor="idEmail">Sua senha atual</label>
                  <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Sua senha atual"
                  />
                </div>
                <div>
                  <label htmlFor="idEmail">Nova senha</label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                  />
                </div>
                <div>
                  <label htmlFor="idEmail">Confirma senha</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirma senha"
                  />
                </div>
              </Password>
            </Scope>
          </Content>
        </Form>
      </Container>
    </Background>
  );
}
