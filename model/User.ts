import mongoose from 'mongoose'
import { Schema, Model,Document } from 'mongoose';


interface User extends Document{
    username:string,
    email:string,
    password:string,
    favouirate?:string[]|null,
    visited?:string[]|null
}

let UserSchema=new Schema<User>({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    favouirate:{
        type:[String],
        default:null,
    },
    visited:{
        type:[String],
        default:null,
    }
})

const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>("Users", UserSchema);

export default UserModel;
