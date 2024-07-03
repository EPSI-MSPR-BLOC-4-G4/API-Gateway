import jwt from "jsonwebtoken";
import * as dotevnv from "dotenv";

dotevnv.config();

type Payload = {
  username: string;
};

type DecodedPayload = Payload & jwt.JwtPayload;

const secret = process.env.JWT_SECRET || "test_secret";
const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

const generateToken = (username: string): string => {
  const payload: Payload = { username };
  const options: jwt.SignOptions = { expiresIn: expiresIn };
  return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string): DecodedPayload => {
  return jwt.verify(token, secret) as DecodedPayload;
};

export { generateToken, verifyToken };
