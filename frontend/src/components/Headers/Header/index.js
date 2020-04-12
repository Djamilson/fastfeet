import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/fastfeet-logo.png';
import ButtonMenu from '~/components/ButtonMenu';
import MenuResponsive from '~/components/Headers/Header/MenuResponsive';
import Navigation from '~/components/Headers/Navigation';
import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Content,
  Profile,
  Badge,
  NavMenu,
  NavLink,
  ProlifeLink,
} from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);

  function handleToggleMenu() {
    setToggleMenu(!toggleMenu);
  }
  const profile = useSelector((state) => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <MenuResponsive
        handleSignOut={handleSignOut}
        isActive={toggleMenu}
        handleToggleMenu={handleToggleMenu}
      />
      <Content>
        <>
          <NavLink to="/orders">
            <img src={logo} alt="Fastfeet" />
          </NavLink>

          <ButtonMenu handleClick={handleToggleMenu} isActive={toggleMenu} />
          <NavMenu>
            <Navigation handleToggleMenu={handleToggleMenu} />
          </NavMenu>
        </>

        <Profile>
          <ProlifeLink to="/profile">
            <strong>{profile.person.name}</strong>
          </ProlifeLink>
          <Badge onClick={handleSignOut}>Sair do sistema</Badge>
        </Profile>
      </Content>
    </Container>
  );
}
