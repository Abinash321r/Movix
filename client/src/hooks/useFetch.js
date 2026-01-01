import axios from "axios";
import { useState,useEffect } from "react";
//import { useSelector, useDispatch } from 'react-redux'


const useFetch=(url)=>{
  //  const url = useSelector((state) => state.home.url)

    const[data,setData]=useState([]);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState('');
    const BASE_URL = import.meta.env.VITE_APP_TMDB_BASE_URL;
    const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

    const headers={
            accept: 'application/json',
            Authorization: 'Bearer '+TMDB_TOKEN
    }

   
    useEffect(()=>{
        setData(null);
        setLoading(true);
        setError(null);

        axios.get(BASE_URL+url,{
            headers:headers,
        }).then(res=>{
            console.log('data response',res.data);
          /*  setTimeout(()=>{
              setData(res.data);
            },5000)*/
            setData(res.data);
            setLoading(false);
        }).catch(error => {
            console.log('error');
            setError('error');
          })
  },[url])
return {data,loading,error}
}
export default useFetch;