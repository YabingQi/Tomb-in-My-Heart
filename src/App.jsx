import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell.jsx'
import LandingPage from './pages/LandingPage.jsx'
import TombPage from './pages/TombPage.jsx'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tomb/:tombId" element={<TombPage />} />
      </Routes>
    </AppShell>
  )
}
