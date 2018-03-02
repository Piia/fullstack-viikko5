import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/blogs'

// BACKEND: http://gitgub.com/Piia/fullstack-viikko4

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token } 
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = ({id, newObject}) => {
  const config = {
    headers: { 'Authorization': token } 
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const like = ({id}) => {
  const request = axios.patch(`${baseUrl}/${id}/like`)
  return request.then(response => response.data)
}

const destroy = ({id}) => {
  const config = {
    headers: { 'Authorization': token } 
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, like, destroy }