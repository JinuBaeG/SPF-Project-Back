import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendEmail = (req: Request, res: Response) => {
  let crtNumber = "";

  for (let i = 0; i < 4; i++) {
    crtNumber += Math.floor(Math.random() * 10);
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_MAIL_ID!,
      pass: process.env.GOOGLE_PASS_KEY!,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_MAIL_ID!,
    to: req.query.email as string,
    subject: "본인 확인을 위한 메일 인증번호 입니다.",
    text: `인증번호: ${crtNumber}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "이메일 전송 실패" });
    } else {
      res.status(200).json({ crtNumber });
    }
  });
};
