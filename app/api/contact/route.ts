import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Resend } from "resend";

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string" ? body.email.trim() : "";

    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all fields.",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    const mongoUri = process.env.MONGODB_URI;
    const resendApiKey = process.env.RESEND_API_KEY;

    // Check MongoDB configuration
    if (!mongoUri) {
      console.error("MONGODB_URI is missing.");

      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error.",
        },
        { status: 500 }
      );
    }

    // Check Resend configuration
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing.");

      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error.",
        },
        { status: 500 }
      );
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB Atlas.");
    }

    // Save inquiry to MongoDB
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    console.log("Message saved to MongoDB.");

    // Escape user input before inserting into HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    // Send email notification
    // TEMPORARY TEST SETUP:
    // Resend currently only allows your account email as recipient.
    const { data, error: emailError } = await resend.emails.send({
      from: "STR Portfolio <onboarding@resend.dev>",
      to: ["tatxtsunode@gmail.com"],
      replyTo: email,
      subject: `New STR Portfolio Inquiry from ${name}`,
      html: `
        <div
          style="
            font-family: Arial, Helvetica, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: #f8f7f3;
            color: #222;
          "
        >
          <h1 style="margin: 0 0 24px; font-size: 24px;">
            New Portfolio Inquiry
          </h1>

          <div
            style="
              background: #ffffff;
              border: 1px solid #e5e1d8;
              border-radius: 10px;
              padding: 24px;
            "
          >
            <p>
              <strong>Name / Property</strong><br />
              ${safeName}
            </p>

            <p>
              <strong>Email</strong><br />
              ${safeEmail}
            </p>

            <p>
              <strong>Message</strong><br />
              ${safeMessage}
            </p>
          </div>

          <p
            style="
              margin-top: 24px;
              color: #777;
              font-size: 13px;
            "
          >
            Sent from your STR portfolio website.
          </p>
        </div>
      `,
    });

    console.log("Resend response:", {
      data,
      emailError,
    });

    // Email failed, but the message was already saved in MongoDB
    if (emailError) {
      console.error("Resend error:", emailError);

      return NextResponse.json(
        {
          success: true,
          warning: "Message saved, but email notification failed.",
        },
        { status: 201 }
      );
    }

    console.log("Email notification sent successfully.");

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}