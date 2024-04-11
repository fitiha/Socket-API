import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
dotenv.config();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
});


let users = [];

io.on('connection', socket => {
    // console.log(`A user ${socket.id} connected`);

    socket.on('register', userName => {
        users.push({ user: userName, socket: socket.id })
    })

    socket.on('typing', () => {
        io.emit('typing', users.filter(u => u.socket == socket.id));
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // sending the message that came from a single socket(user), to all users
        console.log("users and their socket: ", users)
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

// const PORT = process.env.PORT || 3000;
const PORT = 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
