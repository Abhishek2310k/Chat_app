import React,{useState,useEffect,useRef} from 'react'
import './ChatContainer.scss'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios'
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes'
import {v4 as uuidv4} from 'uuid';

const ChatContainer = ({currentChat,currentUser,socket} ) => {

    const [messages,setMessages] = useState([]);
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    const handleSendMsg = async (msg) => {
        const response = await axios.post(sendMessageRoute,{
            from: currentUser._id,
            to: currentChat._id,
            message: msg, 
        },{
            withCredentials:true
        });
        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            message: msg,
        })

        const msgs = [...messages];
        msgs.push({fromSelf:true,message:msg})
        setMessages(msgs); 
    }

    useEffect(()=>{ 
        if(socket.current) {
            socket.current.on("msg-recieve",(msg)=>{
                console.log(msg);
                setArrivalMessage({fromSelf:false,message: msg})
            })
        }
    },[])

    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages])

    useEffect(()=>{
        if(currentChat) {
        const fun = async () => {
            const response = await axios.post(getAllMessageRoute,{
                from: currentUser._id,
                to: currentChat._id
            },
        {withCredentials:true});
            setMessages(response.data); 
        }
        fun();
    }
    },[currentChat])

  return (
    <div className='main_chat_container'>
        <div className='chat-header'>
            <div className='user-details'>
                <div className='avatar'>
                    <img 
                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                        alt="avatar"
                    />
                </div>
                <div className='username'>
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <Logout/>
        </div>
        <div className='chat-messages'>
            {
                messages.map((msg,index)=>{
                    return (
                        <div key={uuidv4()} ref={scrollRef}>
                            <div className={`message ${msg.fromSelf ? "sended" : "recieved"}`}>
                                <div className='content'>
                                    <p>
                                        {msg.message}
                                    </p>
                                </div>
                            </div> 
                        </div>
                    )
                })
            }
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </div>
  )
}

export default ChatContainer