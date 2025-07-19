import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const nextServer = axios.create({
    baseURL,
    withCredentials: true, 
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    }
});