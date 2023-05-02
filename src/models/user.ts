import mongoose from "mongoose";
const { Schema } = mongoose;
import { User } from "types/user";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  about: {
    type: String,
    required: true,
    min: 2,
    max: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
});

// export const userSchema = new Schema<User>({
//     subject: {
//         type: String,
//         required: [true, 'googleId is required'],
//         unique: true,
//         index: true
//     },
//     name: String,
//     refreshToken: String,
//     preferences: { required: true, type: preferencesSchema },
//     scheduleDataArray: {
//         required: false,
//         type: [scheduleDataSchema]
//     },
//     subscription: {
//         required: false,
//         type: subscriptionSchema,
//         default: undefined
//     },
//     notificationPermission: {
//         required: true,
//         type: Boolean
//     }
// });

export default mongoose.model<User>("user", userSchema);
