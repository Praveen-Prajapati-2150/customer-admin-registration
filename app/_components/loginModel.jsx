'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { supabase } from '../client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import Router from 'next/router';

const LoginModel = (props) => {
  const { type, getToken } = props;
  const urlType = type.toLowerCase();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    user,
    token: token_,
    loading,
    error,
  } = useSelector((state) => state.user);

  const [inputType, setInputType] = useState(true);
  const [fieldData, setFieldData] = useState({
    emailId: '',
    password: '',
    role: type,
  });
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token_) {
      setToken(token_);
      getToken(token_);
      // sessionStorage.setItem('token', JSON.stringify(token_));
    }
    console.log(token_);
  }, [token_]);

  const handleInputFields = (e) => {
    const { name, value } = e?.target;
    setFieldData({ ...fieldData, [name]: value });
  };

  const handleType = () => {
    setInputType(!inputType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.values(fieldData).forEach((value, index) => {
      if (value.trim() === '') {
        toast('Please fill all fields');
      }
    });

    try {
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email: fieldData.emailId,
      //   password: fieldData.password,
      // });

      const result = await dispatch(
        loginUser({
          data: {
            email: fieldData.emailId,
            password: fieldData.password,
          },
        })
      );
      if (loginUser.fulfilled.match(result)) {
        toast('Login Successfully');
        const { id, first_name, last_name, role } = result.payload.user;
        router.push({
          pathname: `/${type}/login`,
          query: { id, first_name, last_name, role },
        });
      }

      // if (data.session.access_token) {
      // sessionStorage.setItem(
      //   'token',
      //   JSON.stringify(data.session.access_token)
      // );
      // setToken(data.session.access_token);
      // getToken(data.session.access_token);
      // }

      if (error) {
        toast(error.message);
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      // alert(error);
    }
  };

  return (
    <Card className="w-2/5 ">
      <form action="" onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{type} Sign In</CardTitle>
          <CardDescription className="pt-2">
            Please enter your Email ID and password to complete the Sign In
            process.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-id">Email ID</Label>
            <Input
              type="email"
              id="email-id"
              placeholder="Enter your Email ID"
              name="emailId"
              onChange={handleInputFields}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type={inputType ? 'password' : 'text'}
              id="password"
              placeholder="Enter your Password"
              name="password"
              onChange={handleInputFields}
              required
            />
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox id="terms" onCheckedChange={handleType} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show Password
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col">
            <div className="flex justify-between pt-2 sm:flex sm:items-center sm:gap-4">
              <button
                type="submit"
                className="inline-block shrink-0 rounded-md border border-green-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              >
                Sign In
              </button>

              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Don't have an account?{' '}
                <Link href={`/`}>
                  <span className="text-gray-700 underline">Register</span>
                </Link>
              </p>
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginModel;
