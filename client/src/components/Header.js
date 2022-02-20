import React, { useRef  } from 'react';
import IdleTimer from 'react-idle-timer';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { baseLoginActions } from '../Store';



export default function Header() {
  const isLogedin = true;
  const idleTimer = useRef();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.baseLogin.user);
  console.log(user);


  function showLoginModal() {
    dispatch(baseLoginActions.setModal({ login: true, register: false }))
  }

  function logout() {
    dispatch(baseLoginActions.setUser(false));
    sessionStorage.removeItem('token');
  }
  function ShowRegister() {
    dispatch(baseLoginActions.setModal({login:false, register:true}))
  }
  




  return (

    <AppBar position="static" id='header'>
      {isLogedin && <IdleTimer ref={idleTimer} timeout={1200000} onIdle={logout} />}
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Base Login
        </Typography>
       {!user && <Button className='btn-login'
        color='inherit'
        variant='contained'
        onClick={ShowRegister} 
        children='Register' />} 
        {!user ? <Button
          className='btn-login'
          color="inherit"
          variant='contained'
          onClick={showLoginModal}>
          Login
        </Button>
          : <Button
            className='btn-login'
            color="inherit"
            onClick={logout}
            variant='outlined' >
            Logout
          </Button>}
      </Toolbar>
    </AppBar>

  );
}