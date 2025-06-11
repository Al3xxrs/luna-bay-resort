import { sendContactEmail } from "../utils/sendEmail.js";

export const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        await sendContactEmail({ name, email, message });
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (err) {
        console.error("Email send error:", err);
        res.status(500).json({ error: "Failed to send message." });
    }
};
