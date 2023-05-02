import axios, {AxiosInstance} from "axios";
import config from '../../config.json'

const apiUrl = config.API_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance;