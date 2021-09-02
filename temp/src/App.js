import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
/// FILE IMPORTS ///
import SignIn from './Components/SignIn/SignIn.js'
import SignUp from './Components/SignIn/SignUp.js'
import Home from './Components/HomePage/HomePage.js'
import MustLogin from './Components/MustLogin';

function App(props) {
  const [appData, setAppData] = useState({
    loggedIn : false,
    userData : null
  });
  useEffect( () => {
      console.log('effecting');
  }, appData)
  
  // **************************************************** CALLBACK FUNCTIONS ************************************************* //
  let handleLogin = (userData) => {
    console.log(userData);
    setAppData({
      loggedIn : true,
      userData : userData[0]
    });
   
    props.history.push('/');
  }
  // ************************************************* END CALLBACK FUNCTIONS ************************************************ //
  if (appData.loggedIn) {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
  return (
    <Router data-testid="router">
      <Switch>
      <Route path="/Home">
          <MustLogin />
        </Route>
      <Route path='/SignUp'>
          <SignUp />
        </Route>
        <Route path='/SignIn'>
          <SignIn appData={appData} handleLogin={handleLogin} history={props.history} />
        </Route>
        <Route path="/">
          <Redirect to="/SignIn">
          </Redirect>
        </Route>
        
        

      </Switch>
    </Router>
  );
}

export default App;
