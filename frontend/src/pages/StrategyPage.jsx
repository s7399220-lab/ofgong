import React, { useState } from 'react'
import axios from 'axios'

function StrategyPage() {
  const [profile, setProfile] = useState({
    schoolType: '',
    field: '',
    gradeLevel: '',
    subjects: [],
    electiveSubjects: false
  })
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleGetRecommendation = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/strategies/recommendation', profile)
      setRecommendation(response.data.data)
    } catch (err) {
      console.error('추천 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">전략 추천</h1>
      
      {/* Profile Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select
            name="schoolType"
            value={profile.schoolType}
            onChange={handleProfileChange}
            className="border rounded px-4 py-2"
          >
            <option value="">학교 유형 선택</option>
            <option value="regular">일반고</option>
            <option value="specialized">특목고</option>
            <option value="independent">자사고</option>
          </select>
          <select
            name="field"
            value={profile.field}
            onChange={handleProfileChange}
            className="border rounded px-4 py-2"
          >
            <option value="">희망 계열 선택</option>
            <option value="humanities">인문계열</option>
            <option value="science">자연계열</option>
          </select>
          <select
            name="gradeLevel"
            value={profile.gradeLevel}
            onChange={handleProfileChange}
            className="border rounded px-4 py-2"
          >
            <option value="">내신 등급대 선택</option>
            <option value="1">1등급대</option>
            <option value="2">2등급대</option>
            <option value="3">3등급대</option>
            <option value="4">4등급대</option>
            <option value="5">5등급대</option>
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="electiveSubjects"
              checked={profile.electiveSubjects}
              onChange={handleProfileChange}
              className="mr-2"
            />
            진로선택 과목 이수
          </label>
        </div>
        <button
          onClick={handleGetRecommendation}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? '분석 중...' : '전략 추천받기'}
        </button>
      </div>

      {/* Recommendation Result */}
      {recommendation && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold mb-4 text-green-800">수시 교과전형</h3>
            <p className="text-gray-700">{recommendation.susiPriority?.description}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold mb-4 text-blue-800">수시 종합전형</h3>
            <p className="text-gray-700">{recommendation.susuIntegratedPriority?.description}</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-bold mb-4 text-purple-800">정시</h3>
            <p className="text-gray-700">{recommendation.jeongsiPriority?.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StrategyPage
