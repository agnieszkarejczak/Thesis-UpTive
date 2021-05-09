import React from 'react'
import './styles/index.css';
import Home from './views/Home';
import Profile from './views/Profile';
import Error from './views/Error';
import SearchEvents from './views/SearchEvents';
import EventForm from './views/EventForm';
import SignInUp from './views/SignInUp';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

const Navigation = () => {
    return (
        <Switch>
        <Route exact path='/signInUp' component={SignInUp}/>
        <Route exact path='/404' component={Error}/> 
        <div className="container">
          <NavBar />
          <div>
  
              <Route exact path='/signInUp' component={SignInUp}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/'>
                <Redirect to='/home'/>
              </Route>
              <Route exact path='/profile' component={Profile}/>
              <Route exact path='/SearchEvents' component={SearchEvents}/>
              <Route exact path='/EventForm' component={EventForm}/>
          </div>
          
        </div>
        
        </Switch>
    )
}

export default Navigation
