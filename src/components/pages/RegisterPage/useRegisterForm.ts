import type React from 'react';
import type { RegisterFormData } from './RegisterForm.types';
import { useToastProviderContext } from '@components/Toast';
import { CheckCircleIcon, ShieldExclamationIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { createElement, useState } from 'react';

const defaultRegisterFormData: RegisterFormData = {
  username: '',
  password: '',
  confirmPassword: '',
  accountTitle: '',
  accountDescription: '',
};

function useRegisterForm() {
  const { showToast } = useToastProviderContext();
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>(defaultRegisterFormData);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const changeFormInputHandler = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    setError(null);

    setFormData(state => ({
      ...state,
      [name]: value,
    }));
  };
  const submitRegisterFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          accountTitle: formData.accountTitle,
          accountDescription: formData.accountDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to create account');
        setIsLoading(false);
        return;
      }

      showToast({
        title: 'Registration successful',
        description: 'Your account has been created successfully. Please sign in.',
        icon: createElement(CheckCircleIcon, { className: 'w-4 h-4 text-success-600' }),
      });

      router.push('/auth/signin');
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred');
      showToast({
        title: 'Registration failed',
        description: 'Something went wrong. Please try again later.',
        icon: createElement(ShieldExclamationIcon, { className: 'w-4 h-4 text-danger-600' }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    formData,
    error,
    submitRegisterFormHandler,
    changeFormInputHandler,
  };
}

export default useRegisterForm;
