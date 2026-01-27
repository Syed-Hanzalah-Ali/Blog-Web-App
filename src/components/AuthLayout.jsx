// protection mechanism to protect pages and routes
import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
function Protected({children,authentication=true}) {
    const [loader,setLoader]=useState(true);
    const authStatus=useSelector((state)=>state.auth.status);
    const navigate=useNavigate();

    useEffect(()=>{
        if(authentication && authStatus!==authentication){  // if user show authenticate but status show false then login
            navigate("/login")
        }
        else if(!authentication && authStatus!==authentication){ // if user show auth false but status show true then redirect to /
            navigate("/")
        }
        setLoader(false);// stop the loader to false
    },[authStatus,navigate,authentication])
  return (
    loader?<h1>Loading...</h1>:<>{children}</>
  )
}

export default Protected