import mongoose, { Document, Schema } from "mongoose";

interface ElectionParticipant {
  user: mongoose.Types.ObjectId;
  voteCount: number;
  symbol: string;
  signatureQuote: string;
}

export interface ElectionTypes extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  image: string;
  house: House;
  participants: ElectionParticipant[];
  startDate: Date;
  endDate: Date;
}

const electionSchema = new Schema<ElectionTypes>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    house: {
      type: String,
      enum: ["Unity", "Faith", "Discipline", "Tolerance", "Headboy"],
      required: true,
    },
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        voteCount: { type: Number, default: 0, min: 0 },
        symbol: { type: String, required: true, trim: true },
        signatureQuote: { type: String, required: true, trim: true },
      },
    ],
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value > new Date(); // Ensure startDate is in the future
        },
        message: "Start date must be in the future.",
      },
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return this.startDate < value;
        },
        message: "End date must be after the start date",
      },
    },
  },
  { timestamps: true }
);

// Create and export the Election model
const Election =
  mongoose.models.Election ||
  mongoose.model<ElectionTypes>("Election", electionSchema);

export default Election;
