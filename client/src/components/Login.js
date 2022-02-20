import { TextField, Typography,Button  } from '@mui/material';
import { useDispatch } from 'react-redux';
import { baseLoginActions } from '../Store';
import { useState } from 'react';
import axios from 'axios';



export default function Login(){
    const dispatch = useDispatch();
    const [input, setInput] = useState({email:'', password:''});
    const [error, setError] = useState(false);

    

function onChange(e){
    setInput({...input, [e.target.name]: e.target.value })
}

    function hideLoginModal(){
        dispatch(baseLoginActions.setModal({login:false, register:false}))
      }

     
      async function loginHandler() {
         await  axios.post('http://localhost:5000/users/signin', {email: input.email, password: input.password})
         .then((res) => {
             dispatch(baseLoginActions.setUser(res.data.token));
            sessionStorage.setItem('token', res.data.token);
         })
         .catch((err) => {
             setError(err.response.data.message);
         });
      }

   
   
  
    
   
    return (
        <>
            <div className='backdrop' />

            <div className='modal'>
                <Typography children='Login' variant='h4' />
                <TextField 
                    type='text'
                    label='Email' 
                    name='email' 
                    style={style.input} 
                    value={input.email} 
                    onChange={onChange} />
                <TextField 
                    type='password' 
                    label='Password' 
                    name='password' 
                    style={style.input} 
                    onChange={onChange} 
                    value={input.password} />
                <Typography children={error} style={{color:'red'}} />
                <Button 
                    variant='contained' 
                    color='primary' 
                    children='Login' 
                    onClick={loginHandler}
                    style={style.input} />
                    
                <Button 
                    variant='outlined' 
                    color='primary' 
                    children='Close' 
                    onClick={hideLoginModal} 
                    style={style.input} />
                
            </div>

        </>
    )
}

const style = {
    input: {
        width:'100%',
        marginTop:'10px'
    },
    register: {
        color: 'blue',
        margin:'5px',
        cursor:'pointer'
    }
}