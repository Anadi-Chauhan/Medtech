import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear the session (if using sessions) or JWT token here
    const response = NextResponse.json({ message: 'Logged out successfully' });
    

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}
