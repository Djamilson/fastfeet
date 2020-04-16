import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/_services/api';
import Header from '~/components/Headers/HeaderButtonList';
import Modal from '~/components/Modal';
import Table from '~/components/Table';
import Title from '~/components/Title';
import Background from '~/pages/_layouts/layout_list';
import RowItem from '~/pages/Recipient/Table/RowItem';
import TitleItem from '~/pages/Recipient/Table/TitleItem';

export default function Recipients() {
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [limit] = useState(3);

  const [page] = useState(1);
  const [recipientInfo, setRecipientInfo] = useState({});
  const [search, setSearch] = useState('');

  const [nameButton, setNameButton] = useState('');
  const [show, setShow] = useState(false);
  const [nameDelete, setNameDelete] = useState('');
  const [recipientDelete, setRecipientDelete] = useState({});

  async function loadPage(pageNumber = page) {
    try {
      setLoading(true);

      const res = await api.get(`recipients`, {
        params: {
          q: `${search}`,
          limit,
          page: `${pageNumber}`,
        },
      });

      setLoading(false);
      const { recipients: recip, recipientInfo: info } = res.data;

      setRecipients(recip);
      setRecipientInfo(info);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function refreshRecipient() {
    await loadPage(1);
  }

  function handleOnInputChange(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    refreshRecipient();
  }, [search]);

  function showDelete(item) {
    setRecipientDelete(item);
    setNameDelete(item.person.name);
    setNameButton('Deletar');
    setShow(!show);
  }

  function closeDelete() {
    setRecipientDelete({});
    setShow(!show);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/recipients/${id}`);
      toast.success('Cliente deletado com sucesso!');
      refreshRecipient();
    } catch (error) {
      const str = error.toString();
      const finall = str.replace(/\D/g, '');

      if (finall === '400') {
        toast.error(
          'Não foi possível encontrar esse cliente, tente novamente!'
        );
      }
    }
    closeDelete();
  }

  return (
    <Background>
      <>
        <Title>Gerenciando destinatários</Title>
        <Header
          handleChange={handleOnInputChange}
          search={search}
          title="Gerenciando de encomendas"
          titleNext="CADASTRAR"
          next="recipients/new"
          placeholder="Buscar por destinatário"
        />

        <Table pages={recipientInfo.pages} loadPage={loadPage}>
          <TitleItem />
          <tbody>
            {recipients.length < 1 && (
              <tr>
                <td colSpan={5}>
                  Não temos nenhum registro cadastrado no momento!
                </td>
              </tr>
            )}
            {recipients.map(
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
            onDelete={() => handleDelete(recipientDelete.id)}
            nameButton={nameButton}
          >
            Tem certeza que deseja {nameButton} esse cliente?
          </Modal>
        )}
      </>
    </Background>
  );
}
