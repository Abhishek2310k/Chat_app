import React,{useState,useEffect,useRef} from 'react'
import axios from "axios" 
import './Chat.scss'
import { allUsersRoute ,host} from '../utils/APIRoutes';
import { useNavigate} from 'react-router-dom';
import Contacts from '../Components/Contacts';
import Welcome from '../Components/Welcome';
import ChatContainer from '../Components/ChatContainer';
import loader from '../assets/loader.gif';
import { io } from "socket.io-client";
const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined);
  const [currentChat,setCurrentChat] = useState(undefined);
  const [isLoaded,setIsLoaded] = useState(false);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')) {
        navigate('/login');
    }
    else {
      const get_user = async() => {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
      get_user();
    }
},[])

useEffect(() => {
  if (currentUser) {
    socket.current = io(host);
    socket.current.emit("add-user", currentUser._id);
  }
}, [currentUser]);

  useEffect(()=>{
    const get_data = async() => {
      if(currentUser) {
        if(currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data);
        }
        else {
          navigate('/setAvatar');
        }
      }
    }
    get_data();
  },[currentUser])

  return (
    <div className='chat'>
      <div className='main'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {isLoaded === false ? <img src={loader} alt='loader'/> :
          currentChat === undefined ? <Welcome currentUser={currentUser}/> : <ChatContainer currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />}
      </div>
    </div>
  )
}

export default Chat