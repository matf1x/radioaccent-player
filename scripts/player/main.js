/**
 * Start a new Player
 */
export const start = new Promise(async (resolve, reject) => {
    const { newSession } = await import('./session.js');
    newSession.then((resp) => { resolve(resp) } ).catch((e) => reject(e));
});

export async function listen(resp) {
    const { initListeners } = await import('./listeners.js');
    initListeners(resp);
};