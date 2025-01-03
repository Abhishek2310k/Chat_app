import React,{useState} from 'react'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import'./ChatInput.scss'
const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker,setShowEmojiPicker] = useState(false);
    const [msg,setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emojiObject,event) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
      };

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }

  return (
    <div className='main_chatInput'>
        <div className='button-container'>
            <div className='emoji'>
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                    showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                }
            </div>
        </div>
        <form className='input-container' onSubmit={(event)=>sendChat(event)}>
            <input type='text' placeholder='type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button className='submit'>
                <IoMdSend/>
            </button>
        </form>
    </div>
  )
}

export default ChatInput