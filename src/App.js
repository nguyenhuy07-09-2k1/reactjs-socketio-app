import './App.css';
import Chat from "./component/Chat";
import React from 'react';
import Home from "./component/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./component/FontAwesomeIcon";
import io from "socket.io-client";
const ENDPOINT = "https://reactjs-socketio-app.herokuapp.com/";

const socket = io.connect(ENDPOINT);

function Appmain(props) {
  return (
    <React.Fragment>
      <div className="right">
        <Chat
          socket={socket}
        />
      </div>
    </React.Fragment>
  );
}


function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Home socket={socket} />
        </Route>
        <Route path="/chat" component={ Appmain } />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
