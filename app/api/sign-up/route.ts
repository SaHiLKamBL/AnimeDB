import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password, username } = await request.json();

    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering User",
      },
      { status: 500 }
    );
  }
}
