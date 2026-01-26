import React from 'react'
import { authService } from '../../appwrite/auth'
import {useDispatch} from "react-redux";
import {logout} from "../../store/auth.Slice" ;

function LogoutBtn() {
    const dispatch=useDispatch();
    
    function handleLogout(){
        authService.logout   // api call to logout
        .then(()=>{   // if logout then inform store to update state at frontend
            dispatch(logout())
        })
    }
  return <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
  >Logout</button>
}

export default LogoutBtn