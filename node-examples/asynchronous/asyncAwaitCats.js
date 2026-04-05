/*
 * See README for details
 */
const axios = require('axios');
const fs = require('fs').promises;

async function saveCats() {
    try {
        console.log('start');
        let response = await axios.get('https://catfact.ninja/breeds');
        console.log('end');
        let catList = '';
        response.data.data.forEach(cat => {
            catList += `${cat['breed']}, ${cat['country']}\n`;
        });
        console.log('fs start');
        await fs.writeFile('asyncAwaitCats.csv', catList);
        console.log('fs end');
    } catch (error) {
        console.error(`Could not save the cat breeds to a file: ${error}`);
    }
}

console.log('total start');

/* Note that we don't have to wait for saveCats to 
 * finish before we can log 'total end'. This is because 
 * saveCats is an asynchronous function, and it will run 
 * in the background while the rest of the code 
 * continues to execute. 
 * 
 * Add awaits to saveCats() and wrap this code in an async 
 * immediately invoked function to see the difference.
 */
saveCats();
console.log('total end');
