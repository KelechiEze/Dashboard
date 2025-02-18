import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(bodyParser.json());

// Ensure required environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("Missing email credentials in environment variables");
  process.exit(1);
}

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST route to send confirmation emails
app.post("/api/sendConfirmationEmail", async (req, res) => {
  const { email, coupleEmail } = req.body;

  if (!email || !coupleEmail) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [email, coupleEmail],
    subject: "Welcome to PayCoin!",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #007BFF; padding: 20px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to PayCoin!</h1>
        </div>

        <div style="padding: 30px; color: #333;">
          <p style="font-size: 18px; line-height: 1.6;">Dear Valued User,</p>
          <p style="font-size: 16px; line-height: 1.6;">Thank you for registering with <strong>PayCoin</strong>. Your account has been successfully created!</p>
          
          <div style="padding: 15px; background-color: #f9f9f9; border-left: 5px solid #007BFF; margin: 20px 0;">
            <p style="margin: 0; font-size: 16px;">Here are your account details:</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Password:</strong> ${password}</p>
          </div>

          <p style="font-size: 16px; line-height: 1.6;">We’re excited to have you on board and help you achieve your financial goals with PayCoin.</p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="https://dashboardkrypt.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style="padding: 10px 20px; color: #ffffff; background-color: #007BFF; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Visit Your Dashboard
            </a>
          </div>
        </div>

        <div style="background-color: #007BFF; padding: 15px; text-align: center; color: #ffffff; font-size: 14px;">
          <p style="margin: 0;">&copy; 2025 PayCoin. All Rights Reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to: ${email}, ${coupleEmail}`);
    res.status(200).json({ message: "Confirmation emails sent successfully!" });
  } catch (error) {
    console.error("Email error:", error.response || error);
    res.status(500).json({ error: "Failed to send confirmation emails." });
  }
});

// Home route (for testing)
app.get("/", (req, res) => {
  res.send("PayCoin Email Service is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
