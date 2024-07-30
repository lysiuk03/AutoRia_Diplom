import axios from "axios";
import {APP_ENV} from "./env";


const http_common = axios.create({
    baseURL: APP_ENV.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default  http_common;