import React from 'react';
import AsyncSelect from 'react-select/async';

import PropTypes from 'prop-types';

import api from '~/_services/api';

import { Container } from '../styles';

export default function Select({ apiPath, onChange, value, limit, page }) {
 
  const mapResponseToValuesAndLabels = (data) => ({
    value: data.id,
    label: data.person.name,
  });

  function handleElments(res) {
    if (apiPath === 'recipients') {
      const r = res.data.recipients.map(mapResponseToValuesAndLabels);
      return r;
    }

    if (apiPath === 'deliverymans') {
      const d = res.data.deliverymans.map(mapResponseToValuesAndLabels);
      return d;
    }
   
    return res.data;
  }

  async function callApi(valueItem) {
    const data = await api
      .get(`${apiPath}`, {
        params: {
          q: `${valueItem}`,
          limit,
          page,
        },
      })
      .then((res) => {
        return handleElments(res);
      })
      .then((final) =>
        final.filter((i) =>
          i.label.toLowerCase().includes(valueItem.toLowerCase())
        )
      );

    return data;
  }

  return (
    <Container>
      <AsyncSelect
        cacheOptions
        loadOptions={callApi}
        value={value}
        defaultOptions
        onChange={onChange}
        noOptionsMessage={() => 'Nenhum item selecionado'}
      />
    </Container>
  );
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  apiPath: PropTypes.string.isRequired,
  value: PropTypes.shape().isRequired,
};
