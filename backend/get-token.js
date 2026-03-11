#!/usr/bin/env node

const https = require("https");
const http = require("http");
const { URL } = require("url");
const fs = require("fs");
const path = require("path");

// Load .env file
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length) {
        process.env[key.trim()] = valueParts.join("=").trim();
      }
    });
  }
}

// Make HTTP request
function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === "https:" ? https : http;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const req = client.request(parsedUrl, options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve(body));
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.log("Usage:");
    console.log("node get-token.js admin pw_admin");
    console.log("node get-token.js susi pw_susi");
    process.exit(1);
  }

  loadEnv();

  const keycloakUrl = process.env.KEYCLOAK_URL;
  if (!keycloakUrl) {
    console.log("Error: KEYCLOAK_URL not found in .env file");
    process.exit(1);
  }

  const tokenUrl = `${keycloakUrl}/realms/bookstore/protocol/openid-connect/token`;
  const data = new URLSearchParams({
    client_id: "bookstore-cli",
    grant_type: "password",
    username: username,
    password: password,
  }).toString();

  try {
    const response = await makeRequest(tokenUrl, data);
    const json = JSON.parse(response);
    console.log(`
TOKEN:

${json.access_token}

VERWENDEN MIT curl:

curl -v http://localhost:3000/api/books -H "Authorization: Bearer ${json.access_token}"

`);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
