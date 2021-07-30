import axios from "axios"
import { apiKey } from "./apiKey"

export const request = (url = "", data = {}, method = "") => {
  const res = axios({
    url: `https://api.challonge.com/v2/${url}`,
    method,
    data,
    headers: {
      'Authorization-Type': 'v1',
      'Authorization': apiKey,
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/json'
    }
  }).then((response) => {
    return response.data.data
  })
    .catch((error) => { console.error(error) })
  return res
}