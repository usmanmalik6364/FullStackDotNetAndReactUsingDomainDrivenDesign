import axios, { AxiosResponse } from 'axios';
import { Activity } from '../layout/models/activity';



const sleep = (delay:number) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay);
    });
}
axios.defaults.baseURL = 'http://localhost:5000/api';
// axios.interceptors.response.use(response =>{
//     sleep(1000).then(()=>{
//         return _type(reason:any):PromiseLike<never>
//     }).catch(() =>{

//     });
// })
const responseBody = <T> (response:AxiosResponse<T>) => response.data;


const requests = {
    get: <T> (url:string)=> axios.get<T>(url).then(responseBody),
    post:<T>(url:string,body:{})=> axios.post<T>(url,body).then(responseBody),
    put:<T>(url:string,body:{})=> axios.put<T>(url,body).then(responseBody),
    delete:<T>(url:string,body:{})=> axios.delete<T>(url,body).then(responseBody),

}



const Activities ={
    list:() => requests.get<Activity[]>('/activities')
}

const agent = {
    Activities
}

export default agent;