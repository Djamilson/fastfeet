import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/_services/api';
import Modal from '~/components/Modal';
import Table from '~/components/Table';
import Title from '~/components/Title';
import Background from '~/pages/_layouts/layout_list';
import RowItem from '~/pages/Problem/Table/RowItem';
import TitleItem from '~/pages/Problem/Table/TitleItem';

import Details from '../ Detail';

export default function Problems() {
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [limit] = useState(3);

  const [page] = useState(1);
  const [problemInfo, setProblemInfo] = useState({});

  const [nameButton, setNameButton] = useState('');
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [nameDelete, setNameDelete] = useState('');
  const [problemSelect, setProblemSelect] = useState({});

  async function loadPage(pageNumber = page) {
    try {
      setLoading(true);

      const res = await api.get(`problems`, {
        params: {
          q: ``,
          limit,
          page: `${pageNumber}`,
        },
      });

      setLoading(false);
      const { list: recip, problemInfo: info } = res.data;
      setProblems(recip);
      setProblemInfo(info);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function refreshOrder() {
    await loadPage(1, true);
  }

  useEffect(() => {
    loadPage();
  }, []);

  function showDelete() {
    if (problemSelect.order.canceled_at !== null) {
      toast.error('Essa entrega já foi cancelada!');
      return;
    }

    setNameDelete(problemSelect.order.product);
    setNameButton('Cancelar');
    setShow(!show);
  }

  function handleDetail(item) {
    setProblemSelect(item);
    setShowDetail(!showDetail);
  }

  function close() {
    setShow(!show);
    setProblemSelect({});
  }

  function closeDetail() {
    setShowDetail(!showDetail);
    setProblemSelect({});
  }
  function getProblemSelect(item) {
    setProblemSelect(item);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/problem/${id}/cancel-delivery`);
      toast.success('Entrega cancelada com sucesso!');
      refreshOrder();
    } catch (error) {
      const str = error.toString();
      const finall = str.replace(/\D/g, '');

      if (finall === '401') {
        toast.error(
          'Não foi possível encontrar essa entrega, tente novamente!'
        );
      }
    }
    close();
  }

  return (
    <Background>
      <>
      <Title>Gerenciando encomendas</Title>

      <Table pages={problemInfo.pages} loadPage={loadPage}>
        <TitleItem />
        <tbody>
          {problems.length < 1 && (
            <tr>
              <td colSpan={7}>
                Não temos nenhum registro cadastrado no momento!
              </td>
            </tr>
          )}
          {problems.map(
            (dat) =>
              !dat !== 'undefined' && (
                <RowItem
                  key={dat.id}
                  data={dat}
                  showDelete={() => showDelete(dat)}
                  detail={() => handleDetail(dat)}
                  getProblemSelect={() => getProblemSelect(dat)}
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
          onDelete={() => handleDelete(problemSelect.order_id)}
          nameButton={nameButton}
        >
          Tem certeza que deseja {nameButton} essa entrega?
        </Modal>
      )}
      {showDetail && (
        <Details
          onClose={() => closeDetail()}
          show={showDetail}
          data={problemSelect.description}
          onDelete={() => handleDetail(problemSelect)}
        />
      )}
      </>
    </Background>
  );
}
