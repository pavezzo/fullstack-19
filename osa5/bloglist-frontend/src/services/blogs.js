
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = async() => {
    const request = await axios.get(baseUrl)
    return request.data
}

const postNewBlog = async(data) => {
    const config = {
        headers: { Authorization: token }
    }
    console.log(token)
    const request = axios.post(baseUrl, data, config)
    return request.data
}

export default { getAll, postNewBlog, setToken }