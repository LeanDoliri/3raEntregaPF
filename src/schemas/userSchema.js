import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  edad: { type: Number, required: true },
  telefono: { type: Number, required: true },
  foto: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model('users', userSchema);