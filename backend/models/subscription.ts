import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface ISubscription extends Document {
  userId: Types.ObjectId;
  movies: String[]; // New field for userId
}

const subscriptionSchema: Schema<ISubscription> = new mongoose.Schema(
  {
    movies: {
      type: [String],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Replace 'User' with the actual model name for the user
    },
  },
  { timestamps: true }
);

const Subscription: Model<ISubscription> = mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', subscriptionSchema, 'Subscription');

export default Subscription;
