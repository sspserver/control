'use client';

import { ButtonLoading } from '@tailus-ui/Button';
import Input from '@tailus-ui/Input/Input';
import { Caption, Link } from '@tailus-ui/typography';
import { useState } from 'react';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to send reset email');
        setIsLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto mt-8 space-y-6">
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          <p className="font-medium">Check your email</p>
          <p className="mt-2 text-sm">
            We've sent password reset instructions to
            {' '}
            <strong>{email}</strong>
          </p>
        </div>
        <div className="text-center">
          <Caption className="my-0" size="sm">
            Remember your password?
            {' '}
            <Link intent="neutral" size="sm" variant="underlined" href="/auth/signin">
              Back to Sign In
            </Link>
          </Caption>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 space-y-6">
      <div>
        <div className="space-y-4">
          <div className="space-y-2.5">
            <Input
              fancy
              label="Your email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              size="md"
              placeholder="example@example.com"
            />
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm pt-1">{error}</div>
        )}
      </div>
      <ButtonLoading loading={isLoading} className="w-full">
        Send
      </ButtonLoading>
      <div className="text-center">
        <Caption className="my-0" size="sm">
          Remember your password?
          {' '}
          <Link intent="neutral" size="sm" variant="underlined" href="/auth/signin">
            Back to Sign In
          </Link>
        </Caption>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
