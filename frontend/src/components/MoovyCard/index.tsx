import { 
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Icon,
  } from '@material-ui/core';

import { useStyles } from '../../styles/card';

import star from '../../images/star.svg';

function MoovyCard({ children, ...props }: any) {
    const classes = useStyles();

    return (
        <Grid key={props.imdbID} item>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <CardMedia 
                component="img"
                src={props.Poster}
                title={props.Title}
                className={classes.cardImage}
              />
              <Grid className={classes.cardMain}>
                <h3 className={classes.cardTitle}>{props.Title}</h3>
                <Icon>
                    <img src={star} height={25} width={25} alt="star icon"/>
                </Icon>
                <span>{props.imdbRating}</span>
              </Grid>
              <CardActions className={classes.containerBotton}>
                { children }
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
    )
}

export default MoovyCard;
