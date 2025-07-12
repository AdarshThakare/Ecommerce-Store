import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendMail = async (subject: string, receiver: string, body: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  } as SMTPTransport.Options);
  const options = {
    from: `"Adarsh Thakare <${process.env.NODEMAILER_EMAIL}>"`,
    to: receiver,
    subject: subject,
    html: body,
  };

  try {
    await transporter.sendMail(options);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message:
        typeof err === "object" && err !== null && "message" in err
          ? (err as { message: string }).message
          : String(err),
    };
  }
};

export default sendMail;
