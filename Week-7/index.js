const fs = require("fs");
const {Command} = require("commander");
const program = new Command();

program
    .name('counter')
    .description('CLI tool to do file based task.')
    .version('0.0.1');

program.command('count')
    .description('count the number of words in file')
    .arguments('<file>', 'File to count')
    .action((file) => {
        fs.readFile(file, 'UTF-8', (err, data) => {
            if(err){
                console.log(err)
            }
            else{
                const words = data.split(' ').length;
                console.log(`There are ${words} words in file`)
            }
        })
    });

program.parse();