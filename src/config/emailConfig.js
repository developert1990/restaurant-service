import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
});

// to do : need to set valiable on 'to' and 'subject'
export const mailOptions = (type) => {
    return {
        from: 'info.sangmean@gmail.com',
        to: 'sangmean.hong@gmail.com',
        subject: 'Nodemailer Test Hong',
        html: type,
    };
};
