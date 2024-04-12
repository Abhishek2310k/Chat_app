import React, { useState, useEffect } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';
import './setAvatar.scss';

const SetAvatar = () => {

    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        }
    },[])

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            alert("Please Select an Avatar");
        }
        else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar],
            });
            if(data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate("/");
            } else {
                alert("error setting avatar please try again");
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedAvatars = [];
                for (let i = 0; i < 4; i++) {
                    const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const buffer = Buffer.from(response.data, "binary").toString("base64");
                    fetchedAvatars.push(buffer);
                }
                setAvatars(fetchedAvatars);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching avatars:", error);
                setIsLoading(false); // Ensure isLoading is set to false even in case of error
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {isLoading === true ? <div className='avatar_selector'><img src={loader} alt='loader' /></div> :
                <div className='avatar_selector'>
                    <div className='title-container'>
                        <h1>Pick An avatar as your profile picture</h1>
                    </div>
                    <div className='avatars'>
                        {avatars.map((avatar, index) => {
                            return (
                                <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`} key={index}>
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button className='submit-btn' onClick={setProfilePicture}>
                        Set as Profile Picture
                    </button>
                </div>
            }
        </>
    );
};

export default SetAvatar;
