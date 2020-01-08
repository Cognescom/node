const fs = require('fs');
const csv = require('csvtojson');

csv()
    .fromFile('./csv/in.csv')
    .subscribe((line) =>{
        let str = JSON.stringify(line) + '\n';
        fs.appendFile('convertData.txt', str, (error) =>{
            if(error) console.log(error);
        })
    }).then(
        console.log('Writing completed')
    );