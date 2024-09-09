import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";
import * as crypto from "crypto";

export const getUser = async (token: string): Promise<null | Record<string, any>> => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY as string);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken["id"] },
      });
      return user || null;
    }
  } catch (e) {
    return null;
  }
  
  return null;
};

export function protectedResolver(ourResolver: Resolver) {
  return function (root: any, args: any, context: any, info: any) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action.",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}

export function cryptFunction(cryptoItem: string): string {
  const algorithm = "aes-256-cbc";
  const key = Buffer.from("abcdefghijklmnopqrstuvwxyz123456", "utf8");
  const iv = Buffer.from("1234567890123456", "utf8");

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let result = cipher.update(cryptoItem, "utf8", "base64");
  result += cipher.final("base64");

  return result;
}

export function deCryptFunction(deCryptItem: string): string {
  const algorithm = "aes-256-cbc";
  const key = Buffer.from("abcdefghijklmnopqrstuvwxyz123456", "utf8");
  const iv = Buffer.from("1234567890123456", "utf8");

  const deCipher = crypto.createDecipheriv(algorithm, key, iv);
  let result = deCipher.update(deCryptItem, "base64", "utf8");
  result += deCipher.final("utf8");

  return result;
}
