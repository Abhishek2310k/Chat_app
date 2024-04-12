import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "../src/pages/Register.jsx";
import Chat from "../src/pages/Chat.jsx";
import SetAvatar from "../src/pages/setAvatar.jsx";
import Login from "../src/pages/Login.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Chat/>}/>
        <Route path="/setAvatar" element={<SetAvatar/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
