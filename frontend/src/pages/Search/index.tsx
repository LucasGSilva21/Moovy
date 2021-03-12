import React, { useState ,useEffect } from 'react';
import { api } from '../../services/api';

import { 
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Icon
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

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
  }
});

function Search() {
  const classes = useStyles();
  const { REACT_APP_KEY } = process.env;

  const search = 'rocky';

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
		api.get(`/?s=${search}&apikey=${REACT_APP_KEY}&plot=full`).then(response => {
      console.log(response.data.Search)
			setMovies(response.data.Search);
		});
	}, []);

  return (
    <Grid container direction='column'>
      <Grid container justify='center'>
        <Grid xs={8}>
        <h2>Search</h2>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid container spacing={2} lg={8} sm={10} xs={10}>
          {
            movies.map(movie => {
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
