import React, { useState, useEffect, useContext } from 'react';
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
  CircularProgress
} from '@material-ui/core';

import { useStyles } from '../../styles/card';
import book from '../../images/book.svg';
import star from '../../images/star.svg';
import { createTrue } from 'typescript';

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
  const [isLoading , setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setIsLoading(true);
		apiMoovy.get(`/movies/user/${userId}`).then(response => {
      const { data } = response;
      
      if(data && data.length !== 0){
        setUserMovies(data);
        setNotFound(false);
        setIsLoading(false);
      }else{
        setMovies([]);
        setNotFound(true);
        setIsLoading(false);
      }
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
    setIsLoading(true);
		Promise.all(userMovies.map(async userMovie => {
      return await getDetail(userMovie._id ,userMovie.movieId)
    })).then(data => {
      if(data){
        setMovies(data);
        setNotFound(false);
        setIsLoading(false);
      }else{
        setMovies([]);
        setNotFound(true);
        setIsLoading(false);
      }
    })
	}, [userMovies]);

  function removeMovie(id: string, title: string) {
    MySwal.fire({
      title: 'Remove from your library?',
      text: `Are you sure you want to remove “${title}” from your library?`,
      showCancelButton: true,
      confirmButtonColor: '#FE6D8E',
      cancelButtonColor: '#A1A1A1',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        apiMoovy.delete(`/movies/${id}`).then(() => {
          setIsLoading(true);
          apiMoovy.get(`/movies/user/${userId}`).then(response => {
            const { data } = response;
            
            if(data && data.length !== 0){
              setUserMovies(data);
              setNotFound(false);
              setIsLoading(false);
            }else{
              setMovies([]);
              setNotFound(true);
              setIsLoading(false);
            }
          });
          
          MySwal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        });
      }
    })
  }

  return (
    <>
      <Navbar />
      <Grid container direction='column'>
        <Grid className={classes.titleContainer}>
          <h2 className={classes.title}>My Library</h2>
        </Grid>
        <Grid justify='center' className={classes.listContainer}>
          <Grid container spacing={2} className={classes.list}>
            { isLoading && 
              <Grid className={classes.loading}>
                <h3 className={classes.loadingTitle}>Loading...</h3>
                <CircularProgress size={100} />
              </Grid>
            }
            { notFound && 
              <Grid className={classes.notFound}>
                <span>It looks like there are no movies in your library! Search for a movie you have watched and add it here!</span>
              </Grid>
            }
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
                              <img src={star} height={25} width={25} alt="star icon"/>
                          </Icon>
                          <span>{movie.imdbRating}</span>
                        </Grid>
                        <CardActions className={classes.containerBotton}>
                          <Button
                            variant="contained"
                            className={classes.buttonRed}
                            onClick={() => removeMovie(movie.id, movie.Title)}
                          >
                            <Icon>
                              <img src={book} height={25} width={25} alt="book icon"/>
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
