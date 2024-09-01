'use client';
import LoginModel from '@/app/_components/loginModel';
import React, { useEffect, useState } from 'react';
import Welcome from '@/app/_components/Welcome';
import AdminLayout from '@/app/_layout/adminLayout';

const page = () => {
  const [token, setToken] = useState(null);

  const getToken = (token_) => {
    setToken(token_);
  };

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, []);

  return (
    <AdminLayout>
      <div className="flex h-screen flex-col items-center justify-center p-24">
        {token ? (
          <Welcome role={'Admin'} setToken={setToken} />
        ) : (
          <LoginModel getToken={getToken} type={'Admin'} />
        )}
      </div>
    </AdminLayout>
  );
};

export default page;
