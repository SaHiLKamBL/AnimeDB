// app/api/users/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbconnect'
import UserModel from '@/model/User'

export async function GET(request: Request) {
  await dbConnect()
  
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  try {
    const user = await UserModel.findOne({ email }).lean()
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    
    return NextResponse.json({
      ...user,
      _id: user._id.toString()
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}