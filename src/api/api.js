import axiosInstance from "./axiosInstance";
import authInterceptor from "./interceptors/authInterceptor";
import { loadingInterceptor } from "./interceptors/loadingInterceptor";

export let api = axiosInstance; 

const setupApi = async () => {
    let configuredApi = loadingInterceptor(api);
    configuredApi = await authInterceptor(configuredApi);
    
    api = configuredApi; 
    
    return api;
};

export default setupApi();
