const baseUrl = "http://localhost:3000";

const request = async (
  url: string,
  method: string,
  body?: Record<string, unknown>
) => {
  const fullUrl = baseUrl + url;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  return response;
};

export const http = {
  get: (url: string, body?: Record<string, unknown>) =>
    request(url, "GET", body),
  post: (url: string, body: Record<string, unknown>) =>
    request(url, "POST", body),
  patch: (url: string, body: Record<string, unknown>) =>
    request(url, "PATCH", body),
  delete: (url: string) => request(url, "DELETE"),
};
