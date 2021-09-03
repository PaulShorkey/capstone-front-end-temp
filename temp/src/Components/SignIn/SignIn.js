import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';
import { borders } from '@material-ui/system';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { API_DIRECTORY } from '../../constants';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Yo Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// function loginButton() {
//   let history = useHistory();

//   function handleClick() {
//     history.push("/");
//   }
// }

export default function SignIn(props) {
  const classes = useStyles();

  const [error, setError] = useState({status: false, message: 'No Error'});
  const [loginFailed, setLoginFailed] = useState(false);

  let handleSubmitClick = (event) => {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let errorMessage = '';

    if (email === undefined || typeof email !== 'string' || email.length < 1) errorMessage += 'Please Provide an Email\n';
    if (password === undefined || typeof password !== 'string' || password.length < 1) errorMessage += 'Please Provide a Password';

    if (errorMessage.length > 0) {
      alert(errorMessage);
    } else {
      const headers = { 'Content-Type': 'application/json' };

      fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.LOGIN_PATH}`, {
        method: 'POST',
        mode: 'cors',
        headers,
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then((result) => {
          if (result.status === 200) {
            result = result.json()
              .then((result) => {
                props.handleLogin(result);
              })
          } 
          else if (result.status === 404) {
            setLoginFailed(true);
          }
          else {
            setError({
              status: true,
              errorMessage: 'Email and Password do not match records'
            })
          }
        },
        (error) => {
          setError({
            status: true,
            errorMessage: 'Unable to connect to database'
          })
        });
    }
  }

  let sendMessage = () => {
    // const headers = { 'Content-Type': 'application/json' };

    // fetch(`https://ec2-54-177-132-229.us-west-1.compute.amazonaws.com/api/send`, {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers,
    //   body: JSON.stringify({
    //     recipient: "1111111111",
    //     message: "Sending this from the app"
    //   })
    // })
    //   .then((result) => {
    //     console.log(result);
    //   })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link aria-label='signUpLink' href="http://localhost:3000/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <button onClick={sendMessage}>CLICK ME TO SEND MESSAGE</button>
    </Container>
  );
}