import React from 'react';
import RegistrationModel from '../_components/registrationModel';
import AdminLayout from '../_layout/adminLayout';

const page = () => {
  return (
    <AdminLayout>
      <div className="flex h-screen flex-col items-center justify-center p-24">
        <RegistrationModel type={'Admin'} />
      </div>
    </AdminLayout>
  );
};

export default page;
