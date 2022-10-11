
import './App.css';
import io from 'socket.io-client'
import {useEffect,useState} from 'react'

const socket = io.connect("http://localhost:5000")

function App() {
  const [message,setMessage] = useState("")
  // const [messageReceived,setMessageReceived] = useState("")
  const [room,setRoom] = useState(10);
  const [chat,setChat] = useState([])

  const joinRoom = () =>{
    if(room!==""){
      socket.emit("join_user",room)
    }
  }
  const sendMessage=()=>{
    socket.emit("send_message",{message,room});
    let temp = {}
    temp.msg = message;
    temp.type='self'
    setChat(prev=>[...prev,temp])
  };

    useEffect(()=>{
      socket?.off("receive_message").on("receive_message",(data)=>{
        console.log(data)
        // setMessageReceived(data.message)
        let temp = {}
        temp.msg=data.message;
        temp.type='another'
        setChat(prev=>[...prev,temp])
      })
    },[socket])

    
  return (
    <div className="container mt-5">
        {/* <input className='form-control my-2' placeholder="Room Number..." onChange={(e)=>setRoom(e.target.value)}/>
        <button className='btn btn-primary my-2' onClick={joinRoom}>Join Room</button> */}
        <button className='btn btn-primary my-2' onClick={joinRoom}>Start Chat</button>
        <input className='form-control my-2' placeholder='Message...' onChange={(e)=>setMessage(e.target.value)}/>
        <button className='btn btn-primary my-2' onClick={sendMessage}>Send Message</button>
        <h1>Message :  </h1>

        <div className='container'>

        {chat.map((msg,index)=>{
          return (<div className={`${msg.type==='self'?'text-end':""}`} key={index}><h6 className={`${msg.type==='self'?'text-success':'text-primary'}`}>{msg.msg}</h6></div>)
        })}
        </div>
    </div>
  );
}

export default App;
