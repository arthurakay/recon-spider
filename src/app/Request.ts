import axios, {AxiosInstance} from 'axios';

const baseURL: string = location.origin + '/';

export const axiosInstance: AxiosInstance = axios.create({baseURL});

export const makeRequest = function(options: any) {
    return (<any>axiosInstance).request(options)
        .then((data: any) => {
            return data;
        });
};