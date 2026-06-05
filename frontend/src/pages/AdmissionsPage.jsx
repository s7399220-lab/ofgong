import React, { useState } from 'react'
import axios from 'axios'

function AdmissionsPage() {
  const [filters, setFilters] = useState({
    university: '',
    field: '',
    type: '',
    hasMinimumScore: false
  })
  const [admissions, setAdmissions] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/admissions', { params: filters })
      setAdmissions(response.data.data || [])
    } catch (err) {
      console.error('검색 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">전형 검색</h1>
      
      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="university"
            placeholder="대학명"
            value={filters.university}
            onChange={handleFilterChange}
            className="border rounded px-4 py-2"
          />
          <select
            name="field"
            value={filters.field}
            onChange={handleFilterChange}
            className="border rounded px-4 py-2"
          >
            <option value="">계열 선택</option>
            <option value="humanities">인문계열</option>
            <option value="science">자연계열</option>
          </select>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border rounded px-4 py-2"
          >
            <option value="">전형 유형</option>
            <option value="susi">수시</option>
            <option value="jeongsi">정시</option>
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hasMinimumScore"
              checked={filters.hasMinimumScore}
              onChange={handleFilterChange}
              className="mr-2"
            />
            수능 최저 있음
          </label>
        </div>
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          검색
        </button>
      </div>

      {/* Results Section */}
      {loading && <div className="text-center">검색 중...</div>}
      <div className="space-y-4">
        {admissions.map((admission) => (
          <div key={admission.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{admission.name}</h3>
            <p className="text-gray-600">{admission.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdmissionsPage
