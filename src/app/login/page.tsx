// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    clearError();
    
    const success = await login(email, password);
    
    if (success) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-soft p-10 mx-4">
        
        {/* RevoShop Logo - Monochrome */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            RevoShop
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(typingEvent) => setEmail(typingEvent.target.value)}
              placeholder="e.g. john@mail.com"
              required
              className="w-full px-5 py-3 rounded-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(typingEvent) => setPassword(typingEvent.target.value)}
              placeholder="your password here.."
              required
              className="w-full px-5 py-3 rounded-full border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Submit Button - Monochrome */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>

        </form>

        {/* Test Credentials Hint */}
        <p className="mt-8 text-xs text-center text-gray-400">
          Use any email & password from{' '}
          <a 
            href="https://fakeapi.platzi.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 transition-colors"
          >
            fakeapi.platzi.com
          </a>
        </p>
      </div>
    </div>
  );
}