export const proxyTarget =
  process.env.NEXT_PUBLIC_PROXY_TARGET || "http://localhost:4000";

export const URL_ENDPOINTS = { auth: { register: "/api/auth/register" } };
