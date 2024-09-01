import mongoose from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Store name is required"],
    unique: true,
    minlength: [3, "Store name must be at least 3 characters long"],
    maxlength: [100, "Store name must be less than 100 characters long"],
  },
  lastEditor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Last editor is required"],
  },
  amount: {
    type: Number,
    default: 0,
    min: [0, "Amount cannot be negative"],
  },
  buyPrice: {
    type: Number,
    default: 0,
  },
  sellPrice: {
    type: Number,
    default: 0,
  },
  history: [
    {
      amount: {
        type: Number,
        required: true,
      },
      buyPrice: {
        type: Number,
        required: true,
      },
      sellPrice: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      editor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true,
      },
    },
  ],
});

storeSchema.set("timestamps", true);
storeSchema.plugin(mongooseAutopopulate);

export const Store = mongoose.model("Store", storeSchema);
