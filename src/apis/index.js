import axios from 'axios'

export default {
  fetch (method, url, data) {
    return new Promise(function (resolve, reject) {
      if (method === 'get') {
        let params = { params: data }
        resolve(axios.get(url, params))
      } else if (method === 'post') {
        resolve(axios.post(url, data))
      } else if (method === 'put') {
        resolve(axios.put(url, data))
      } else if (method === 'delete') {
        resolve(axios.delete(url, data))
      }
    })
  }
}
