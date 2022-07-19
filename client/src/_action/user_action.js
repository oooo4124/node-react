import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataTosubmit){

    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data) // 서버에서 받은 데이터를 request에 담기

    return { //reducer로 넘겨주기
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit){

    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => response.data) 

    return { 
        type: REGISTER_USER,
        payload: request
    }
} 

export function auth(){

    const request = axios.get('/api/users/auth')
        .then(response => response.data) 

    return { 
        type: AUTH_USER,
        payload: request
    }
} 

