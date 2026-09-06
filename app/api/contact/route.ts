import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Standard Schema definition para hindi maguluhan ang compiler mo
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error("❌ MONGODB_URI is undefined!");
      return NextResponse.json({ success: false, error: "Database URI is missing!" }, { status: 500 });
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
      console.log("🔌 Connected to MongoDB Atlas!");
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    console.log("💾 Message saved!");

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
