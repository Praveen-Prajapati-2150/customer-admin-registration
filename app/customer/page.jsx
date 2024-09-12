'use client';
import React from 'react';
import RegistrationModel from '../_components/registrationModel';
import LoginModel from '../_components/loginModel';
import Welcome from '../_components/Welcome';

const page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-24">
      <RegistrationModel type={'Customer'} />
    </div>
  );
};

export default page;
