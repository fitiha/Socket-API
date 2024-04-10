import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
// const socketIo = await import('socket.io');
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server);
dotenv.config();

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// const PORT = process.env.PORT || 3000;
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
