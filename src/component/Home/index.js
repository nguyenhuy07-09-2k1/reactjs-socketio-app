import React, { useState, useMemo } from "react";
import "./home.scss";
import { Link } from "react-router-dom";

function Homepage({ socket }) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");


  //activates joinRoom function defined on the backend
  const sendData = useMemo(() => () => {
    if (username !== "" && password !== "") {

      socket.auth = { username: username }
      socket.connect();
      //if empty error message pops up and returns to the same page
    } else {
      alert("username and password are must !");
      window.location.reload();
    }
  }, [socket, password, username])


  return (
    <div className="homepage">
      <h1>Welcome to ChatApp</h1>
      <input
        placeholder="Input your user name"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <input
        placeholder="Input the password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      ></input>
      <Link to={`/chat`}>
        <button onClick={() => sendData()}>Join</button>
      </Link>
    </div>
  );
}

export default Homepage;