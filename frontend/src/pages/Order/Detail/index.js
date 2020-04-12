import React, { useMemo } from 'react';

import PropTypes from 'prop-types';

import { parseISO, format, subHours } from 'date-fns';

import {
  Front,
  Modall,
  ContentModal,
  ContaineLabel,
  Signature,
  Actions,
} from './styles';

export default function Detail({ onClose, show, data }) {
  function formatDateInit(createdAt) {
    return format(new Date(createdAt), "yyyy-MM-dd'T'HH:mm:ssxxx");
  }

  function formatDat(end_date) {
    return format(new Date(end_date), 'dd/MM/yyyy');
  }

  function subHoursTime(date_at) {
    if (typeof date_at !== typeof undefined) {
      const date = formatDateInit(date_at);

      const parsedDate = parseISO(date);
      const end_date = subHours(parsedDate, 3);
      const result = formatDat(end_date);
      return result;
    }
  }

  const dateFormattedStart = useMemo(() => {
    if (
      typeof data.start_date !== typeof undefined &&
      typeof data.start_date !== typeof null
    ) {
      return subHoursTime(data.start_date);
    }
    return 'Sem data de retirada';
  }, [data]);

  const dateFormattedEnd = useMemo(() => {
    if (
      typeof data.end_date !== typeof undefined &&
      typeof data.end_date !== typeof null
    ) {
      const resp = subHoursTime(data.end_date);
      return resp;
    }
    return 'Sem data de entrega';
  }, [data]);

  return (
    show && (
      <Front className="toggle-button" onClick={onClose}>
        <Modall id="modal">
          <h3>Informações da encomenda</h3>
          <section>
            <span>
              {data.recipient.address.street}, {data.recipient.address.number}
            </span>
            <span>
              {data.recipient.address.city.name}-
              {data.recipient.address.city.state.acronym}
            </span>
            <span>{data.recipient.address.zip_code}</span>
          </section>
          <ContentModal>
            <h3>Datas</h3>
            <div>
              <strong>Retirada</strong>
              <span>{dateFormattedStart}</span>
            </div>
            <div>
              <strong>Entrega</strong>
              <span>{dateFormattedEnd}</span>
            </div>
          </ContentModal>
          <Actions>
            <span>Assinatura do destinatário</span>
            <Signature>
              <label>
                {data.signature ? (
                  <img
                    src={
                      data.signature.url ||
                      'https://api.adorable.io/avatars/50/abott@adorable.png'
                    }
                    alt={data.signature.path}
                  />
                ) : (
                  <ContaineLabel>Ainda não foi feito a entrega</ContaineLabel>
                )}
              </label>
            </Signature>
          </Actions>
        </Modall>
      </Front>
    )
  );
}

Detail.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    deliveryman: PropTypes.shape({
      person: PropTypes.shape({
        name: PropTypes.string,
        phone: PropTypes.shape({
          prefix: PropTypes.string,
          number: PropTypes.string,
        }),
      }),
    }),
    recipient: PropTypes.shape({
      person: PropTypes.shape({
        name: PropTypes.string,
        phone: PropTypes.shape({
          prefix: PropTypes.string,
          number: PropTypes.string,
        }),
      }),
      address: PropTypes.shape({
        number: PropTypes.string,
        street: PropTypes.string,
        complement: PropTypes.string,
        zip_code: PropTypes.string,
        district: PropTypes.string,
        city: PropTypes.shape({
          name: PropTypes.string,
          state: PropTypes.shape({
            name: PropTypes.string,
            acronym: PropTypes.string,
          }),
        }),
      }),
    }),
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    signature: PropTypes.shape({
      url: PropTypes.string,
      path: PropTypes.string,
    }),
  }).isRequired,
};
