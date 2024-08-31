import React from 'react';
import RegistrationModel from '../_components/registrationModel';

const page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-24">
      <RegistrationModel type={'Admin'} />
    </div>
  );
};

export default page;
