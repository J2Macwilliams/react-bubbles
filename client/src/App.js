import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

import NavBar from './components/NavBar';
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";

import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
      <NavBar />
        <Switch>
        <PrivateRoute path="/protected" >
            <BubblePage />
          </PrivateRoute>
          <Route exact path="/" component={Login} />
          <Route component={Login} />
          {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
         
        </Switch>
      </div>
    </Router>
  );
}

export default App;
