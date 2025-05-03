import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = true }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success;
      
      if (isLogin) {
        success = await login(email, password);
        if (success) {
          navigate('/');
        } else {
          setError('Invalid email or password');
        }
      } else {
        success = await signup(name, email, password);
        if (success) {
          navigate('/');
        } else {
          setError('Email already in use or registration failed');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Login to your account' : 'Create an account'}
      </h2>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
              required={!isLogin}
            />
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
            required
            minLength={6}
          />
          {!isLogin && (
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 6 characters
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-3 rounded-md font-medium hover:bg-pink-600 transition-colors disabled:bg-pink-300"
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          {' '}
          <a 
            href={isLogin ? "/signup" : "/login"} 
            className="text-pink-500 font-medium hover:underline"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;