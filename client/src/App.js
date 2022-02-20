import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';

import { useSelector } from 'react-redux';



export default function App() {

    const modal = useSelector((store) => store.baseLogin.modal)
    

    return (
        <>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <HomePage />
                {modal.login && <Login />}
                {modal.register && <Register />}
            </div>

        </>
    );


}