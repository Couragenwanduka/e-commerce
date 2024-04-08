import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env file
dotenv.config();

// Create transporter with SMTP details
const transporter = nodemailer.createTransport({
    host: process.env.smtpHost,
    port: process.env.smtpPort,
    secure: true,
    auth: {
        user: process.env.smtpUsername,
        pass: process.env.smtpPassword,
    },
});

// Function to send email with OTP
export const sendMail = async (otp, email) => {
    try {
        // Read HTML template file
        const htmlTemplate = await fs.promises.readFile(path.join(__dirname, '../helper', 'mail.html'), 'utf-8');
        

        // Replace placeholder {{OTP}} with actual OTP value
        const formattedHtml = htmlTemplate.replace('{{OTP}}', otp);

        // Send email
        const info = await transporter.sendMail({
            from: process.env.smtpUsername, // Sender address
            to: email, // Receiver address
            subject: "MarketMate OTP", // Subject line
            html: formattedHtml, // HTML body
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("An error occurred while sending the email: " + error);
    }
};

export const sendWelcomeMail = async (email,name) => {
    try {
        // Read HTML template file
        const htmlTemplate = await fs.promises.readFile(path.join(__dirname, '../helper', 'welcomeemail.html'), 'utf-8');
        

        // Replace placeholder {{OTP}} with actual OTP value
        const formattedHtml = htmlTemplate.replace('{{name}}', name);

        // Send email
        const info = await transporter.sendMail({
            from: process.env.smtpUsername, // Sender address
            to: email, // Receiver address
            subject: "MarketMate OTP", // Subject line
            html: formattedHtml, // HTML body
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("An error occurred while sending the email: " + error);
    }
};
