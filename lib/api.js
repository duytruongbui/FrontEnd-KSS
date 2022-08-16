export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://139.99.199.153:9000"
  }/${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  console.log('path :>> ', path);
  const requestUrl = getStrapiURL(path);
  // const requestUrl = `http://localhost:1337/api${path}`;
  const response = await fetch(requestUrl);
  return response.json();
}
