import React from 'react';
import AuthForm from '../components/Auth/AuthForm';

const SignupPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <AuthForm isLogin={false} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;