
import { welcomForm } from '../../shared/assets/htmlForms';
import { transporter, mailOptions } from '../config/emailConfig';

export const sendEmail = {
    welcomEmail(name, code) {
        const type = welcomForm(name, code);
        transporter.sendMail(mailOptions(type), function (err, data) {
            if (err) {
                throw new Error('Got an error to send Email');
            } else {
                // console.log("Email sent successfully");
            }
        });
    },

};
