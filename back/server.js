import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
});
dotenv.config();

//----------------------------------

io.on('connection', socket => {
    console.log(`A user ${socket.id} connected`);

    socket.on('typing', () => {
        console.log("typing")
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // sending the message that came from a single socket(user), to all users
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

// const PORT = process.env.PORT || 3000;
const PORT = 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
