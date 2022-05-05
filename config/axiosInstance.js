import axios from "axios"

const Instance = axios.create({
    baseURL: "http://localhost:8050/e-commerce/api",
})
export default Instance