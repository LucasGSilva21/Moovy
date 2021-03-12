import React from 'react';
import { Link } from 'react-router-dom';

import { Nav, Logo, List, Item } from './styles';

function Navbar() {
  return (
    <Nav>
        <Logo>Moovy</Logo>
        <List>
            <Link to="/search"><Item>Search</Item></Link>
            <Link to="/"><Item>My Library</Item></Link>
        </List>
    </Nav>
  );
}

export default Navbar;
