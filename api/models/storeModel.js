import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Store name is required"],
    unique: true,
    minlength: [3, "Store name must be at least 3 characters long"],
    maxlength: [100, "Store name must be less than 100 characters long"],
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
});

storeSchema.set("timestamps", true);

export const Store = mongoose.model("store", storeSchema);
