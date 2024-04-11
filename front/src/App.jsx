import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Chat from "./Chat"
import Login from './pages/Login'
import Start from './pages/Start'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App