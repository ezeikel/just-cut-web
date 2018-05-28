import React from 'react';

const Login = () => (
  <form>
    <h2>Login</h2>
    <label htmlFor="email">Email Address</label>
    <input type="text" name="email" />
    <label htmlFor="password">Password</label>
    <input type="text" name="password" />
    <input type="submit" value="login" />
  </form>
);

export default Login;
