import axios from "axios"
import { API_HOST } from "../services/api"
// get Url from enviroment
// common url


const Instance = axios.create({
    baseURL: `${API_HOST}`,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*"
    }
})
export default Instance