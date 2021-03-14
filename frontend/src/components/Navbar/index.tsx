import React from 'react';
import { Link } from 'react-router-dom';

import { 
  Grid
} from '@material-ui/core';

import { useStyles } from '../../styles/navbar';

function Navbar() {
  const classes = useStyles();

  return (
    <nav>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.listContainer}
        >
          <Grid 
            container 
            justify="center"
            alignItems="center"
            className={classes.logo}
          >
            <h1>Moovy</h1>
          </Grid>
          <ul className={classes.list}>
            <li><Link to="/search" className={classes.item}>Search</Link></li>
            <li><Link to="/library" className={classes.item}>My Library</Link></li>
          </ul>
        </Grid>
    </nav>
  );
}

export default Navbar;
