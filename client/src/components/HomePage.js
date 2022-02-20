import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { baseLoginActions } from "../Store";


export default function HomePage() {
    const dispatch = useDispatch();
    const [info, setInfo] = useState(false);
    const [error, setError] = useState(false);
    const user = useSelector((s) => s.baseLogin.user);
    
    async function getInfo() {
        await axios.get('http://localhost:5000/users/getProfileInformation', {
            headers: {
                Authorization: `Bearer ${user}`
            },
            
        })
        .then((res) => setInfo(res.data))
        .catch((err) => setError(err.response.data.message))
        
    }

    useEffect(() => {

        dispatch(baseLoginActions.setUser(sessionStorage.getItem('token')))

        // eslint-disable-next-line
    }, [])

    
    useEffect(() => {
       if (user) getInfo();
       
       
       // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        if(error){
            setTimeout(() => {
                dispatch(baseLoginActions.setUser(false));
                
            }, 2000)
            
        }
        // eslint-disable-next-line
    }, [error])

   
    
  
    return !user ? (
        <h1 className='home-h1'>Base Login App</h1>
    ) : (
        info ? (
            <h1 style={{marginTop:'25px', color:'green', fontSize:'50px'}}>Hello:  {info.name}</h1>
        ) : (
            <h1>{error} you have to login again</h1>
        )
    )
}