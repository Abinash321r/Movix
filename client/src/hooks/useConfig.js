import axios from "axios";
import { useState,useEffect } from "react";

const useConfig=()=>{
    const[configurl,setConfigUrl]=useState('');
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState('');
    const BASE_URL = import.meta.env.VITE_APP_TMDB_BASE_URL;
    const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
    const headers={
        accept: 'application/json',
        Authorization: 'Bearer '+TMDB_TOKEN
}
        useEffect(()=>{
            setConfigUrl(null);
            setLoading(true);
            setConfigUrl(null);
          axios.get(BASE_URL+'/configuration',{
            headers:headers,
        }).then(res=>{
            console.log('config response',res.data.images.secure_base_url+'original');
            setConfigUrl(res.data.images.secure_base_url+'original');
            setLoading(false);
        }).catch(error => {
            console.log('error');
            setError('error');
          })
        },[])
    return {configurl,loading,error}
}
export default useConfig;