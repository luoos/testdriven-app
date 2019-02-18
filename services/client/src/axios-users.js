import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_USERS_SERVICE_URL}/api/v1`
});

export default instance;