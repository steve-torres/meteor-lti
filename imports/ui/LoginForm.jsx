import { Meteor } from 'meteor/meteor';
import React, { Fragment, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

export default LoginForm = ({onSuccess}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, (error=>{
      if(!error){
        onSuccess();
      } else {
        alert('Whoops, not able to login. Check your password.');
      }
    }));
  };

  return (
    <Fragment>
      {loggedIn ? <Navigate to="/about" /> :
        (
        <div style={{margin: "10px"}}>
          <div className="accounts-dialog">
          <form onSubmit={submit} className="login-form">
              <label htmlFor="username">Email</label>
      
              <input
                type="email"
                placeholder="Email"
                name="username"
                required
                onChange={e => setUsername(e.target.value)}
              />

              <label htmlFor="password">Password</label>
      
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={e => setPassword(e.target.value)}
              />
              <div>
                <button className="login-button login-button-form-submit styled" type="submit">Sign In</button>
              </div>
            </form>
          </div>
        </div>
        )
      }
    </Fragment>
  );
};