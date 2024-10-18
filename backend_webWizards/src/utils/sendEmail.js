import nodemailer from 'nodemailer'

const sendEmail = function (to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: "webwizards24@gmail.com",
    to,
    subject,
    text
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) return console.log(err);
    console.log(info);
  });
};


