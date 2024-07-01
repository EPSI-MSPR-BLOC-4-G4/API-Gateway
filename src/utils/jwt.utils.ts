import jwt from "jsonwebtoken";

type Payload = {
  username: string;
};

type DecodedPayload = Payload & jwt.JwtPayload;

const secret = process.env.JWT_SECRET || "test_secret";

const generateToken = (username: string): string => {
  const payload: Payload = { username };
  const options: jwt.SignOptions = { expiresIn: "30d" };
  return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string): DecodedPayload => {
  return jwt.verify(token, secret) as DecodedPayload;
};

export { generateToken, verifyToken };
