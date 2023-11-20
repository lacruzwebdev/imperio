import qs from "qs"
import { getStrapiURL } from "./api-helpers";

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 0 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running.`);
  }
}

export async function fetchTodayEvents() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const data = await fetchAPI(`taldiahoy/${month}/${day}`)
  return data
}

export async function fetchEvent(id: number) {
  const data = await fetchAPI(`tal-dias/${id}`);
  return data;
}

function delay(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve('ok')}, ms)
  })
}