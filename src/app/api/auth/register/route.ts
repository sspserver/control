import type { NextRequest } from 'next/server';
import { registerAccount } from '@lib/api/registerAccount';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
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
