import mailgen from "mailgen";
import nodemailer from "nodemailer";

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our project management app",
      action: {
        instructions: "To verify your email, click on this buton or link",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          url: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "we got a reqest to reset the password to your account",
      action: {
        instructions: "To reset your password, click on this buton or link",
        button: {
          color: "#22BC66",
          text: "Reset password",
          url: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

// sending the email------------------------------

const sendEmail = async (options) => {
  const mailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "PRoject management",
      link: "https://ptojectmanagelink.com",
    },
  });
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  var transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: 'mail.projectmanager@example.com',
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml
  };

  try {
    await transporter.sendMail(mail)
  } catch (error) {
    console.error('Email service failed siliently. Make sure that you have provided Mailtrap creadential in .env file');
    console.error("error", error)
  }
};

export { emailVerificationMailgenContent, forgotPasswordMailgenContent, sendEmail };
