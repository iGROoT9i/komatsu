import { Routes, Route } from 'react-router-dom'
import GuideView from './pages/GuideView'
import RegisterView from './pages/RegisterView'
import DashboardView from './pages/DashboardView'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<GuideView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard" element={<DashboardView />} />
      </Routes>
    </div>
  )
}

export default App
