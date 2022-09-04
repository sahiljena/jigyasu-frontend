import { useState,useEffect } from 'react';
import {Buffer} from 'buffer';
  // console.log(dtoken);

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());
  

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };


  const [userName, setUserName] = useState();

  const getUser = () =>{
    if(token){
      let str = token.split('.')[1];
      let buff = new Buffer(str, 'base64');
      let base64ToStringNew = JSON.parse(buff.toString('ascii'));
      return base64ToStringNew;
    }
    return;
  }

  useEffect(() => {
      setUserName(getUser());
  }, [token]);


  return {
    setToken: saveToken,
    token,
    userName,
  }
}