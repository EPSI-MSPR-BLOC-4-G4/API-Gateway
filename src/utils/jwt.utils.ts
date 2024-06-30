import jwt from "jsonwebtoken";

type Payload = {
  username: string;
};

const secret = process.env.JWT_SECRET || "test_secret";

const generateToken = (username: string): string => {
  const payload: Payload = { username };
  const options: jwt.SignOptions = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string): Payload => {
  return jwt.verify(token, secret) as Payload;
};

export { generateToken, verifyToken };
