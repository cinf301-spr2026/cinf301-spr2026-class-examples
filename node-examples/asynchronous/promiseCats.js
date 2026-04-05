/*
 * See README for details
 */

const axios = require('axios');
const fs = require('fs').promises;

axios.get('https://catfact.ninja/breeds')
    .then((response) => {
        console.log('Successfully retrieved our list of cat breeds');
        let catList = '';
        response.data.data.forEach(cat => {
            catList += `${cat['breed']}, ${cat['country']}\n`;
        });

        return fs.writeFile('promiseCats.csv', catList);
    })
    .then(() => {
        console.log('Saved our list of cats to promiseCats.csv');
    })
    .catch((error) => {
        console.error(`Could not save the cat breed data to a file: ${error}`);
    });

