import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/login'

// BACKEND: http://gitgub.com/Piia/fullstack-viikko4

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
