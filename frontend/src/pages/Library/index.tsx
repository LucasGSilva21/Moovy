import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { apiOmdb, apiMoovy } from '../../services/api';

import Navbar from '../../components/Navbar';

import { 
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Icon
} from '@material-ui/core';

import { useStyles } from '../../styles/card';
import book from '../../images/book.svg';
import star from '../../images/star.svg';

interface UserMovies {
  _id: string;
  userId: string;
  movieId: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
}

interface MovieDetail {
  id: string;
  imdbID: string;
  Poster: string;
  Title: string;
  imdbRating: string;
}

function Library() {
  const classes = useStyles();

  const { userId } = useContext(AuthContext);
  const { REACT_APP_KEY } = process.env;

  const [userMovies, setUserMovies] = useState<UserMovies[]>([]);
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
		apiMoovy.get(`/movies/user/${userId}`).then(response => {
      const { data } = response;
      setUserMovies(data);
      if(data.length === 0) setEmpty(false);
		});
	}, []);

  async function getDetail(id: string, movieId: string): Promise<MovieDetail> {
    const result = await apiOmdb.get(`/?i=${movieId}&apikey=${REACT_APP_KEY}`);

    const imdbID = result.data.imdbID;
    const Poster = result.data.Poster; 
    const Title = result.data.Title;
    const imdbRating = result.data.imdbRating;

    return { Poster, Title, id, imdbID, imdbRating }
  }

  useEffect(() => {
		Promise.all(userMovies.map(async userMovie => {
      return await getDetail(userMovie._id ,userMovie.movieId)
    })).then(result => setMovies(result))
	}, [userMovies]);

  function removeMovie(id: string) {
    apiMoovy.delete(`/movies/${id}`).then(response => {
      apiMoovy.get(`/movies/user/${userId}`).then(response => {
        setUserMovies(response.data);
      });
      alert('Deletado com sucesso!');
    });
  }

  return (
    <>
      <Navbar />
      <Grid container direction='column'>
        <Grid className={classes.titleContainer}>
          <h2 className={classes.title}>My Library</h2>
        </Grid>
        { !empty && 
          <p>It looks like there are no movies in your library! Search for a movie you have watched and add it here!</p> 
        }
        <Grid justify='center' className={classes.listContainer}>
          <Grid container spacing={2} className={classes.list}>
            {
              movies && movies.map(movie => {
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
                              <img src={star} height={25} width={25}/>
                          </Icon>
                          <span>{movie.imdbRating}</span>
                        </Grid>
                        <CardActions className={classes.containerBotton}>
                          <Button
                            variant="contained"
                            className={classes.buttonRed}
                            onClick={() => removeMovie(movie.id)}
                          >
                            <Icon>
                              <img src={book} height={25} width={25}/>
                            </Icon>
                            Remove
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
    </>
  );
}

export default Library;
