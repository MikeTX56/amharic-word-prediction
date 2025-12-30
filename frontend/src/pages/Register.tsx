import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import RegisterForm from '@/components/auth/RegisterForm';

export const Register: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-12">
        <RegisterForm />
      </div>
    </MainLayout>
  );
};

export default Register;
