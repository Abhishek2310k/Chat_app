import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messagesRoute.js';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';

config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
// we have already parsed the request
app.use(cookieParser());


app.get('/',(req,res)=>{return res.json({message:"hello world"})})
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("DB connection made");
  })
  .catch((err) => {
    console.error(err.message);
  });

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Process started on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: '*',  
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
