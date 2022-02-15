import axios from 'axios'

export default {
  find: async function(headers) {
    return await axios('/auth/find', headers)
  },
  findOne: async function(headers, _, id) {
    return await axios(`/auth/find/${id}`, headers)
  },
  findByRole: async function(headers, params) {
    return await axios(`/auth/findByRole`, {params, headers: headers.headers})
  },
  createUser: async function(headers, data) {
    return await axios.post('/auth/createUser', data, headers)
  },
  update: async function(headers, data, id) {
    return await axios.put(`/auth/${id}`, data, headers)
  },
  delete: async function(headers, _, id) {
    return await axios.delete(`/auth/${id}`, headers)
  }
}