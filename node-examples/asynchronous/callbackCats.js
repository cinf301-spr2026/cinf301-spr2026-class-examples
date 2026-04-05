/*
 * See README for details.
 */

const request = require('request');
const fs = require('fs');

request('https://catfact.ninja/breeds', (error, response, body) => {
    if (error) {
        console.error(`Could not send request to API: ${error.message}`);
        return;
    }

    if (response.statusCode != 200) {
        console.error(`Expected status code 200 but received ${response.statusCode}.`);
        return;
    }

    console.log('Processing our list of cat breeds');
    cats = JSON.parse(body)['data'];

    let catList = '';
    cats.forEach(cat => {
        catList += `${cat['breed']}, ${cat['country']}\n`;
    });

    fs.writeFile('callbackCats.csv', catList, (error) => {
        if (error) {
            console.error(`Could not save the cats to a file: ${error}`);
            return;
        }

        console.log('Saved our list of cats to callbackCats.csv');;
    });
});
