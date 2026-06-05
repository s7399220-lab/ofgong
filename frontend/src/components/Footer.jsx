import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">OFGONG</h3>
            <p className="text-gray-400">
              2028 대입전형 정보 정리 및 전략 해설 프로그램
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">메뉴</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-white">대학 정보</a></li>
              <li><a href="#" className="hover:text-white">전형 검색</a></li>
              <li><a href="#" className="hover:text-white">전략 추천</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">정보</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-white">이용약관</a></li>
              <li><a href="#" className="hover:text-white">문의</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 OFGONG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
