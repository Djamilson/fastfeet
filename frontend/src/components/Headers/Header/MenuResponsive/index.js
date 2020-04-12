import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { colors } from '~/styles';

import { Container, NavigationLink, OrderLI, Badge } from './styles';

export default function MenuResponsive({
  isActive,
  handleToggleMenu,
  handleSignOut,
}) {
  const menuItems = useSelector((state) => state.menu);

  return (
    <Container visible={isActive} className={isActive ? 'active' : ''}>
      <ul>
        {menuItems.map((menu) => (
          <OrderLI key={menu.path}>
            <NavigationLink
              to={menu.path}
              aria-label={menu.label}
              onClick={handleToggleMenu}
            >
              {menu.label}
            </NavigationLink>
          </OrderLI>
        ))}

        <OrderLI>
          <NavigationLink
            to="/profile"
            aria-label="Meu perfil"
            onClick={() => handleToggleMenu()}
          >
            MEU PERFIL
          </NavigationLink>
        </OrderLI>
        <OrderLI>
          <Badge onClick={handleSignOut} title="Sair">
            <FaSignOutAlt color={colors.third} size={28} />
          </Badge>
        </OrderLI>
      </ul>
    </Container>
  );
}

MenuResponsive.propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleToggleMenu: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};
