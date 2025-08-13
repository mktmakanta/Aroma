export const fetcher = (url, options) =>
  fetch(url, { credentials: "include", ...options }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `Request failed: ${res.status}`);
    }
    // Handle empty response bodies safely
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  });
