import qs from "qs"
import { getStrapiURL } from "./api-helpers"
import { notFound } from "next/navigation"

export async function fetchAPI(path: string, urlParamsObject = {}, options = {}, cache = true) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: cache ? { revalidate: 3600 } : { revalidate: 0 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    }

    // Build request URL
    const queryString = qs.stringify(urlParamsObject)
    const requestUrl = `${getStrapiURL(`/${path}${queryString ? `?${queryString}` : ""}`)}`

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    notFound()
  }
}

export async function fetchTodayEvents() {
  const date = new Date()
  const data = fetchEventsFromDate(date)
  return data
}

export async function fetchEventsFromDate(date: Date) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dataToday = await fetchAPI(`taldiahoy/${month}/${day}`)
  const dataYesterday = await fetchAPI(`taldiahoy/${month}/${day - 1}`)
  const dataTomorrow = await fetchAPI(`taldiahoy/${month}/${day + 1}`)
  return [...dataToday, ...dataYesterday, ...dataTomorrow]
}

export async function fetchHitos() {
  const data = await fetchAPI(`hitos`)
  return data
}

export async function fetchLecturas() {
  const data = await fetchAPI(`libros`)
  return data
}

export async function fetchEvent(id: number): Promise<Evento> {
  const data = await fetchAPI(`tal-dias/${id}`)
  return data
}

export async function fetchHito(id: Number) {
  const data = await fetchAPI(`hitos/${id}`)
  return data
}

export async function fetchLectura(id: Number) {
  const data = await fetchAPI(`libros/${id}`)
  return data
}

export async function fetchFrase() {
  const data = await fetchAPI("fraserandom", {}, {}, false)
  return data
}

export async function fetchSabias() {
  const data = await fetchAPI("sabiasrandom", {}, {}, false)
  return data[0]
}

function delay(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok")
    }, ms)
  })
}
