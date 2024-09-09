import express from "express";
import multer from "multer";
import path from "path";

// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 파일이 저장될 폴더
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadRouter = express.Router();

// 파일 업로드 엔드포인트
uploadRouter.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: "파일이 없습니다." });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ ok: true, fileUrl });
});
