import axios from "axios"

export const request = (url = "", data = {}, method = "") => {
  const res = axios({
    url: `https://api.challonge.com/v2/${url}`,
    method,
    data,
    headers: {
      'Authorization-Type': 'v1',
      'Authorization': 'dKlu3gqGrggcZP7JL8PTR7XyqlhHIFw16sUbKJ27',
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/json'
    }
  }).then((response) => {
    return response.data.data
  })
    .catch((error) => { console.error(error) })
  return res
}