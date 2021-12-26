import './styles/index.css';
import Home from './views/Home';
import Profile from './views/Profile';
import Error from './views/Error';
import SearchEvents from './views/SearchEvents';
import EventForm from './views/EventForm';
import SignInUp from './views/SignInUp';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import ProtectedRoute from "./router/ProtectedRoute";
import Settings from './views/Settings';


function App() {
  return (
    <Router>
      <Switch>
      <Route exact path='/signInUp' component={SignInUp}/>
      <Route exact path='/404' component={Error}/> 
      <div className="container">
        <NavBar />
        <div>

            {/* <Route exact path='/signInUp' component={SignInUp}/> */}
            <ProtectedRoute auth={localStorage.getItem("access_token")} exact path='/home' component={Home}/>
            <ProtectedRoute auth={localStorage.getItem("access_token")} exact path='/'>
              <Redirect to='/home'/>
            </ProtectedRoute>
            <ProtectedRoute auth={localStorage.getItem("access_token")} exact path='/profile/:id' component={Profile}/>
            <ProtectedRoute auth={localStorage.getItem("access_token")} exact path='/SearchEvents' component={SearchEvents}/>
            <ProtectedRoute auth={localStorage.getItem("access_token")} exact path='/EventForm' component={EventForm}/>
            <ProtectedRoute auth={localStorage.getItem("access_token")} exact path='/settings' component={Settings}/>
        </div>
        
      </div>
      
      </Switch>
     
    </Router>

  );
}

export default App;
