import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import { changeItem } from '~/store/modules/menu/actions';

import { NavigationLink, Navigation } from './styled';

export default function Navigationn({ handleToggleMenu }) {
  const menuItems = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const location = useLocation();

  /*
  function hendleIsActive(link) {
    return location.pathname.indexOf(link) ? '' : `active`;
  }
   className={hendleIsActive(menu.path)} */

  function hendleIsActivea(link) {
    return !location.pathname.indexOf(link);
  }

  function onClick(label) {
    dispatch(changeItem(label));
    handleToggleMenu();
  }

  return (
    <Navigation>
      {menuItems.map((menu) => (
        <NavigationLink
          key={menu.path}
          to={menu.path}
          onClick={() => onClick(menu.label)}
          selected={hendleIsActivea(menu.path)}
        >
          {menu.label}
        </NavigationLink>
      ))}
    </Navigation>
  );
}

Navigationn.propTypes = {
  handleToggleMenu: PropTypes.func.isRequired,
};
