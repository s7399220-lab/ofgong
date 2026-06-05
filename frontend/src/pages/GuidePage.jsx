import React, { useState } from 'react'
import axios from 'axios'

function GuidePage() {
  const [activeTab, setActiveTab] = useState('five-tier')
  const [guideContent, setGuideContent] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadGuide = async (guideType) => {
    try {
      setLoading(true)
      setActiveTab(guideType)
      const endpoint = guideType === 'five-tier'
        ? '/api/strategies/guide/five-tier-grading'
        : '/api/strategies/guide/credit-system'
      
      const response = await axios.get(endpoint)
      setGuideContent(response.data.data)
    } catch (err) {
      console.error('가이드 로드 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">개념 사전</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-8">
        <button
          onClick={() => loadGuide('five-tier')}
          className={`px-4 py-2 font-bold ${
            activeTab === 'five-tier'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          5등급제 안내
        </button>
        <button
          onClick={() => loadGuide('credit-system')}
          className={`px-4 py-2 font-bold ${
            activeTab === 'credit-system'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          고교학점제 안내
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        {loading && <div className="text-center">로딩 중...</div>}
        {guideContent && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{guideContent.title}</h2>
            <div className="prose prose-lg max-w-none">
              {guideContent.content}
            </div>
          </div>
        )}
        {!guideContent && !loading && (
          <p className="text-center text-gray-500">위의 탭을 선택하여 가이드를 확인하세요</p>
        )}
      </div>
    </div>
  )
}

export default GuidePage
