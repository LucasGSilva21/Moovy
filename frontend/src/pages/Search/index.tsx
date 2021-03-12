import React, { useState } from 'react';
import { api } from '../../services/api';

import { 
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Icon,
  IconButton
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import book from '../../images/book.svg';

interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const useStyles = makeStyles({
  botton: {
    backgroundColor: '#0ACF83'
  },
  containerBotton: {
    justifyContent: 'center'
  },
  containerInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    border: 0,
    outline: 'none',
    borderRadius: 15,
  }
});

function Search() {
  const classes = useStyles();
  const { REACT_APP_KEY } = process.env;

  const [search, setSearch] = useState('');

  const [movies, setMovies] = useState<Movie[]>([]);

  function getMovies() {
    api.get(`/?s=${search}&apikey=${REACT_APP_KEY}&plot=full`).then(response => {
      setMovies(response.data.Search);
    });
  }

  return (
    <Grid container direction='column'>
      <Grid container justify='center'>
        <Grid lg={8} sm={10} xs={10}>
          <h2>Search</h2>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid container lg={8} sm={10} xs={10} className={classes.containerInput} justify='space-between'>
          <input value={search} onChange={e => setSearch(e.target.value)} type="text" className={classes.input}/>
          <IconButton type="submit" onClick={getMovies}>
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid container spacing={2} lg={8} sm={10} xs={10}>
          {
            movies && movies.map(movie => {
              return (
                <Grid key={movie.imdbID} item lg={3} sm={6} xs={10} >
                  <Card>
                    <CardContent>
                      <CardMedia 
                        component="img"
                        src={movie.Poster}
                        title={movie.Title}
                        style={{
                          height: 420,
                        }}
                      />
                      <h3>{movie.Title}</h3>
                      <CardActions className={classes.containerBotton}>
                        <Button
                          variant="contained"
                          className={classes.botton}
                        >
                        <Icon>
                            <img src={book} height={25} width={25}/>
                        </Icon>
                          Add to My Library
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Search;
