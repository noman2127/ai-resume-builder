import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_auth_secret_key_12345";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
};
