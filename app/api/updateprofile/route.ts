import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import UserModel,{ IUser } from '@/model/User'; // Make sure to import IUser
import { Types } from 'mongoose';

export async function POST(req: Request) {
  const body = await req.json();


  const { userId, image, aboutme, favouriteGenres, favouriteAnime } = body;

  if (!userId) {
    return NextResponse.json({ message: 'User ID missing' }, { status: 400 });
  }

  await dbConnect();

  try {
    // Convert string ID to ObjectId explicitly
    const objectId = new Types.ObjectId(userId);
    
    // Update all fields regardless of their values
    const updatedUser = await UserModel.findByIdAndUpdate(
      objectId,
      {
        $set: {
          image: image ?? null,
          aboutme: aboutme ?? null,
          favouriteGenres: favouriteGenres ?? [],
          favouriteAnime: favouriteAnime ?? []
        }
      },
      { new: true }
    ).lean(); // Add .lean() to get a plain JavaScript object

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Type assertion for the _id field
    const userWithStringId = {
      ...updatedUser,
      id: updatedUser._id.toString()
    };

    console.log("UPDATED USER:", userWithStringId);
    return NextResponse.json({ 
      message: 'Profile updated successfully',
      user: userWithStringId
    }, { status: 200 });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json({ 
      message: 'Error updating profile',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}