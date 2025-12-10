import type { NextRequest } from 'next/server';
import { resetUserPassword } from '@lib/api/resetUserPassword';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 },
      );
    }

    const { status, message, errors } = await resetUserPassword(email);

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
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
