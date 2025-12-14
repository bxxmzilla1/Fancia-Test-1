import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleIcon } from '../components/icons/Icons';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const logoUrl = 'https://github.com/bxxmzilla1/IGprofile/blob/main/fanciaga_logo.png?raw=true';

  const Input: React.FC<{ id: string; type: string; placeholder: string }> = ({ id, type, placeholder }) => (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
      required
    />
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4" style={{
        backgroundImage: 'radial-gradient(circle at top right, rgba(19, 78, 74, 0.2), transparent 40%), radial-gradient(circle at bottom left, rgba(19, 78, 74, 0.2), transparent 50%)',
    }}>
      <div className="text-center mb-8">
        <img src={logoUrl} alt="Fanciaga" className="h-20 mx-auto mb-6" />
        <h2 className="text-3xl font-bold tracking-tight">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="text-gray-400 mt-2">{isSignUp ? 'Join the exclusive creator community.' : 'Sign in to access your world.'}</p>
      </div>

      <div className="w-full max-w-md">
        <form className="space-y-4">
          {isSignUp && <Input id="name" type="text" placeholder="Full Name" />}
          <Input id="email" type="email" placeholder="Email Address" />
          <Input id="password" type="password" placeholder="Password" />
          {!isSignUp && (
            <div className="text-right">
              <a href="#" className="text-sm text-primary-500 hover:underline">Forgot Password?</a>
            </div>
          )}
          
          <Link to="/home" className="block w-full text-center px-4 py-3 bg-primary-600 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Link>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        <div>
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            <GoogleIcon className="w-6 h-6" />
            Continue with Google
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-semibold text-primary-500 hover:underline ml-2">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
