'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Welcome from '../_components/Welcome';

const AuthLayout = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, []);

  console.log(token);

  return <div>{!token ? children : <Welcome setToken={setToken} />}</div>;
};

export default AuthLayout;
