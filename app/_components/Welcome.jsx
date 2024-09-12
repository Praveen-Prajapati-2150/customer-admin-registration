'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { supabase } from '../client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, logoutUser } from '../redux/userSlice';

const Welcome = (props) => {
  // const { role, setToken } = props;
  const { setToken } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const { id, first_name, last_name, role } = router.query || {};

  const {
    user,
    token: token_,
    loading,
    error,
  } = useSelector((state) => state.user);

  console.log(user, token_, first_name, last_name, role);

  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    // sessionStorage.removeItem('token');

    dispatch(logoutUser());
    setToken(null);
    router.push('/');
  };

  useEffect(() => {
    if (token_) {
      setToken(token_);
    }
  }, [user, token_]);

  const getUserDetails = async () => {
    try {
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser();
      // dispatch(fetchUserProfile('3'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to the World
              <strong className="font-extrabold text-red-700 sm:block">
                {' '}
                of {role} Portal.{' '}
              </strong>
            </h1>

            <a
              href="#"
              className="relative mt-8 block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
            >
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    {first_name} {last_name}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-600">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                    velit illum provident a, ipsa maiores deleniti consectetur
                    nobis et eaque.
                  </p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="size-16 rounded-lg object-cover shadow-sm"
                  />
                </div>
              </div>

              <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">
                    {userData?.user_metadata?.role}
                  </dt>
                  <dd className="text-xs text-gray-500">Role</dd>
                </div>

                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">
                    {userData?.user_metadata?.email}
                  </dt>
                  <dd className="text-xs text-gray-500">Email</dd>
                </div>
              </dl>
            </a>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
