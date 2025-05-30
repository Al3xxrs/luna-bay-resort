import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password (not your email password)
    },
});

export async function sendConfirmationEmail(to, name, details) {
    const mailOptions = {
        from: `"Luna Bay Resort" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Your Booking Confirmation – Luna Bay Resort",
        html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for booking with us! Here are your reservation details:</p>
      <ul>
        <li><strong>Room:</strong> ${details.roomName}</li>
        <li><strong>Check-in:</strong> ${details.checkIn}</li>
        <li><strong>Check-out:</strong> ${details.checkOut}</li>
        <li><strong>Guests:</strong> ${details.guests}</li>
        <li><strong>Total Price:</strong> $${details.totalPrice.toLocaleString()}</li>
      </ul>
      <p>We look forward to hosting you!</p>
      <p><em>Luna Bay Resort</em></p>
    `,
    };

    await transporter.sendMail(mailOptions);
}
