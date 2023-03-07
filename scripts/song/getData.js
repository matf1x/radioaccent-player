/**
 * General config
 */
let poll;

/**
 * Get the data from the API
 */
export async function getData() {
  // Get the API
  const { api } = await import("../config.js")

  // Return a fetch request
  return fetch(api.pointers.song, {
    method: "GET",
  })
}
