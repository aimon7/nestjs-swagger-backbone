import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    /**
     * Verify connection configuration of nodemailer
     */
    async verifyEmailConnectionConfiguration(): Promise<string> {
        return await smtpTransport.verify((error: Error | null, success: true) => {
            if (error) {
                console.log(`Connection error: ${error.message}`)
                console.log(error);
                return error.message;
            } else {
                console.log(success);
                console.log(`Server is ready to take our messages`);
                return `Server is ready to take our messages`;
            }
        });
    }

    /**
     * Send a test email, in the email provided
     *
     * @param email
     */
    async sendTestEmail(email: string): Promise<string | void> {
        const mailOptions = {
            from: process.env.NODEMAILER_AUTH_USER,
            to: email,
            subject: 'Test email',
            html:
                `Test email<br> for testing purposes`,
        };

        return smtpTransport.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
            if (error) {
                console.log(`Message didnt sent with error: ${error.message}`);
                // do we need to throw an Exception???
                throw new HttpException(`Email didn't send`, HttpStatus.SERVICE_UNAVAILABLE);
            } else {
                const result = `Message sent: ${info.messageId}`;
                console.log(result);
                return result;
            }
        });
    }
}


const smtpTransport = nodemailer.createTransport({
    host: process.env.NODEMAILER_SENDER,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASWORD,
    },
    tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
    }
})