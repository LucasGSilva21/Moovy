import React from 'react';

import { Nav, Logo, List, Item } from './styles';

function Navbar() {
  return (
    <Nav>
        <Logo>Moovy</Logo>
        <List>
            <Item>Search</Item>
            <Item>My Library</Item>
        </List>
    </Nav>
  );
}

export default Navbar;
