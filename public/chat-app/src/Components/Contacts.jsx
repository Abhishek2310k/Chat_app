import React,{useState,useEffect} from 'react'
import logo from '../assets/logo.svg';
import './Contacts.scss';
const Contacts = ({contacts,currentUser,changeChat}) => {
    const [currentUserName,setCurrentUserName] = useState(undefined);
    const [currentUserImage,setCurrentUserImage] = useState(undefined);
    const [currentSelected,setCurrentSelected] = useState(undefined);

    useEffect(()=>{
        if(currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);

        }
    },[currentUser]);

    const changeCurrentChat = (index,contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

  return (
    <>
        {currentUserName && currentUserImage && <div className='main_contacts'>
            <div className='brand'>
                <img src={logo} alt='logo'/>
                <h3>Chat App</h3>
            </div>
            <div className='contacts'>
                {
                    contacts.map((contact,index)=>{return(
                        <div className={`contact ${index === currentSelected ? "selected" : "" }`} key={index}
                        onClick={()=>changeCurrentChat(index,contact)}>
                            <div className='avatar'>
                                <img 
                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                alt="avatar"
                                />
                            </div>
                            <div className='username'>
                                <h3>{contact.username}</h3>
                            </div>
                        </div>
                    )})
                }
                
            </div>
            <div className='current-user'>
                <div className='avatar'>
                    <img 
                        src={`data:image/svg+xml;base64,${currentUserImage}`}
                        alt="avatar"
                    />
                </div>
                <div className='username'>
                    <h2>{currentUserName}</h2>
                </div>
            </div>
        </div>
        }
    </>
  )
}

export default Contacts

