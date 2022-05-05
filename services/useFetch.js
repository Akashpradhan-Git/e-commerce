import axios from "../config/axiosInstance";
import { useState, useEffect } from "react";

const useFetch = (url, token) => {
    const [data, setData] = useState(null);
    const option = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    useEffect(() => {
        axios.get(url, option)
            .then(res => {
                setData(res.data.data);
            }).catch(err => {
                console.log(err);
            })
    }, [url]);
    return [data];
};

export default useFetch;