'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Welcome from '../_components/Welcome';
import { supabase } from '../client';
import { useSelector } from 'react-redux';

const AdminLayout = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const {
    user,
    token: token_,
    loading,
    error,
  } = useSelector((state) => state.user);

  const getUserDetails = async (token) => {
    try {
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser(token);
      // setUserData(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = sessionStorage.getItem('token');
      setToken(data);
    }
  }, []);

  useEffect(() => {
    if (token_) {
      setToken(token_);
    }
  }, [token_]);

  useEffect(() => {
    if (token) {
      getUserDetails(token);
    }
  }, [token]);

  useEffect(() => {
    if (userData && userData?.user_metadata?.role === 'Customer') {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
      } else {
        router.push('/');
      }
    }
  }, [countdown, router, userData]);

  console.log(userData);
  
  if (!userData || userData?.user_metadata?.role === 'Admin') {
    return <>{children}</>;
  }

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center p-24 ">
        <h3 className="text-xl font-bold text-gray-900 sm:text-xl">
          Your role does not allowed you to login from here
        </h3>
        <h1 className="text-sm pt-4 font-bold text-gray-600 sm:text-sm">
          Redirecting in {countdown} seconds...
        </h1>
        <p className="text-sm font-bold text-gray-600 sm:text-sm">
          You will be redirected to Home Page shortly.
        </p>
      </div>
    </div>
  );
};

export default AdminLayout;
