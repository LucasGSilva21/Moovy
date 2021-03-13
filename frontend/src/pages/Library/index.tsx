import React, { useState, useEffect } from 'react';
import { apiOmdb, apiMoovy } from '../../services/api';

import { 
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@material-ui/core';

interface UserMovies {
  _id: string;
  userId: string;
  movieId: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
}

interface MovieDetail {
  imdbID: string;
  Poster: string;
  Title: string;
  imdbRating: string;
}

function Library() {
  const userId = '604bb33731383630ef00d469';
  const { REACT_APP_KEY } = process.env;

  const [userMovies, setUserMovies] = useState<UserMovies[]>([]);
  const [movies, setMovies] = useState<MovieDetail[]>([]);

  useEffect(() => {
		apiMoovy.get(`/movies/user/${userId}`).then(response => {
      setUserMovies(response.data);
		});
	}, []);

  async function getDetail(movieId: string): Promise<MovieDetail> {
    const result = await apiOmdb.get(`/?i=${movieId}&apikey=${REACT_APP_KEY}`);

    const imdbID = result.data.imdbID;
    const Poster = result.data.Poster; 
    const Title = result.data.Title;
    const imdbRating = result.data.imdbRating;

    return { imdbID, Poster, Title, imdbRating }
  }

  useEffect(() => {
		Promise.all(userMovies.map(async userMovie => {
      return await getDetail(userMovie.movieId)
    })).then(result => setMovies(result))
	}, [userMovies]);

  return (
    <Grid container direction='column'>
      <Grid container justify='center'>
        <Grid item lg={8} sm={10} xs={10}>
          <h2>My Library</h2>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid container spacing={2} lg={8} sm={10} xs={10}>
          {
            userMovies && movies.map(movie => {
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
                      <CardActions>
                        <Button
                          variant="contained"
                        >
                          Delete
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

export default Library;
