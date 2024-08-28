import React,{useEffect, useState} from 'react'
import authService from '@/appwrite/auth'
import { useSelector, useDispatch  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from './index';

function Protected({children, authentication=true}) {

    const navigate = useNavigate();
    const [loader, setLoader]= useState(true);
    const authStatus = useSelector(state =>state.auth.status);

    useEffect(()=>{
        if(authentication &&  authStatus!== authentication){
            navigate('/home');
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/");
        }

        setLoader(false);
    },[authStatus, navigate, authentication])

  return loader?<Loader/>:<>{children}</>
}

export default Protected;