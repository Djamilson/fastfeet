import React from 'react';

import PropTypes from 'prop-types';

import {ScrollView, CardContent, Description, Date, Border} from './styles';

export default function Problem({data}) {
  return (
    <Border>
      <ScrollView>
        <CardContent>
          <Description>{data.problem.description}</Description>
          <Date>{data.created_at}</Date>
        </CardContent>
      </ScrollView>
    </Border>
  );
}

Problem.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.string,
    problem: PropTypes.shape({
      description: PropTypes.string.isRequired,
    }).isRequired,
    canceled_at: PropTypes.string,
  }).isRequired,
};
