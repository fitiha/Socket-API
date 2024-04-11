import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState('');
    const userName = useSelector(state => state.user.value);

    useEffect(() => {
        socket.emit('register', userName)
        socket.on('chat message', (msg) => {
            setMessages(msgs => [...msgs, msg]);
        });
    }, []);

    const handleChange = (e) => {
        setMessage(e.target.value)
        socket.emit('typing')
        socket.on('typing', (userName) => {
            setIsTyping(`user${userName[0].user} is typing`);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('chat message', message);
            setMessage('');
            setIsTyping('')
        }
    };

    return (
        <div>
            <h1>{isTyping}</h1>
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
