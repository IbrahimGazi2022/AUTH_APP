import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { client, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    console.log("Email:", email);
    const recipients = [{ email }];

    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email) => {
    const recipients = [{ email }];

    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            template_uuid: "3e35abf3-480e-4489-95d8-b5b959450a05",
            template_variables: {
                "company_info_name": "Test_Company_info_name",
                "company_info_address": "Test_Company_info_address",
                "company_info_city": "Test_Company_info_city",
                "company_info_zip_code": "Test_Company_info_zip_code",
                "company_info_country": "Test_Company_info_country"
            }
        });
        console.log("Welcome Email send successfully", response);
    } catch (error) {
        console.log("Error  sending verification", error);
        throw new Error(`Error sending email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipients = [{ email }];
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
        console.log("Password Reset Email send successfully", response);
    } catch (error) {
        console.log("Error  sending verification", error);
        throw new Error(`Error sending email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    const recipients = [{ email }];

    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });

        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset success email`, error);

        throw new Error(`Error sending password reset success email: ${error}`);
    }
};