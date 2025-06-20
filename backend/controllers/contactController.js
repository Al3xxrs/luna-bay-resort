import { sendContactEmail } from "../utils/sendEmail.js";

export const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    // Check if all required fields are present and not empty
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Send the contact email
        await sendContactEmail({ name, email, message });
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (err) {
        // Log the error and send a generic error response
        console.error("Error sending email:", err);
        res.status(500).json({ error: "Failed to send message." });
    }
};
