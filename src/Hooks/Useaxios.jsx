import axios from 'axios';
import React, { useMemo } from 'react';

const Useaxios = () => {
    const axiosInstance =useMemo(()=>{
        return axios.create({
            // baseURL: 'http://localhost:5000'
            baseURL: 'https://blood-donation-server-eight-mu.vercel.app'
          
        })
    },[])
    return axiosInstance;
};

export default Useaxios;