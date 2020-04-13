import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { toast } from 'react-toastify';

import { darken } from 'polished';

import api from '~/_services/api';
import Header from '~/components/Headers/HeaderButtonList';
import Modal from '~/components/Modal';
import Table from '~/components/Table';
import Title from '~/components/Title';
import Background from '~/pages/_layouts/layout_list';
import Details from '~/pages/Order/Detail';
import RowItem from '~/pages/Order/Table/RowItem';
import TitleItem from '~/pages/Order/Table/TitleItem';
import { colors } from '~/styles';

import { SwitchDiv } from './styles';

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [limit] = useState(3);

  const [page] = useState(1);
  const [orderInfo, setOrderInfo] = useState({});
  const [search, setSearch] = useState('');

  const [nameButton, setNameButton] = useState('');
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [nameDelete, setNameDelete] = useState('');
  const [orderSelect, setOrderSelect] = useState({});

  const [filter, setFilter] = useState(false);

  async function loadPage(pageNumber = page) {
    try {
      setLoading(true);

      const res = await api.get(`orders`, {
        params: {
          q: `${search}`,
          limit,
          filter,
          page: `${pageNumber}`,
        },
      });
     
      setLoading(false);
      const { list: recip, orderInfo: info } = res.data;

      setOrders(recip);
      setOrderInfo(info);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function refreshOrder() {
    await loadPage(1);
  }

  function handleOnInputChange(event) {
    setSearch(event.target.value);
  }

  function showDelete() {
    if (orderSelect.canceled_at !== null) {
      toast.error('Essa entrega já foi cancelada!');
      return;
    }

    setNameDelete(orderSelect.recipient.person.name);
    setNameButton('Deletar');
    setShow(!show);
  }

  function handleDetail(item) {
    setOrderSelect(item);
    setShowDetail(!showDetail);
  }

  function close() {
    setShow(!show);
    setOrderSelect({});
  }

  function closeDetail() {
    setShowDetail(!showDetail);
    setOrderSelect({});
  }
  function getOrderSelect(item) {
    setOrderSelect(item);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/orders/${id}`);
      toast.success('Entrega deletada com sucesso!');
      refreshOrder();
    } catch (error) {
      const str = error.toString();
      const finall = str.replace(/\D/g, '');

      if (finall === '400') {
        toast.error(
          'Não foi possível encontrar essa entrega, tente novamente!'
        );
      }
    }
    close();
  }

  function handleChange(checkedChange) {
    setFilter(checkedChange);
  }

  useEffect(() => {
    refreshOrder();
  }, [search, filter]);

  return (
    <Background>
      <Title>Gerenciando encomendas</Title>
      <Header
        handleChange={handleOnInputChange}
        search={search}
        title="Gerenciando de encomendas"
        titleNext="CADASTRAR"
        next="orders/new"
        placeholder="Buscar por encomendas"
      />
      <SwitchDiv>
        <label htmlFor="normal-switch">
          <span>Filter cancelados</span>
          <Switch
            onChange={handleChange}
            checked={filter}
            className="react-switch"
            id="normal-switch"
            height={20}
            width={60}
            offColor={darken(0.03, colors.primary)}
            onColor="#FAB0B0"
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          />
        </label>
      </SwitchDiv>
      <Table pages={orderInfo.pages} loadPage={loadPage}>
        <TitleItem />
        <tbody>
          {orders.length < 1 && (
            <tr>
              <td colSpan={7}>
                Não temos nenhum registro cadastrado no momento!
              </td>
            </tr>
          )}
          {orders.map(
            (dat) =>
              !dat !== 'undefined' && (
                <RowItem
                  key={dat.id}
                  data={dat}
                  showDelete={() => showDelete(dat)}
                  detail={() => handleDetail(dat)}
                  getOrderSelect={() => getOrderSelect(dat)}
                />
              )
          )}
        </tbody>
      </Table>

      {show && (
        <Modal
          onClose={() => close()}
          show={show}
          nameDelete={nameDelete}
          onDelete={() => handleDelete(orderSelect.id)}
          nameButton={nameButton}
        >
          Tem certeza que deseja {nameButton} essa entrega?
        </Modal>
      )}
      {showDetail && (
        <Details
          onClose={() => closeDetail()}
          show={showDetail}
          data={orderSelect}
          onDelete={() => handleDetail(orderSelect)}
        />
      )}
    </Background>
  );
}
