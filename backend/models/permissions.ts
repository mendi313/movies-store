import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface IPermissions extends Document {
  userName: string;
  role: string;
  userId: Types.ObjectId; // New field for userId
}

const permissionSchema: Schema<IPermissions> = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Replace 'User' with the actual model name for the user
    },
  },
  { timestamps: true }
);

const Permissions: Model<IPermissions> = mongoose.models.Permissions || mongoose.model<IPermissions>('Permissions', permissionSchema, 'Permissions');

export default Permissions;
