import axios from "axios";
import CryptoJS from "crypto-js";
import { Request } from "express";
import { getUser as getUserUtil } from "./users/users.utils";

// 사용자 인증 토큰으로부터 사용자 정보를 가져오는 함수
export const getUser = async (token: string) => {
  return await getUserUtil(token);
};

// 네이버 SMS API 서명 생성
export const makeSignature = (): string => {
  const space = " ";
  const newLine = "\n";
  const method = "POST";
  const url = `/sms/v2/services/${process.env.NAVER_SMS_SERVICE_ID}/messages`;
  const timestamp = Date.now().toString();
  const accessKey = process.env.NAVER_API_ACCESS_KEY!;
  const secretKey = process.env.NAVER_API_ACCESS_SECRET_KEY!;

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  return hmac.finalize().toString(CryptoJS.enc.Base64);
};

// 요청에서 토큰을 추출하는 함수
export const getTokenFromRequest = (req: Request): string | null => {
  const token = req.headers.token as string;
  return token ? token : null;
};

// 네이버 맵 API 호출
export const fetchNaverMapsData = async (query: string) => {
  try {
    const response = await axios.get(
      "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode",
      {
        params: { query },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_MAPS_API_ID!,
          "X-NCP-APIGW-API-KEY": process.env.NAVER_MAPS_API_KEY!,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("네이버 맵 API 호출 오류:", error);
    throw new Error("네이버 맵 API 호출 실패");
  }
};
