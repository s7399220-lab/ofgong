import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import UniversitiesPage from './pages/UniversitiesPage'
import AdmissionsPage from './pages/AdmissionsPage'
import StrategyPage from './pages/StrategyPage'
import GuidePage from './pages/GuidePage'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 앱 초기화 로직
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">로딩 중...</div>
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/universities" element={<UniversitiesPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/strategy" element={<StrategyPage />} />
            <Route path="/guide" element={<GuidePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
