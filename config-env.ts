const { writeFile } = require('fs');
require('dotenv').config();
const targetPath = `./app/client/environments/environment.ts`;
const envConfigFile = `
export const environment = {
    production: false,
    target: '${process.env.TARGET}'
};`;
writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
        console.log(err);
    }
});
