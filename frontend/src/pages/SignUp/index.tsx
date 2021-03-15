import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { apiMoovy } from '../../services/api';

import { 
  Grid,
  TextField,
  Button
} from '@material-ui/core';

import { useStyles } from '../../styles/form';

function SignIn() {
    const classes = useStyles();
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function validate(){
        if(name === ''){
            setError('Name is required');
            return;
        }
        if(email === ''){
            setError('Email is required');
            return;
        }
        if(password === ''){
            setError('Password is required');
            return false;
        } 
        if(email.length < 5){
            setError('Invalid email');
            return false;
        }
        if(name.length < 3){
            setError('Invalid name');
            return false;
        }
        if(password.length < 6){
            setError('Password must be at least 6 characters');
            return false;
        }
        
        return true;
    }

    async function store(e: any) {
        e.preventDefault();

        if(!validate()) return;

        await apiMoovy.post('/users', { name, email, password }).then(response => {
            history.push('');
        }).catch(() => {
            setError('Error!');
        });;
    }

    return (
        <Grid
            className={classes.container}
            direction="column"
            justify="center"
            alignItems="center"
        >
            <form onSubmit={store} className={classes.form}>
                <h1 className={classes.formTitle}>Moovy</h1>
                <div className={classes.formBody}>
                    { error && <span className={classes.error}>{error}</span>}
                    <TextField 
                        id="standard-basic" 
                        label="Name *" 
                        type="text"
                        variant="outlined"
                        onChange={e => setName(e.target.value)}
                        className={classes.field}
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Email *" 
                        type="email"
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                        className={classes.field}
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Password *" 
                        type="password"
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)}
                        className={classes.field}
                    />

                    <Button 
                        variant="contained"
                        type="submit"
                        className={classes.botton}
                    >
                        Sign Up
                    </Button> 
                    <Link to="/" className={classes.link}>Sign In</Link>
                </div>
            </form>
        </Grid>
    )
}

export default SignIn;
