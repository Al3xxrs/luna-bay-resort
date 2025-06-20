import nodemailer from "nodemailer";

// Create a reusable transporter instance
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Helper function to generate HTML email template
function generateEmailTemplate(name, details) {
    return `
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
  `;
}

/**
 * Send booking confirmation email to guest
 */
export async function sendConfirmationEmail(to, name, details) {
    if (!to || !/\S+@\S+\.\S+/.test(to)) {
        console.warn("Invalid or missing email:", to);
        return;
    }

    const mailOptions = {
        from: `"Luna Bay Resort" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Your Booking Confirmation – Luna Bay Resort",
        text: `Hello ${name},\n\nThank you for booking at Luna Bay Resort.\n\nDetails:\n- Room: ${details.roomName}\n- Check-in: ${details.checkIn}\n- Check-out: ${details.checkOut}\n- Guests: ${details.guests}\n- Total Price: $${details.totalPrice}\n\nWe look forward to hosting you!\n\nLuna Bay Resort`,
        html: generateEmailTemplate(name, details),
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Confirmation email sent to ${to}`);
    } catch (err) {
        console.error(`❌ Failed to send confirmation email to ${to}:`, err.message);
    }
}

/**
 * Handle contact form submissions
 */
export const sendContactEmail = async ({ name, email, message }) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        console.warn("Invalid or missing sender email:", email);
        return;
    }

    const mailOptions = {
        from: `"${name || "Anonymous"}" <${email}>`,
        to: process.env.EMAIL_USER || "al3xx.main1@gmail.com",
        subject: "New Contact Message from Website",
        text: `
New message from contact form

Name: ${name || "Anonymous"}
Email: ${email}
Message:
${message}
      `,
        html: `
    <h2>New Message from Contact Form</h2>
    <p><strong>Name:</strong> ${name || "Anonymous"}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong><br/>${message ? message.replace(/\n/g, "<br/>") : ""}</p>
  `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Contact form message sent from ${email}`);
    } catch (err) {
        console.error(`❌ Failed to send contact email from ${email}:`, err.message);
    }
};
