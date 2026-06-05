import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

function Navbar() {
  // 메뉴 열기/닫기
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          // 로고
          <Link to="/" className="text-2xl font-bold">
            OFGONG
          </Link>
          
          // 데스크톱 메뉴
          <div className="hidden md:flex space-x-8">
            <Link to="/universities" className="hover:text-blue-400">
              대학 정보
            </Link>
            <Link to="/admissions" className="hover:text-blue-400">
              전형 검색
            </Link>
            <Link to="/strategy" className="hover:text-blue-400">
              전략 추천
            </Link>
            <Link to="/guide" className="hover:text-blue-400">
              개념 사전
            </Link>
          </div>

          // 모바일 버튼
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        // 모바일 메뉴
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/universities" className="block hover:text-blue-400">
              대학 정보
            </Link>
            <Link to="/admissions" className="block hover:text-blue-400">
              전형 검색
            </Link>
            <Link to="/strategy" className="block hover:text-blue-400">
              전략 추천
            </Link>
            <Link to="/guide" className="block hover:text-blue-400">
              개념 사전
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
