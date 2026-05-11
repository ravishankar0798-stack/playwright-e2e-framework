import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL || "https://rahulshettyacademy.com/client",
  username: process.env.TEST_USERNAME || "defaultEmail@example.com",
  password: process.env.TEST_PASSWORD || "defaultPassword",
};