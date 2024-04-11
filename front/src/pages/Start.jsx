import { Link } from "react-router-dom"


const Start = () => {
    return (
        <div>
            <h1>Getting Started to chat app</h1>
            <Link to="/login">
                <button>Begin Chatting</button>
            </Link>
        </div>
    )
}

export default Start