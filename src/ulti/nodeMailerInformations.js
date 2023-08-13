const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (user, leave, salary, payRolls) => {
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
       to: user.email, // list of receivers
       subject: `Employee information ${user.name}`, // Subject line
       html: `<html lang="en">
       <head>
         <meta charset="utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
         <style>
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }
         </style>
       </head>
       <body>
            <h3>Salary Information</h3>
            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Work Day</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${salary.userID}</td>
                        <td>${salary.month}</td>
                        <td>${salary.year}</td>
                        <td>${salary.workDay}</td>
                        <td>${salary.salary}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Remaining permission of the employee</h3>
            <table>
                <thead class="thead-dark">
                    <tr>
                        <th>UserID</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Existence spells</th>
                        <th>Status</th>
                        <th>Used</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${leave.userID}</td>
                        <td>${leave.month}</td>
                        <td>${leave.year}</td>
                        <td>${leave.leaveOfMonth}</td>
                        <td>${leave.status}</td>
                        <td>${leave.used}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Timesheets</h3>
            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Day</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Work Day</th>
                    </tr>
                </thead>
                <tbody>
                    ${payRolls}
                </tbody>
            </table>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
       </body>
     </html>`, // html body
   });
};
module.exports = sendMail;