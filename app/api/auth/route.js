import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User'; // Adjust the path as necessary

// Connect to MongoDB
async function connectToMongoDB() {
  if (!mongoose.connection.readyState) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Database connection failed');
    }
  }
}

// POST request handler for login
export async function POST(request) {
  try {
    await connectToMongoDB();

    const { registrationID, mobile } = await request.json();

    // Find user by registration ID and mobile
    const user = await User.findOne({ mobile, registrationID });
    console.log({ registrationID, mobile });


    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Check if user is verified (if applicable)
    // if (!user.isVerified) {
    //   return NextResponse.json({ message: 'User not verified' }, { status: 403 });
    // }

    // Here, you can set a session or token for the logged-in user
    // For example, using JWT or a session cookie
    return NextResponse.json({ user }, { status: 200 });
    

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
