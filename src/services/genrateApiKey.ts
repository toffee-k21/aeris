import crypto from "crypto";

export function generateApiKey() {
  return "api_" + crypto.randomBytes(24).toString("hex");
}

console.log(generateApiKey());

