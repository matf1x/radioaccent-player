/**
 * RA Player Starter
 * This will startup the player in the correct way
 */
(async function() {
    // Load the correct files
    const { init } = await import('./init.js'); 

    // Initialize the player
    init();
})();