const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (otp) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 587,
       secure: false, // true for 465, false for other ports
       auth: {
           user: process.env.EMAIL_FORGOT_PASSWORD, // generated ethereal user
           pass: process.env.PASSWORD_FORGOT_PASSWORD, // generated ethereal password
       },
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
       from: '"Đình Đăng 👻" <no-reply@gmail.com>', // sender address
       to: otp.email, // list of receivers
       subject: "GET OTP", // Subject line
       html: `<h3>Mã OTP của bạn là: ${otp.otpToken}</h3>`, // html body
   });
};
module.exports = sendMail;