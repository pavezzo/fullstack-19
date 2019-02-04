import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => {
        return res.data
    })
}

const create = (newObject) => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => {
        return res.data
    })
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (newObject) => {
    const req = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return req.then(res => res.date)
}

export default {
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
    updatePerson: updatePerson
}