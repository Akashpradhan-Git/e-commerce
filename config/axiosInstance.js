import axios from "axios"
import { API_HOST } from "../services/api"
// get Url from enviroment
// common url


const Instance = axios.create({
    baseURL: `${API_HOST}`,

})
export default Instance