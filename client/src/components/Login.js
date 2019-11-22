import React, { Component } from 'react';

import axios from 'axios'

import { Paper, Grid, TextField, Button, Typography } from '@material-ui/core';

export class LoginForm extends Component {
  state = {
    credentials: {
      username: '',
      password: ''
    },
    loggedIn: false
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/login",
        this.state.credentials
      )
      .then(response => {
        // console.log("response", response);
        const { data } = response;

        localStorage.setItem("token", data.payload);
        this.setState({ ...this.state, loggedIn: true });

      });
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ ...this.state, loggedIn: true });
    } else {
      this.setState({ ...this.state, loggedIn: false });
    }
  }

  render() {
    return (
      <div>
        <Grid container >
          <Paper style={{ width: '100%', margin: 100, padding: 10, boxShadow: '0 0 20px 5px #8a2be2' }}>
            <form onSubmit={this.login}>
              <Typography variant="h5" >
                {this.state.loggedIn ? "LOGGED IN!" : "Please login"}
              </Typography>
              <TextField
                id="outlined-basic"
                label="username"
                name="username"
                margin="normal"
                variant="outlined"
                value={this.state.username}
                onChange={this.handleChange}
                required
              />
              <TextField
                // type="password" 
                id="outlined-basic"
                label="password"
                name="password"
                margin="normal"
                variant="outlined"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <Button type="submit" style={{ background: '#8a2be2', color: 'white' }} >Submit</Button>
            </form>
          </Paper>
        </Grid>
      </div>
    )
  }
}

export default LoginForm;

