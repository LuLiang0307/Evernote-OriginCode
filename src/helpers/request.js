import axios from 'axios'
import baseURLConfig from './config-baseURL'
import { Message } from 'element-ui'

console.log('baseURLConfig:',baseURLConfig)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.withCredentials = true //即使是跨域也允许携带cookie

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }
    axios(option).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        Message.error(res.data.msg)
        reject(res.data)
      }
    }).catch(err => {
      Message.error({ msg: '网络异常' })
      reject({ msg: '网络异常' })
    })
  })
}