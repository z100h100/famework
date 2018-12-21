import axios from 'axios'
// 开发环境
axios.get('/global-config.json').then((res) => {
  axios.defaults.baseURL = res.data['BASE_URL']
  axios.defaults.timeout = 30000
  axios.defaults.withCredentials = true
})

let Ajax = axios

export default Ajax
