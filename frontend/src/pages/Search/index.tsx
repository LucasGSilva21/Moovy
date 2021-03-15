import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { apiOmdb, apiMoovy } from '../../services/api';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Navbar from '../../components/Navbar';

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

import SearchIcon from '@material-ui/icons/Search';
import book from '../../images/book.svg';
import { useStyles } from '../../styles/card';

interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

function Search() {
  const classes = useStyles();
  const { REACT_APP_KEY } = process.env;
  const { userId } = useContext(AuthContext);

  const MySwal = withReactContent(Swal);

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  function getMovies() {
    apiOmdb.get(`/?s=${search}&apikey=${REACT_APP_KEY}`).then(response => {
      setMovies(response.data.Search);
    });
  }

  function saveMovie(imdbID: string) {
    apiMoovy.post('/movies', {
      userId, movieId: imdbID
    }).then(() => {
      MySwal.fire({
        title: 'Success!',
        text: 'Saved in library.',
        icon: 'success',
        confirmButtonColor: '#0ACF83',
      })
    });
  }

  return (
    <>
      <Navbar />
      <Grid container direction='column'>
        <Grid container justify='center' className={classes.titleContainer}>
          <h2 className={classes.title}>Search</h2>
          <Grid container className={classes.inputContainer} justify='space-between'>
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" className={classes.input}/>
            <IconButton type="submit" onClick={getMovies}>
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid justify='center' className={classes.listContainer}>
          <Grid container spacing={2} className={classes.list}>
            {
              movies ? (movies.map(movie => {
                return (
                  <Grid key={movie.imdbID} item lg={3} sm={6} xs={10} >
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <CardMedia 
                          component="img"
                          src={movie.Poster}
                          title={movie.Title}
                          className={classes.cardImage}
                        />
                        <h3>{movie.Title}</h3>
                        <CardActions className={classes.containerBotton}>
                          <Button
                            variant="contained"
                            className={classes.buttonGreen}
                            onClick={() => saveMovie(movie.imdbID)}
                          >
                          <Icon>
                              <img src={book} height={25} width={25} alt="book icon"/>
                          </Icon>
                            Add to My Library
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })) : (
                <p>We couldn´t find the movies you were lookin for :(</p>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Search;
