import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { apiOmdb, apiMoovy } from '../../services/api';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Navbar from '../../components/Navbar';
import MoovyCard from '../../components/MoovyCard';

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

interface UserMovies {
  _id: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
  userId: string;
  imdbID: string;
  poster: string;
  title: string;
  imdbRating: string;
}

function Library() {
  const classes = useStyles();

  const { userId } = useContext(AuthContext);
  const { REACT_APP_KEY } = process.env;

  const [userMovies, setUserMovies] = useState<UserMovies[]>([]);
  const [isLoading , setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setIsLoading(true);
		apiMoovy.get(`/user-movies/user/${userId}`).then(response => {
      const { data } = response;
      
      if(data && data.length !== 0){
        setUserMovies(data);
        setNotFound(false);
        setIsLoading(false);
      }else{
        setNotFound(true);
        setIsLoading(false);
      }
		});
	}, []);

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
        apiMoovy.delete(`/user-movies/${id}`).then(() => {
          setIsLoading(true);
          apiMoovy.get(`/user-movies/user/${userId}`).then(response => {
            const { data } = response;
            
            if(data && data.length !== 0){
              setUserMovies(data);
              setNotFound(false);
              setIsLoading(false);
            }else{
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
              userMovies && userMovies.map(movie => {
                return (
                  <MoovyCard 
                    imdbID={movie.imdbID}
                    Title={movie.title}
                    imdbRating={movie.imdbRating}
                    Poster={movie.poster}
                  >
                    <Button
                      variant="contained"
                      className={classes.buttonRed}
                      onClick={() => removeMovie(movie._id, movie.title)}
                    >
                      <Icon>
                        <img src={book} height={25} width={25} alt="book icon"/>
                      </Icon>
                      Remove
                    </Button>
                  </MoovyCard>
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
