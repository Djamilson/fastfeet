import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MdPhoto } from 'react-icons/md';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Scope } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '~/_services/api';
import Select from '~/components/Form/AsyncSelect';
import Input from '~/components/Form/Input';
import InputMask from '~/components/Form/InputMask';
import Selectc from '~/components/Form/Select';
import { Content } from '~/components/Form/styles';
import HeaderButton from '~/components/Headers/HeaderButtonForm';
import Background from '~/pages/_layouts/layout_form';
import { colors } from '~/styles';

import {
  Box,
  Container,
  ImagemDiv,
  Avatar,
  ContaineIcon,
  GroupEmail,
  Phone,
  GroupInput,
  Input01,
  NumberComplement,
  GroupSelect,
  GroupSelects,
  AddressState,
  AddressCity,
  AddressCEP,
  District,
} from './styles';

const schema = Yup.object().shape({
  person: Yup.object({
    name: Yup.string().required('O nome é obrigatório!'),
    email: Yup.string()
      .email('Insira um e-mail válido!')
      .required('O e-mail é obrigatório!'),
    phone: Yup.object({
      prefix: Yup.string().required('O prefixo é obrigatório!'),
      number: Yup.string().required('O número é obrigatório!'),
    }),
  }).required(),

  address: Yup.object()
    .shape({
      street: Yup.string().required('A rua é obrigatória!'),
      number: Yup.string().required('O número é obrigatório!'),
      complement: Yup.string(),
      zip_code: Yup.string().required('A rua é obrigatória!'),
      district: Yup.string().required('Bairro é obrigatório!'),
      city: Yup.object({
        city: Yup.number().required('A cidade é obrigatória!'),
        state: Yup.number(),
      }),
    })
    .required(),
});

export default function DeliverymanForm() {
  const { deliverymanId } = useParams();
  const history = useHistory();

  const [color, setColor] = useState(`${colors.serven}`);

  const formType = deliverymanId
    ? 'Edição de entregadores'
    : 'Cadastro de entregadores';

  const formRef = useRef(null);
  const inputRef = useRef();

  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [image, setImage] = useState({ preview: '', file: '', id_file: '' });
  const [deliverymanSelect, setDeliverymanSelect] = useState({});

  const INITIAL_STATE = {
    value: 0,
    label: 'Selecione o estado',
  };

  const INITIAL_CITY = {
    value: 0,
    label: 'Selecione a cidade',
  };

  const [stateSelect, setStateSelect] = useState(INITIAL_STATE);
  const [citySelect, setCitySelect] = useState(INITIAL_CITY);

  const [limit] = useState(2);
  const [page] = useState(1);

  async function loadCities(stateId) {
    if (Object.getPrototypeOf(stateId)) {
      const response = await api.get(`cities/${stateId}/select`, {
        params: {
          q: ``,
          limit,
          page,
        },
      });

      setCities(response.data.itens);
    }
  }

  useEffect(() => {
    async function searchDeliveryman() {
      if (typeof deliverymanId !== typeof undefined) {
        try {
          setLoading(true);
          const res = await api.get(`deliverymans/${deliverymanId}`);

          const { city } = res.data.address;
          setDeliverymanSelect(res.data);
          setStateSelect({ value: city.state.id, label: city.state.name });

          // carrega as cities
          await loadCities(city.state.id);
          setCitySelect({ value: city.id, label: city.name });

          setImage({
            preview: res.data.person.avatar.url,
            file: '',
            id_file: '',
          });

          formRef.current.setData(res.data);

          // set color

          setColor(`${colors.third}`);

          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      }
    }
    searchDeliveryman();
  }, [deliverymanId]);

  async function loadStates() {
    setLoading(true);
    const response = await api.get(`states/select`);
    setStates(response.data);
    setLoading(false);
  }

  useMemo(() => loadStates(), []);

  async function handleChange(e) {
    setLoading(true);

    if (e.target.files[0].size > 0) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
        id_file:
          typeof deliverymanSelect.id !== typeof undefined
            ? deliverymanSelect.person.avatar.id
            : '',
      });
    }
    inputRef.current.value = '';
    setLoading(false);
  }

  function clearForm() {
    formRef.current.reset();
    setDeliverymanSelect({});
    setImage({ preview: '', file: '', id_file: '' });
    setCitySelect(INITIAL_CITY);
    setStateSelect(INITIAL_STATE);
    setCities([]);
  }

  async function handleSubmit(data) {
    try {
      setLoading(true);

      // Remove all previous errors
      formRef.current.setErrors({});
      const { person, address } = data;

      if (!image.preview) {
        toast.error('Atenção, tem que adicionar uma imagem!');
        return;
      }

      const dataNew = new FormData();
      dataNew.append('file', image.file);
      dataNew.append('name', person.name);
      dataNew.append('email', person.email);
      dataNew.append('prefix', person.phone.prefix);
      dataNew.append('numberPhone', person.phone.number);
      // address
      dataNew.append('street', address.street);
      dataNew.append('number', address.number);
      dataNew.append('complement', address.complement);
      dataNew.append('zip_code', address.zip_code);
      dataNew.append('district', address.district);

      dataNew.append('city', citySelect.value);
      dataNew.append('state', stateSelect.value);

      if (typeof deliverymanSelect.id !== typeof undefined) {
        const { id } = deliverymanSelect;

        dataNew.append('id', id);
        dataNew.append('id_file', deliverymanSelect.person.avatar.id);

        await api.put(`/deliverymans/${id}`, dataNew);

        clearForm();

        toast.success('Entregador editado com sucesso!');

        history.push('/deliverymans');
      } else {
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/deliverymans', dataNew);

        clearForm();
        toast.success('Usuário cadastrado com sucesso!');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);

      const str = err.toString();
      const final = str.replace(/\D/g, '');

      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
        return;
      }

      if (final === '400') {
        toast.error('Campos incorretos, tente novamente!');
        return;
      }

      if (final === '401') {
        toast.error('Já existe um usuário cadastrador com esse email!');
      }

      if (final === '402') {
        toast.error('Já existe um usuário cadastrador com esse fone!');
      }

      if (final === '403') {
        toast.error('Esse fone não existe, tente colocar outro número!');
        return;
      }

      if (final === '404') {
        toast.error(
          'Esse fone já está cadastrado para outro usuário, tente colocar outro número!'
        );
        return;
      }

      toast.error('Atenção! tivemos algum erro no servidor.');
    }
  }

  async function handleChangeCity(e) {
    setCitySelect(e);
  }

  async function onChangeSelectState(e) {
    setStateSelect(e);
    setCitySelect(INITIAL_CITY);
    loadCities(e.value);
  }

  return (
    <Box>
      <Background>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <HeaderButton
              title={formType}
              hadleAction={handleSubmit}
              titleAction="Salvar"
              goback="deliverymans"
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
                        alt=""
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
                  <Input
                    type="text"
                    id="idName"
                    name="name"
                    placeholder="Nome"
                  />
                </article>

                <GroupEmail>
                  <article>
                    <label htmlFor="idEmail">Email</label>
                    <Input
                      name="email"
                      id="idEmail"
                      type="email"
                      placeholder="Seu email"
                    />
                  </article>

                  <Scope path="phone">
                    <Phone>
                      <div>
                        <label htmlFor="idPrefix">Prefixo</label>
                        <InputMask
                          htmlFor="idPrefix"
                          mask="(99)"
                          name="prefix"
                          placeholder="00"
                        />
                      </div>
                      <div>
                        <label htmlFor="idPhone">Fone</label>
                        <InputMask
                          id="idPhone"
                          mask="9 9999-9999"
                          name="number"
                          placeholder="0 0000-0000"
                        />
                      </div>
                    </Phone>
                  </Scope>
                </GroupEmail>
              </Scope>
              <Scope path="address">
                <GroupInput>
                  <Input01>
                    <label htmlFor="idStreet">Rua</label>
                    <Input
                      name="street"
                      id="idStreet"
                      placeholder="Rua/Quadra"
                    />
                  </Input01>

                  <NumberComplement>
                    <div>
                      <label htmlFor="idNumber">Número</label>
                      <Input name="number" id="idNumber" placeholder="Número" />
                    </div>
                    <div>
                      <label htmlFor="idComplement">Complemento</label>
                      <Input
                        id="idComplement"
                        name="complement"
                        placeholder="Complemento"
                      />
                    </div>
                  </NumberComplement>
                </GroupInput>

                <GroupSelects>
                  <Scope path="city">
                    <GroupSelect>
                      <Scope path="state">
                        {states.length > 0 && (
                          <>
                            <label htmlFor="idState">Estado</label>
                            <AddressState showCity={cities.length > 0}>
                              <React.StrictMode>
                                <Select
                                  id="idState"
                                  limit={limit}
                                  page={page}
                                  selectData={INITIAL_STATE}
                                  apiPath="states/select"
                                  value={stateSelect}
                                  onChange={(data) => onChangeSelectState(data)}
                                />
                              </React.StrictMode>
                            </AddressState>
                          </>
                        )}
                      </Scope>

                      {cities.length > 0 && (
                        <AddressCity>
                          <label htmlFor="idCity">Cidade</label>
                          <Selectc
                            name="city"
                            value={citySelect}
                            onChange={handleChangeCity}
                            options={cities}
                            isLoading={cities.length === 0}
                            placeholder="Selecione a cidade..."
                            noOptionsMessage={() =>
                              'Nenhuma cidade selecionada'
                            }
                          />
                        </AddressCity>
                      )}
                    </GroupSelect>
                  </Scope>
                  <AddressCEP>
                    <label htmlFor="cep">CEP</label>
                    <InputMask
                      mask="99999-999"
                      name="zip_code"
                      placeholder="09960-580"
                    />
                  </AddressCEP>
                </GroupSelects>

                <District>
                  <label htmlFor="idDistrict">Bairro</label>
                  <Input id="idDistrict" name="district" placeholder="Bairro" />
                </District>
              </Scope>
            </Content>
          </Form>
        </Container>
      </Background>
    </Box>
  );
}
