import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./components/Login";
import MainMenu from "./components/MainMenu";
import Lobby from "./components/Lobby";
import GameRoom from "./components/GameRoom";
import Scoreboard from "./components/Scoreboard";
import ResultScreen from "./components/ResultScreen";

function App() {

  return (<Router>
    <div className = "App" >
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/MainMenu" component={MainMenu}/>
      <Route path="/Lobby" component={Lobby}/>
      <Route path="/Gameroom/:roomId" component={GameRoom}/>
      <Route path="/Scoreboard/:roomId" component={Scoreboard}/>
      <Route path="/Result/:roomId" component={ResultScreen}/>
    </Switch>
    </div>
  </Router>);
}

export default App;
