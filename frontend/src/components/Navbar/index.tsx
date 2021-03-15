import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import { Grid, Icon } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';


import { useStyles } from '../../styles/navbar';

function Navbar() {
  const classes = useStyles();

  const { logout } = useContext(AuthContext);

  return (
    <nav>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.nav}
        >
          <Grid 
            container 
            justify="center"
            alignItems="center"
            className={classes.logo}
          >
            <h1>Moovy</h1>
          </Grid>
          <Grid className={classes.listContainer}>
            <ul className={classes.list}>
              <li><Link to="/search" className={classes.item}>Search</Link></li>
              <li><Link to="/library" className={classes.item}>My Library</Link></li>
            </ul>
            <div className={classes.logout}>
              <a onClick={logout} className={classes.link}>
                <span>Logout</span>
                <Icon component={ExitToApp}></Icon>
              </a>
            </div>
          </Grid>
        </Grid>
    </nav>
  );
}

export default Navbar;
