import axios from 'axios';

export default {
  findByUserId: function (headers, id) {
    return axios.get(`/api/notification/${id}`, headers)
  },
  remove: function (headers, id) {
    return axios.delete(`/api/notification/${id}`, headers)
  },
}