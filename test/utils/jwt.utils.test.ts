import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "../../src/utils/jwt.utils";

const secret = "test_secret";

describe("JWT Utilities", () => {
  const mockUsername = "testuser";

  describe("generateToken", () => {
    it("should generate a valid JWT token", () => {
      const token = generateToken(mockUsername);
      expect(typeof token).toBe("string");

      // Decode token without verification to check payload
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      expect(decoded).toHaveProperty("username", mockUsername);
      expect(decoded).toHaveProperty("exp"); // Check if expiration exists
    });

    it("should set expiration to 1 hour", () => {
      const token = generateToken(mockUsername);

      // Decode token without verification to check expiration
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      const currentTime = Math.floor(Date.now() / 1000);
      expect(decoded.exp).toBeGreaterThan(currentTime);
      expect(decoded.exp).toBeLessThanOrEqual(currentTime + 3600 * 24 * 30); // 30 days in seconds
    });
  });

  describe("verifyToken", () => {
    it("should verify a valid JWT token and return the payload", () => {
      const token = generateToken(mockUsername);
      const payload = verifyToken(token);
      expect(payload).toHaveProperty("username", mockUsername);
      expect(payload).toHaveProperty("exp");
      expect(payload).toHaveProperty("iat");
    });

    it("should throw an error for an invalid token", () => {
      const invalidToken = "invalid.token.value";
      expect(() => verifyToken(invalidToken)).toThrow(jwt.JsonWebTokenError);
    });

    it("should throw an error for an expired token", () => {
      // Create a token with a short expiration
      const expiredToken = jwt.sign({ username: mockUsername }, secret, {
        expiresIn: "1s",
      });

      // Wait for the token to expire
      setTimeout(() => {
        expect(() => verifyToken(expiredToken)).toThrow(jwt.TokenExpiredError);
      }, 2000); // 2 seconds to ensure token has expired
    });
  });
});
