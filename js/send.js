
// async..await is not allowed in global scope, must use a wrapper
exports.sendMail = async function sendEmail(user) {
  const nodemailer = require('nodemailer');
  

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${user.userName} <${user.userEmail}>`, // sender address
    to: process.env.EMAIL, // list of receivers
    subject: `${user.messageType}`, // Subject line
    text: `${user.userText} \n Email отправителя: ${user.userEmail}`, // plain text body
    html: `<p>${user.userText}</p><br><p>Email отправителя: <a>${user.userEmail}</a></p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  
 

  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
}



