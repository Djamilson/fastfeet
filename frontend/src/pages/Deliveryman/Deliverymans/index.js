import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/_services/api';
import Header from '~/components/Headers/HeaderButtonList';
import Modal from '~/components/Modal';
import Table from '~/components/Table';
import Title from '~/components/Title';
import Background from '~/pages/_layouts/layout_list';
import RowItem from '~/pages/Deliveryman/Table/RowItem';
import TitleItem from '~/pages/Deliveryman/Table/TitleItem';

export default function Deliverymans() {
  const [loading, setLoading] = useState(false);
  const [deliverymans, setDeliverymans] = useState([]);
  const [limit] = useState(3);

  const [page] = useState(1);
  const [deliverymanInfo, setDeliverymanInfo] = useState({});
  const [search, setSearch] = useState('');

  const [nameButton, setNameButton] = useState('');
  const [show, setShow] = useState(false);
  const [nameDelete, setNameDelete] = useState('');
  const [deliverymanDelete, setDeliverymanDelete] = useState({});

  async function loadPage(pageNumber = page) {
    try {
      setLoading(true);

      const res = await api.get(`deliverymans`, {
        params: {
          q: `${search}`,
          limit,
          page: `${pageNumber}`,
        },
      });

      setLoading(false);
      const { deliverymans: deliverys, deliverymanInfo: info } = res.data;
      setDeliverymans(deliverys);
      setDeliverymanInfo(info);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function refreshDeliveryman() {
    await loadPage(1);
  }

  function handleOnInputChange(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    refreshDeliveryman();
  }, [search]);

  function showDelete(item) {
    setDeliverymanDelete(item);
    setNameDelete(item.person.name);
    setNameButton('Deletar');
    setShow(!show);
  }

  function closeDelete() {
    setDeliverymanDelete({});
    setShow(!show);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/deliverymans/${id}`);
      toast.success('Entregador deletado com sucesso!');
      refreshDeliveryman();
    } catch (error) {
      const str = error.toString();
      const finall = str.replace(/\D/g, '');

      if (finall === '400') {
        toast.error(
          'Não foi possível encontrar esse entregador, tente novamente!'
        );
      }
    }
    closeDelete();
  }

  return (
    <Background>
      <>
      <Title>Gerenciando entregadores</Title>
      <Header
        handleChange={handleOnInputChange}
        search={search}
        title="Gerenciando de entregadores"
        titleNext="CADASTRAR"
        next="deliverymans/new"
        placeholder="Buscar por entregadores"
      />

      <Table pages={deliverymanInfo.pages} loadPage={loadPage}>
        <TitleItem />
        <tbody>
          {deliverymans.length < 1 && (
            <tr>
              <td colSpan={7}>
                Não temos nenhum registro cadastrado no momento!
              </td>
            </tr>
          )}
          {deliverymans.map(
            (dat) =>
              !dat !== 'undefined' && (
                <RowItem
                  key={dat.id}
                  data={dat}
                  showDelete={() => showDelete(dat)}
                />
              )
          )}
        </tbody>
      </Table>
      {show && (
        <Modal
          onClose={() => closeDelete()}
          show={show}
          nameDelete={nameDelete}
          onDelete={() => handleDelete(deliverymanDelete.id)}
          nameButton={nameButton}
        >
          Tem certeza que deseja {nameButton} esse entragador?
        </Modal>
      )}
      </>
    </Background>
  );
}
