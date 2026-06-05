import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UniversitiesPage() {
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUniversities()
  }, [])

  const fetchUniversities = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/universities')
      setUniversities(response.data.data || [])
    } catch (err) {
      setError('대학 정보를 불러오는데 실패했습니다')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center">로딩 중...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">대학 정보</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni) => (
          <div key={uni.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">{uni.name}</h2>
            <p className="text-gray-600">{uni.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UniversitiesPage
