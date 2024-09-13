import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { client, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{ email }];

    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "You are awesome!",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Integration Test",
        });
        console.log("Email send successfully", response);
    } catch (error) {
        console.log("Error  sending verification", error);
        throw new Error(`Error sending email: ${error}`);
    }
};