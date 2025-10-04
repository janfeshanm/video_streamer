import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn(props: { setIsLoggedIn: (val: boolean) => void, isLoggedIn: boolean }) {
    const {setIsLoggedIn}  = props;
    const [errrorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    const { data } = await axios.post("http://localhost:3002/api/v1/user/signin", form);
    if (data.status === parseInt('401')) {
      setErrorMessage(data.response)
    } else {
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true)
      navigate('/video')
    }

  };

    return (<ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
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
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Typography component="p" color="red">
              {errrorMessage}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid size="grow">
                <Link href="/Signup" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid size="auto">
                <Link href="SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          </Box>
            
        
        <p>{errrorMessage}</p>
        </Container>
        
        </ThemeProvider>)
}