
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bycrpt from "bcryptjs";



export async function POST(request:Request){
     await dbConnect();

     try{
        const {email, password, username} = await request.json();
       let user = await UserModel.findOne({email});
       if(user){
        return Response.json({
            success:false,
            message:"User already exists",
        })
          
       }
       const hashedPassword = await bycrpt.hash(password, 10);
        const newUser=new UserModel({
            email,
            password:hashedPassword,
            username,
        })
        await newUser.save();
        return Response.json({
      success: true,
      message: "User registered successfully",
    },{
        status:201
    }
);
          
     }catch(error){
       
        return Response.json({
            success:false,
            message:"Error registering User",
        },
    {
  status:500
    })

     }


}
