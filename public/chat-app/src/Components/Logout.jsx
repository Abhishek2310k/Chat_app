import React from 'react'
import {useNavigate} from 'react-router-dom'
import {BiPowerOff} from 'react-icons/bi'
import './Logout.scss'
const Logout = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/login'); 
    }
  return (
    <div className='main_logout'>
        <button onClick={handleClick}>
            <BiPowerOff/>
        </button>
    </div>
  )
}

export default Logout