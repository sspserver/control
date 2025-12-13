'use client';

import useRegisterForm from '@components/pages/RegisterPage/useRegisterForm';
import { ButtonLoading } from '@tailus-ui/Button';
import Input from '@tailus-ui/Input/Input';
import Textarea from '@tailus-ui/Textarea';
import { Link } from '@tailus-ui/typography';
import { Fragment } from 'react';

function RegisterForm() {
  const {
    isLoading,
    formData,
    error,
    submitRegisterFormHandler,
    changeFormInputHandler,
  } = useRegisterForm();

  return (
    <Fragment>
      <form
        onSubmit={submitRegisterFormHandler}
        className="mx-auto mt-8 space-y-6"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2.5">
              <Input
                fancy
                label="Email (Username)"
                id="username"
                name="username"
                type="email"
                value={formData.username}
                onChange={changeFormInputHandler}
                required
                size="md"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2.5">
              <Input
                fancy
                label="Password"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={changeFormInputHandler}
                required
                size="md"
                placeholder="Enter your password"
              />
            </div>

            <div className="space-y-2.5">
              <Input
                fancy
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={changeFormInputHandler}
                required
                size="md"
                placeholder="Confirm your password"
              />
            </div>

            <div className="space-y-2.5">
              <Input
                fancy
                label="Account Title"
                id="accountTitle"
                name="accountTitle"
                type="text"
                value={formData.accountTitle}
                onChange={changeFormInputHandler}
                required
                size="md"
                placeholder="Enter account title"
              />
            </div>

            <div className="space-y-2.5">
              <label htmlFor="accountDescription" className="block text-sm font-medium">
                Account Description
              </label>
              <Textarea
                id="accountDescription"
                name="accountDescription"
                value={formData.accountDescription}
                onChange={changeFormInputHandler}
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="Enter account description"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm pt-1">{error}</div>
          )}
        </div>

        <ButtonLoading
          loading={isLoading}
          className="w-full"
        >
          Create Account
        </ButtonLoading>

        <div className="text-center text-sm">
          Already have an account?
          {' '}
          <Link href="/auth/signin" size="sm">
            Sign In
          </Link>
        </div>
      </form>
    </Fragment>
  );
}

export default RegisterForm;
