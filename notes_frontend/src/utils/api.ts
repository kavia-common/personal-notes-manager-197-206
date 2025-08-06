//
// API utilities for backend REST integration.
// 
// API_BASE_URL must be set via environment variable:
//
//    NEXT_PUBLIC_API_BASE_URL
//
// Example in .env.local (do NOT commit secret keys):
//    NEXT_PUBLIC_API_BASE_URL=https://yourdomain.example/api
//
// Usage: import { API_BASE_URL } from "@/utils/api";
//
export const API_BASE_URL = (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) || "";

if (!API_BASE_URL) {
  console.warn("API base URL is not set. Set NEXT_PUBLIC_API_BASE_URL in your .env.local.");
}
