import axios from 'axios';

let API_URL = process.env.REACT_APP_API_URL;
const createService = (baseURL) => {
    if (API_URL) {
        baseURL = `${API_URL}${baseURL}`;
    }

    const service = axios.create({baseURL})

    return service;
}

export default createService;