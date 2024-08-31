'use client';
import React, { useState } from 'react';
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
import { toast } from 'sonner';

const RegistrationModel = (props) => {
  const { type } = props;
  const urlType = type.toLowerCase();

  const [inputType, setInputType] = useState(true);
  const [fieldData, setFieldData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    role: type,
  });

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
      const { data, error } = await supabase.auth.signUp({
        email: fieldData.emailId,
        password: fieldData.password,
        options: {
          data: {
            first_name: fieldData.firstName,
            last_name: fieldData.lastName,
            role: fieldData.role,
          },
        },
      });
      if (error) {
        toast(error.message);
      } else if (data) {
        toast('Check your mail for confirmation link');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Card className="w-2/5 ">
      <form action="" onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{type} Registration Form</CardTitle>
          <CardDescription className="pt-2">
            Please enter your Email ID and password to complete the registration
            process.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleInputFields}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleInputFields}
                required
              />
            </div>
          </div>
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
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              >
                Create an account
              </button>

              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?
                <Link href={`/${urlType}/login`}>
                  <span className="text-gray-700 underline">Log in</span>
                </Link>
              </p>
            </div>

            <div className="pt-2">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our
                <a href="#" className="text-gray-700 underline">
                  {' '}
                  terms and conditions{' '}
                </a>
                and
                <a href="#" className="text-gray-700 underline">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegistrationModel;
