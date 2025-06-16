import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Send booking confirmation email to guest
 */
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
        <li><strong>Total Price:</strong> $${Number(details.totalPrice).toLocaleString()}</li>
      </ul>
      <p>We look forward to hosting you!</p>
      <p><em>Luna Bay Resort</em></p>
    `,
    };

    await transporter.sendMail(mailOptions);
}

/**
 * Handle contact form submissions
 */
export const sendContactEmail = async ({ name, email, message }) => {
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: "al3xx.main1@gmail.com", // You can make this an env variable too
        subject: "New Contact Message from Website",
        html: `
      <h2>New Message from Contact Form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};
