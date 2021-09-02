import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

/// FILE IMPORTS ///
import SignIn from './Components/SignIn/SignIn.js'
import SignUp from './Components/SignIn/SignUp.js'
import Home from './Components/HomePage/HomePage.js'

function App() {
  return (
    <Router data-testid="router">
      <Switch>
       <Redirect exact from='/' to='/SignIn' />
         <Route exact path = '/SignIn'>
         <SignIn />
         </Route>
         <Route exact path = '/SignUp'>
           <SignUp/>
         </Route>
         <Route exact path = '/Home'>
           <Home/>
         </Route>        
      </Switch>
    </Router>
  );
}

export default App;
