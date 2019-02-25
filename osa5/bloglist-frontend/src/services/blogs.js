
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

const postNewBlog = async(data) => {
  const request = axios.post(baseUrl, data)
  return request.data
}

export default { getAll, postNewBlog }