import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">OFGONG</h1>
          <p className="text-2xl text-gray-300 mb-8">
            2028 대입전형 정보 정리 및 전략 해설 프로그램
          </p>
          <p className="text-lg text-gray-400 mb-8">
            고교학점제와 5등급 절대평가 시대, 올바른 전형 정보로 미래를 준비하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition">
            <h3 className="text-2xl font-bold mb-4">📚 대학 정보</h3>
            <p className="text-gray-300 mb-6">
              서울 주요 15개 대학의 전형 정보를 한눈에 비교하세요
            </p>
            <Link to="/universities" className="text-blue-400 hover:text-blue-300">
              자세히 보기 →
            </Link>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition">
            <h3 className="text-2xl font-bold mb-4">🔍 전형 검색</h3>
            <p className="text-gray-300 mb-6">
              조건에 맞는 전형을 검색하고 비교해보세요
            </p>
            <Link to="/admissions" className="text-blue-400 hover:text-blue-300">
              자세히 보기 →
            </Link>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition">
            <h3 className="text-2xl font-bold mb-4">💡 전략 추천</h3>
            <p className="text-gray-300 mb-6">
              당신의 프로필에 맞는 입시 전략을 추천받으세요
            </p>
            <Link to="/strategy" className="text-blue-400 hover:text-blue-300">
              자세히 보기 →
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/guide"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            개념 사전 보기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
