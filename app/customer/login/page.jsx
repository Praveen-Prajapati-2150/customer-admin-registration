'use client';
import React, { useEffect, useState } from 'react';
import LoginModel from '../../_components/loginModel';
import Welcome from '@/app/_components/Welcome';
import { useSelector } from 'react-redux';

const page = () => {
  const [token, setToken] = useState(null);

  const {
    user,
    token: token_,
    loading,
    error,
  } = useSelector((state) => state.user);

  const getToken = (token_) => {
    // setToken(token_);
  };

  useEffect(() => {
    if (token_) {
      setToken(token_);
    }
  }, [token_]);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = sessionStorage.getItem('token');
      setToken(data);
    }
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-24">
      {token ? (
        <Welcome role={'Customer'} setToken={setToken} />
      ) : (
        <LoginModel getToken={getToken} type={'Customer'} />
      )}
    </div>
  );
};

export default page;
