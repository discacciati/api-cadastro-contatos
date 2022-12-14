import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

function VerifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const splitToken = token.split(" ");

  jwt.verify(splitToken[1], "SECRET_KEY", (error: any, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.user = {
      id: decoded.id,
      isAdm: decoded.isAdm,
    };

    next();
  });
}

export default VerifyToken;
