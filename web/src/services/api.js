import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.thingspeak.com'
})

export default api
