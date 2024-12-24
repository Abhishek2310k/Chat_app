import React,{useState,useEffect} from 'react'
import './Register.scss'
import {Link,useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'
// import {ToastContainer,toast} from 'react-toastify'
function Register() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    },[])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if (handleValidation()){
            const {password,confirmPassword,username,email} = values;
            const {data} = await axios.post(registerRoute,{
                username,
                email,
                password,
            });
            console.log(data);
            if(data.status === false) alert(data.msg);
            if(data.status === true) localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            navigate("/");
        }
    };

    const handleValidation = () => {
        const {password,confirmPassword,username,email} = values;
        if(password!==confirmPassword) {
            alert("password and confirm password should be same");
            return false;
        } else if (username.length < 3) {
            alert("Username Should be greater than 3 characters")
            return false;
        } else if (password.length < 8) {
            alert("Password Should be greater than 8 characters")
            return false;
        } else if (email === '') {
            alert("email is required");
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
            <input type='text' placeholder='Username' name='username' onChange={(e)=>handleChange(e)}/>
            <input type='email' placeholder='Email' name='email' onChange={(e)=>handleChange(e)}/>
            <input type='password' placeholder='Password' name='password' onChange={(e)=>handleChange(e)}/>
            <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={(e)=>handleChange(e)}/>
            <button type='submit'>Create User</button>
            <span> Already have an acount ? <Link to='/login'>Login</Link></span>
        </form>
    </div>
  )
}

export default Register