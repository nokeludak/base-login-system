import { TextField, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { baseLoginActions } from '../Store';
import { useState } from 'react';
import axios from 'axios';



export default function Register() {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    function onChange(e) {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    function hideRegisterModal() {
        dispatch(baseLoginActions.setModal({login:false, register:false}))
    }

    function showLoginModal(){
        dispatch(baseLoginActions.setModal({ login:true, register:false }))
      }

     async function registerHandler() {
         await axios.post('http://localhost:5000/users/signup', {name: input.name, email: input.email, password: input.password, passwordConfirm: input.passwordConfirm})
         .then((res) => {
            dispatch(baseLoginActions.setUser(res.data.token));
         })
         .catch((err) => {
            setError(err.response.data.message);
         })
     } 




    return (
        <>
            <div className='backdrop' />

            <div className='modal'>
                <Typography children='Register' variant='h4' />
                <TextField
                    
                    type='text'
                    label='Enter a name'
                    name='name'
                    style={style.input}
                    value={input.name}
                    onChange={onChange} />
                     <TextField
                     
                    type='text'
                    label='Enter a email'
                    name='email'
                    style={style.input}
                    value={input.email}
                    onChange={onChange} />
                <TextField
                    
                    type='password'
                    label='Enter a password'
                    name='password'
                    style={style.input}
                    onChange={onChange}
                    value={input.password} />
                      <TextField
                      required
                    type='password'
                    label='Confirm Password'
                    name='passwordConfirm'
                    style={style.input}
                    onChange={onChange}
                    value={input.passwordConfirm} />
                <Typography children={error} style={{color:'red'}} />
                <Button
                    variant='contained'
                    color='primary'
                    children='Register'
                    onClick={registerHandler}
                    style={style.input} />
                <Button
                    variant='outlined'
                    color='primary'
                    children='Close'
                    onClick={hideRegisterModal}
                    style={style.input} />
                    <Typography 
                        onClick={showLoginModal}
                        style={style.register}
                        children='Have account Login' />
                
            </div>

        </>
    )
}

const style = {
    input: {
        width: '100%',
        marginTop: '10px'
    },
    register: {
        color: 'blue',
        margin: '5px',
        cursor: 'pointer'
    }
}