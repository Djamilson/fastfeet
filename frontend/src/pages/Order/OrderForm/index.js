import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '~/_services/api';
import Select from '~/components/Form/AsyncSelect';
import Input from '~/components/Form/Input';
import { Content } from '~/components/Form/styles';
import TextArea from '~/components/Form/TextArea';
import HeaderButton from '~/components/Headers/HeaderButtonForm';
import Background from '~/pages/_layouts/layout_form';

import {
  Container,
  GoupInput,
  Recipient,
  Deliveryman,
  GroupSelect,
} from './styles';

const schema = Yup.object().shape({
  product: Yup.string().required('A descrição do produto é obrigatório!'),
  observation: Yup.string(),
  person: Yup.object()
    .shape({
      recipient_id: Yup.number().required('O destinatário é obrigatório!'),
      deliveryman_id: Yup.number().required('O entregador é obrigatório!'),
    })
    .required(),
});

export default function OrderForm() {
  const { orderId } = useParams();
  const history = useHistory();
  const formRef = useRef(null);

  const formType = orderId ? 'Edição de encomendas' : 'Cadastro de encomendas';

  const INITIAL_RECIPIENT = {
    value: 0,
    label: 'Selecione o destinatário',
  };

  const INITIAL_DELIVERYMAN = {
    value: 0,
    label: 'Selecione o entregador',
  };

  const [recipientSelect, setRecipientSelect] = useState(INITIAL_RECIPIENT);
  const [deliverymanSelect, setDeliverymanSelect] = useState(
    INITIAL_DELIVERYMAN
  );

  const [limit] = useState(2);
  const [page] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderSelect, setOrderSelect] = useState({});

  /**
   * set variavel para editar
   */

  useEffect(() => {
    async function searchOrder() {
      if (typeof orderId !== typeof undefined) {
        try {
          setLoading(true);
          const res = await api.get(`orders/${orderId}`);

          const { recipient, deliveryman } = res.data;
          setOrderSelect(res.data);

          setRecipientSelect({
            value: recipient.id,
            label: recipient.person.name,
          });
          setDeliverymanSelect({
            value: deliveryman.id,
            label: deliveryman.person.name,
          });

          formRef.current.setData(res.data);

          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      }
    }
    searchOrder();
  }, [orderId]);

  function clearForm() {
    formRef.current.reset();
  }

  async function handleSubmit(data) {
    try {
      setLoading(false);

      // Remove all previous errors
      formRef.current.setErrors({});

      const { value: deliverymanId } = deliverymanSelect;
      const { value: recipientId } = recipientSelect;

      const newData = {
        product: data.product,
        observation: data.observation,
        person: {
          recipient_id: Number(recipientId),
          deliveryman_id: Number(deliverymanId),
        },
      };

      if (typeof orderId !== typeof undefined) {
        const newDat = {
          id: Number(orderId),
          ...newData,
        };

        await schema.validate(newDat, {
          abortEarly: false,
        });

        await api.put(`orders/${orderId}`, {
          ...newDat,
        });

        toast.success('Encomenda editada com sucesso!');
        history.push('/orders');
      } else {
        await schema.validate(newData, {
          abortEarly: false,
        });

        await api.post('orders', {
          ...newData,
        });

        toast.success('Encomenda cadastrada com sucesso!');
        setRecipientSelect(INITIAL_RECIPIENT);
        setDeliverymanSelect(INITIAL_DELIVERYMAN);
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

  function onChangeSelectRecipient(data) {
    setRecipientSelect(data);
  }

  function onChangeSelectDeliveryman(data) {
    setDeliverymanSelect(data);
  }

  return (
    <Background>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <HeaderButton
            title={formType}
            hadleAction={handleSubmit}
            titleAction="Salvar"
            goback="orders"
            loading={loading}
          />

          <Content>
            <GroupSelect>
              <label htmlFor="idRecipient">Destinatário</label>
              <Recipient>
                <React.StrictMode>
                  <Select
                    id="idRecipient"
                    limit={limit}
                    page={page}
                    selectData={INITIAL_RECIPIENT}
                    apiPath="recipients"
                    value={recipientSelect}
                    onChange={(data) => onChangeSelectRecipient(data)}
                  />
                </React.StrictMode>
              </Recipient>

              <Deliveryman>
                <label htmlFor="idDeliveryman">Entregador</label>
                <Select
                  limit={limit}
                  page={page}
                  selectData={INITIAL_DELIVERYMAN}
                  apiPath="deliverymans"
                  value={deliverymanSelect}
                  onChange={(data) => onChangeSelectDeliveryman(data)}
                />
              </Deliveryman>
            </GroupSelect>

            <GoupInput>
              <label>Nome do produto</label>
              <Input name="product" placeholder="Nome do produto" />
            </GoupInput>

            <GoupInput>
              <label>Observação</label>
              <TextArea name="observation" placeholder="Observação" />
            </GoupInput>
          </Content>
        </Form>
      </Container>
    </Background>
  );
}
