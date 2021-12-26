import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

const ProtectedRoute = ({ component: Component,auth, ...rest }) => {
  return (
    <Route {...rest} render={
      props => 
      auth ?
      <Component {...rest} {...props} />
      :
      <Redirect to="/SignInUp"/>
    } />
  )
}

export default ProtectedRoute;