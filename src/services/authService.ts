
import axios, { AxiosRequestConfig } from 'axios';
// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = 'https://api.aryazar.ir/' + 'api/v1'; 
const getHeaders :any = () => {
  return {
    'Content-Type': 'application/json',
    'accept' : 'application/json'
    // 'Authorization': `Bearer ${token}`,
  };
};
const getBASE_URL = () => {
  // const BASE_URL = process.env.REACT_APP_BASE_URL + 'api/v1' ;
  return BASE_URL
};
const authService = {    
    // Auth
    login:(data:any) => axios.post(`${BASE_URL}/client/auth/login/`, data , getHeaders()),
}

export default authService;