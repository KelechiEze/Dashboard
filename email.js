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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #007BFF;">Welcome to PayCoin!</h2>
        <p>Thank you for joining <strong>PayCoin</strong>. Your account is now active!</p>
        <p><a href="https://dashboardkrypt.netlify.app/" style="background: #007BFF; color: #fff; padding: 10px 15px; text-decoration: none;">Go to Dashboard</a></p>
        <p>If you did not sign up, please ignore this email.</p>
        <p>&copy; 2025 PayCoin. All Rights Reserved.</p>
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
