/**
 * Get the data from the API
 */
export const getData = new Promise(async (resolve, reject) => {
    const {getData} = await import('./getData.js');
    getData.then((resp) => resolve(resp)).catch((e)=>reject(e));
});