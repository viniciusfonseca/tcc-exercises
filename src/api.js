import axios from 'axios'

export const API_URL = "http://localhost:8080"
// export const API_URL = "https://viniciusfonseca-tcc-api.glitch.me"
const api = axios.create({ baseURL: API_URL })

export default api