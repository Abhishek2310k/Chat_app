import React,{useState,useEffect} from 'react'
import './Register.scss'
import {Link,useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'
// import {ToastContainer,toast} from 'react-toastify'
function Login() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        username: "",
        password: "",
    })

    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    },[])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if (handleValidation()){
            const {password,username} = values;
            const {data} = await axios.post(loginRoute,{
                username,
                password,
            });
            if(data.status === false) alert(data.msg);
            if(data.status === true) localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            navigate("/");
        }
    };

    const handleValidation = () => {
        const {password,username} = values;
        if(password==="") {
            alert("Email and password is required");
            return false;
        } else if (username==="") {
            alert("Email and password is required")
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setValues({...values,[e.target.name]: e.target.value});
    }


  return (
    <div className='form'>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className='brand'>
                <img src={logo} alt='logo'/>
                <h1>Snappy</h1>
            </div>
            <input type='text' placeholder='Username' name='username' onChange={(e)=>handleChange(e)} min="3"/>
            <input type='password' placeholder='Password' name='password' onChange={(e)=>handleChange(e)}/>
            <button type='submit'>Login  User</button>
            <span> Don't have an acount ? <Link to='/register'>Register</Link></span>
        </form>
    </div>
  )
}

export default Login