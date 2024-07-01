const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = './src/config/keys.json';

const keyGen = () => {

    const newKey = uuidv4();

    fs.readFile(path, (err, data) => {
        if (err) {
            console.error('Error reading keys.json:', err);
            return;
        }

        let keys = JSON.parse(data);

        keys.push(newKey);

        fs.writeFile(path, JSON.stringify(keys, null, 4), err => {
            if (err) {
                console.error('Error writing to keys.json:', err);
                return;
            }
            console.log('New key added:', newKey);
        });
    });
};

module.exports = keyGen;
