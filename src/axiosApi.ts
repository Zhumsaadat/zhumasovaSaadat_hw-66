import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://zhumashovasaadat-default-rtdb.europe-west1.firebasedatabase.app',
});

export default axiosApi;