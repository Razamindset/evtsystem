import mongoose, { Document, Schema } from "mongoose";

export type House = "Unity" | "Faith" | "Discipline" | "Tolerance" | "Headboy";

interface ElectionParticipant {
  cnic: string;
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
    // participants: [
    //   {
    //     cnic: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the Election model
const Election =
  mongoose.models.Election ||
  mongoose.model<ElectionTypes>("Election", electionSchema);

export default Election;
