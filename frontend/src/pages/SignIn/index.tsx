import React, { useState, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { apiMoovy } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

import { 
  Grid,
  TextField,
  Button
} from '@material-ui/core';

import { useStyles } from '../../styles/form';

function SignIn() {
    const classes = useStyles();
    const history = useHistory();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function validate(){
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
        if(password.length < 6){
            setError('Password must be at least 6 characters');
            return false;
        }
        
        return true;
    }

    async function loginService(e: any) {
        e.preventDefault();

        if(!validate()) return;

        await apiMoovy.post('/auth/login', { email, password }).then(response => {
            const { access_token, user } = response.data;
            login(access_token, user.id);
            history.push('library');
        }).catch((err) => {
            console.log(err.message)
            setError('Error! Check your credentials');
        });
    }

    return (
        <Grid
            className={classes.container}
            direction="column"
            justify="center"
            alignItems="center"
        >
            <form onSubmit={loginService} className={classes.form}>
                <h1 className={classes.formTitle}>Moovy</h1>
                <div className={classes.formBody}>
                    { error && <span className={classes.error}>{error}</span>}
                    <TextField 
                        id="standard-basic" 
                        label="Email *" 
                        type="email"
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                        className={classes.field}
                        autoComplete='off'
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Password *" 
                        type="password"
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)}
                        className={classes.field}
                        autoComplete='off'
                    />
                    <Button 
                        variant="contained" 
                        type="submit"
                        className={classes.botton}
                    >
                        Sign In
                    </Button>   
                    <Link to="/signup" className={classes.link}>Sign Up</Link>
                </div> 
            </form>
        </Grid>
    )
}

export default SignIn;
