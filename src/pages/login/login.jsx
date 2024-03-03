import './login.css';
import apiAuth from '../../lib/auth/api.auth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login(props){
    let[isAuth, setAuth] = useState(localStorage.getItem("token") != "null" && typeof(localStorage.getItem("token"))!== 'object');
    let [error, setError] = useState(false);
    //console.log(typeof(localStorage.getItem("token")))
 

    async function submitHandle(event){
        event.preventDefault();
        //console.log(`event - ${event}`);
        const email = [...document.getElementsByName('email')][0];
        const password = [...document.getElementsByName('password')][0];
        //console.log(email.value);
        //console.log(password.value);
        try{
            const user = await apiAuth.login(email.value, password.value);
            localStorage.setItem("token", user.data.access_token);
            localStorage.setItem("refresh_token", user.data.refresh_token);
            setAuth(true);
        }catch(err){
            console.log(err.response);
            setError(true);
        }
    }
    console.log(props);
    if(!isAuth)
    return(
        <div className='global__wrapper'>
        <div className="wrapper">
        <h1 className="header">Страница входа</h1>
        <form className="form" method='POST'>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input"
            required
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input"
            required
          ></input>
          {error && (
            <p>Неверный email или пароль</p>
          )}
          <button type="submit" className="button" onClick={(event) => submitHandle(event)}>
            Войти
          </button>
        </form>
      </div>
      </div>
    )
    else{
        return (<Navigate to="/"></Navigate>)
    }
}

