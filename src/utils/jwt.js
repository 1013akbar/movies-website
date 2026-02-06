import jwt from "jsonwebtoken";

export function signToken(payload, secret, expiresIn = "7d") {
  return jwt.sign(payload, secret, { expiresIn });
}
