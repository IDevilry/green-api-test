import axios from "axios";


export const fetcher = axios.create({
    baseURL: `https://api.green-api.com`,
    headers: {
        "Content-Type": "application/json",
    }
});
