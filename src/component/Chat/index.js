import Dashboard from '../Dashboard';
import Contact from '../Contact';
import Content from '../Content';
import SplitChat from '../SplitChat';
export default function Chat({ socket }){
  // console.log(username, roomname, socket)
    return(
        <div className="container">
        <Dashboard/>
        <Contact socket = { socket }/>
        <Content 
          // username={username}
        //   roomname = {roomname}
          socket = {socket}/>
        <SplitChat/>
      </div>
    )
}