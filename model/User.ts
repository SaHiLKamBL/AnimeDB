import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  image?: string | null;
  aboutme?: string | null;
  favouriteGenres?: string[];    // Note spelling and casing
  favouriteAnime?: string[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: null },
  aboutme: { type: String, default: null },
  favouriteGenres: { type: [String], default: [] },
  favouriteAnime: { type: [String], default: [] },
});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
