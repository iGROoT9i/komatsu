import { Routes, Route } from 'react-router-dom'
import GuideView from './pages/GuideView'
import RegisterView from './pages/RegisterView'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<GuideView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </div>
  )
}

export default App
