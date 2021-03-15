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
  IconButton,
  CircularProgress
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import book from '../../images/book.svg';
import star from '../../images/star.svg';
import { useStyles } from '../../styles/card';

interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface MovieDetail {
  imdbID: string;
  Poster: string;
  Title: string;
  imdbRating: string;
}

function Search() {
  const classes = useStyles();
  const { REACT_APP_KEY } = process.env;
  const { userId } = useContext(AuthContext);

  const MySwal = withReactContent(Swal);

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [isLoading , setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  async function getDetail(movieId: string): Promise<MovieDetail> {
    const result = await apiOmdb.get(`/?i=${movieId}&apikey=${REACT_APP_KEY}`);

    const imdbID = result.data.imdbID;
    const Poster = result.data.Poster; 
    const Title = result.data.Title;
    const imdbRating = result.data.imdbRating;

    return { Poster, Title, imdbID, imdbRating }
  }

  function getMovies() {
    setIsLoading(true);
    apiOmdb.get(`/?s=${search}&apikey=${REACT_APP_KEY}`).then(response => {
      const data = response.data.Search;
      if(data) {
        Promise.all(data.map(async (element: Movie) => {
          return await getDetail(element.imdbID)
        })).then((result: any): void => {
          setMovies(result);
          setNotFound(false);
          setIsLoading(false);
        })
      } else {
        setMovies([]);
        setNotFound(true);
        setIsLoading(false);
      }
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
            { isLoading && 
              <Grid className={classes.loading}>
                <h3 className={classes.loadingTitle}>Loading...</h3>
                <CircularProgress size={100} />
              </Grid>
            }
            {
              notFound &&
              <Grid className={classes.notFound}>
                <span>We couldn´t find the movies you were lookin for :(</span>
              </Grid>
            }
            {
              movies.length > 0 && (movies.map(movie => {
                return (
                  <Grid key={movie.imdbID} item>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <CardMedia 
                          component="img"
                          src={movie.Poster}
                          title={movie.Title}
                          className={classes.cardImage}
                        />
                        <Grid className={classes.cardMain}>
                          <h3 className={classes.cardTitle}>{movie.Title}</h3>
                          <Icon>
                              <img src={star} height={25} width={25} alt="star icon"/>
                          </Icon>
                          <span>{movie.imdbRating}</span>
                        </Grid>
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
              }))
            }
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Search;
