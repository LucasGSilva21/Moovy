import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { apiMoovy } from '../../services/api';
import { login } from "../../services/auth";

import { 
  Grid,
  TextField,
  Button
} from '@material-ui/core';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const history = useHistory();

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
            login(response.data.access_token)
            history.push('library');
        }).catch(() => {
            setError('Error! Check your credentials');
        });
        
    }

    return (
        <Grid container>
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                { error && <span>{error}</span>}
                <form onSubmit={loginService}>
                    <Grid 
                        container
                        direction="column"
                    >
                        <TextField 
                            id="standard-basic" 
                            label="Email *" 
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField 
                            id="standard-basic" 
                            label="Password *" 
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Button variant="contained" color="primary" type="submit">
                            Login
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}

export default SignIn;
