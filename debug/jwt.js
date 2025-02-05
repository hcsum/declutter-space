/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();
const { SignJWT, jwtVerify } = require("jose");

const USER_1H_TOKEN_SECRET =
  process.env.USER_1H_TOKEN_SECRET || "fallback-secret";
const encodedKey = new TextEncoder().encode(USER_1H_TOKEN_SECRET);

async function createUser1HToken(userId) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS512" })
    .setExpirationTime("1h")
    .setIssuedAt()
    .sign(encodedKey);
}

async function verifyUser1HToken(token) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS512"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify reset token", error);
  }
}

(async () => {
  const token = await createUser1HToken("123");
  const payload = await verifyUser1HToken(token);
  console.log(payload);
})();
