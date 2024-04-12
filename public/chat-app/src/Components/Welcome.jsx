import React from 'react'
import Robot from "../assets/robot.gif"
import './Welcome.scss';
const Welcome = ({currentUser}) => {
  return (
    <div className='welcome_main'>
        <img src={Robot} alt='Robot'/>
        <h1>
            Welcome, <span>{currentUser.username}</span>
        </h1>
        <h3>
            Please select a chat to Start Messaging
        </h3>
    </div>
  )
}

export default Welcome