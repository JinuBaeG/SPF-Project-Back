import { Request, Response } from "express";
import axios from "axios";
import CryptoJS from "crypto-js";

export const sendSMS = (req: Request, res: Response) => {
  const phNumber = req.query.number as string;
  let crtNumber = "";

  for (let i = 0; i < 4; i++) {
    crtNumber += Math.floor(Math.random() * 10);
  }

  const date = Date.now().toString();
  const signature = makeSignature();

  axios({
    method: "POST",
    url: `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.NAVER_SMS_SERVICE_ID}/messages`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-ncp-iam-access-key": process.env.NAVER_API_ACCESS_KEY!,
      "x-ncp-apigw-timestamp": date,
      "x-ncp-apigw-signature-v2": signature,
    },
    data: {
      type: "SMS",
      countryCode: "82",
      from: process.env.NAVER_SMS_PHONE_NUMBER!,
      content: `인증번호: [${crtNumber}]`,
      messages: [{ to: phNumber }],
    },
  })
    .then((response) => {
      res.status(200).json({ crtNumber });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "SMS 전송 실패" });
    });
};

const makeSignature = (): string => {
  const space = " "; // one space
  const newLine = "\n"; // new line
  const method = "POST"; // method
  const url = `/sms/v2/services/${process.env.NAVER_SMS_SERVICE_ID}/messages`;
  const timestamp = Date.now().toString(); // current timestamp (epoch)
  const accessKey = process.env.NAVER_API_ACCESS_KEY!; // access key id
  const secretKey = process.env.NAVER_API_ACCESS_SECRET_KEY!; // secret key

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();
  return hash.toString(CryptoJS.enc.Base64);
};
