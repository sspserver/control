import type { NextRequest } from 'next/server';
import { registerAccount } from '@lib/api/registerAccount';
import { NextResponse } from 'next/server';

// Simple in-process rate limiter: max 5 registrations per IP per hour.
// Replace with a Redis-backed store in a multi-replica deployment.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) {
    return true;
  }
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    ?? request.headers.get('x-real-ip')
    ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }
  try {
    const body = await request.json();
    const { username, password, accountTitle, accountDescription } = body;

    if (!username || !password || !accountTitle) {
      return NextResponse.json(
        {
          success: false,
          error: 'Username, password, and account title are required',
        },
        { status: 400 },
      );
    }

    const { status, message, errors, data } = await registerAccount({
      username,
      password,
      accountTitle,
      accountDescription: accountDescription || '',
    });

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          error: message,
          errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message,
      data,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
