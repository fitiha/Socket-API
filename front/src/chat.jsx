import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages(msgs => [...msgs, msg]);
        });
    }, []);

    const handleChange = (e) => {
        setMessage(e.target.value)
        socket.emit('typing')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('chat message', message);
            setMessage('');
        }
    };

    return (
        <div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    value={message}
                    onChange={handleChange}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
