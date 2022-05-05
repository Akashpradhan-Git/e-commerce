import axios from "axios"
import { API_HOST } from "../services/api"
const Instance = axios.create({
    baseURL: `${API_HOST}`,
})
export default Instance