//useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url, token = "") {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('loading...')
        setData(null);
        setError(null);
        axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
            .then(res => {
                setLoading(false);
                //checking for multiple responses for more flexibility 
                //with the url we send in.
                res.data.content && setData(res.data.content);
                res.content && setData(res.content);
            })
            .catch(err => {
                setLoading(false)
                setError('An error occurred. Awkward..')
            })

    }, [url])

    return { data, loading, error }
}
export default useFetch;
