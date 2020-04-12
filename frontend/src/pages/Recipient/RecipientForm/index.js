import React, { useState, useEffect, useRef, useMemo } from 'react';
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

import {
  Container,
  GroupEmail,
  Phone,
  GroupInput,
  Input01,
  NumberComplement,
  GroupSelects,
  GroupSelect,
  AddressState,
  AddressCity,
  AddressCEP,
  District,
} from './styles';

const schema = Yup.object().shape({
  person: Yup.object({
    id: Yup.number(),
    name: Yup.string().required('O nome é obrigatório!'),
    email: Yup.string()
      .email('Insira um e-mail válido!')
      .required('O e-mail é obrigatório!'),
    phone: Yup.object({
      id: Yup.number(),
      prefix: Yup.string().required('O prefixo é obrigatório!'),
      number: Yup.string().required('O número é obrigatório!'),
    }),
  }).required(),

  address: Yup.object()
    .shape({
      id: Yup.number(),
      street: Yup.string().required('A rua é obrigatória!'),
      number: Yup.string().required('O número é obrigatório!'),
      complement: Yup.string(),
      zip_code: Yup.string().required('A rua é obrigatória!'),
      district: Yup.string().required('Bairro é obrigatório!'),
      city: Yup.object({
        city: Yup.number().required('A cidade é obrigatória!'),
        state: Yup.number().required(),
      }),
    })
    .required(),
});

export default function RecipientForm() {
  const { recipientId } = useParams();
  const history = useHistory();

  const formType = recipientId
    ? 'Editação de destinatário'
    : 'Cadastro de destinatário';

  const formRef = useRef(null);

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

  const [loading, setLoading] = useState(false);

  const [recipientSelect, setRecipientSelect] = useState({});

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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

  /**
   * set variavel para editar
   */
  useEffect(() => {
    async function searchRecipient() {
      if (typeof recipientId !== typeof undefined) {
        try {
          setLoading(true);
          const res = await api.get(`recipients/${recipientId}`);

          const { city } = res.data.address;
          setRecipientSelect(res.data);
          setStateSelect({ value: city.state.id, label: city.state.name });

          // carrega as cities
          await loadCities(city.state.id);
          setCitySelect({ value: city.id, label: city.name });

          formRef.current.setData(res.data);

          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      }
    }
    searchRecipient();
  }, [recipientId]);

  async function loadStates() {
    setLoading(true);
    const response = await api.get(`states/select`);
    setStates(response.data);
    setLoading(false);
  }

  useMemo(() => loadStates(), []);

  function clearForm() {
    formRef.current.reset();
    setCitySelect(INITIAL_CITY);
    setStateSelect(INITIAL_STATE);
    setCities([]);
  }

  async function handleSubmit(data_) {
    try {
      setLoading(false);
      // Remove all previous errors
      formRef.current.setErrors({});

      if (typeof recipientSelect.id !== typeof undefined) {
        const { id } = recipientSelect;
        const { id: idPerson } = recipientSelect.person;
        const { id: idPhone } = recipientSelect.person.phone;
        const { id: idAddress } = recipientSelect.address;

        const data = {
          id: Number(recipientId),
          person: {
            id: Number(idPerson),
            ...data_.person,
            phone: {
              id: Number(idPhone),
              ...data_.person.phone,
            },
          },
          address: {
            id: Number(idAddress),
            ...data_.address,
            city: {
              city: Number(citySelect.value),
              state: Number(stateSelect.value),
            },
          },
        };

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`recipients/${id}`, {
          ...data,
        });

        toast.success('Cliente editado com sucesso!');
        history.push('/recipients');
      } else {
        const dataSave = {
          person: {
            ...data_.person,
            phone: {
              ...data_.person.phone,
            },
          },
          address: {
            ...data_.address,
            city: {
              city: Number(citySelect.value),
              state: Number(stateSelect.value),
            },
          },
        };

        await schema.validate(dataSave, {
          abortEarly: false,
        });

        await api.post('recipients', {
          ...dataSave,
        });

        toast.success('Cliente cadastrado com sucesso!');
      }

      clearForm();
    } catch (err) {
      setLoading(false);

      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }

      const str = err.toString();
      const final = str.replace(/\D/g, '');

      if (final === '400') {
        toast.error('Temos campos inválidos!');
      }

      if (final === '401') {
        toast.error('Já existe um usuário cadastrador com esse email!');
      }

      if (final === '402') {
        toast.error('Já existe um usuário cadastrador com esse fone!');
      }

      if (final === '403') {
        toast.error(
          'Tente fazer uma nova atualização na página, pois não foi encontrado o endereço!'
        );
      }
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

  useEffect(() => {}, [stateSelect]);
  return (
    <Background>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <HeaderButton
            title={formType}
            hadleAction={handleSubmit}
            titleAction="Salvar"
            goback="recipients"
            loading={loading}
          />

          <Content>
            <Scope path="person">
              <article>
                <label htmlFor="idName">Nome</label>
                <Input type="text" id="idName" name="name" placeholder="Nome" />
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
                  <Input name="street" id="idStreet" placeholder="Rua/Quadra" />
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
                          noOptionsMessage={() => 'Nenhuma cidade selecionada'}
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
  );
}
