import React from 'react';
import { IoIosArrowBack, IoMdCheckmark } from 'react-icons/io';

import PropTypes from 'prop-types';

import { colors, fonts } from '~/styles';

import { Container, Title, ContentButton, GobackLink, Button } from './styles';

export default function HeaderButton({
  title,
  hadleAction,
  titleAction,
  goback,
  loading,
}) {
  const path = `/${goback}`;

  return (
    <Container>
      <Title>{title}</Title>
      <ContentButton>
        <GobackLink to={path}>
          <IoIosArrowBack
            color={colors.white_}
            style={{ margin: '0 5px' }}
            size={fonts.large}
          />
          Voltar
        </GobackLink>
        <Button onClick={() => hadleAction}>
          <IoMdCheckmark
            color={colors.white_}
            style={{ margin: '0 5px' }}
            size={fonts.large}
          />
          {loading ? 'Carregando ...' : `${titleAction}`}
        </Button>
      </ContentButton>
    </Container>
  );
}

HeaderButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  goback: PropTypes.string.isRequired,
  hadleAction: PropTypes.func.isRequired,
  titleAction: PropTypes.string.isRequired,
};
