import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  product: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

export default mongoose.model("products", productSchema);
