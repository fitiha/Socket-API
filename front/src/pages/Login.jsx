import { useState } from "react"
import { useDispatch } from 'react-redux';
import { addUser } from "../redux/slices/userSlice";
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [user, setUser] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(user));
        navigate('/chat')
    }
    return (
        <div>
            <h1>Login page</h1>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" placeholder="username" onChange={(e) => setUser(e.target.value)} />
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login