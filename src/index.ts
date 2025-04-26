// src/index.ts

import * as readline from 'readline';
import { createToken, buyToken, sellToken } from './bundler';
import { setVolume, getCurrentVolume } from './volume-bot';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Command processing function
const processCommand = (command: string) => {
    const [action, arg1, arg2] = command.split(' ').map(arg => arg.trim());

    switch (action.toLowerCase()) {
        case 'create':
            if (arg1 && !isNaN(Number(arg2))) {
                createToken(arg1, Number(arg2));
            } else {
                console.log('Usage: create <token_name> <price>');
            }
            break;
        case 'buy':
            if (arg1) {
                buyToken(arg1);
            } else {
                console.log('Usage: buy <token_name>');
            }
            break;
        case 'sell':
            if (arg1) {
                sellToken(arg1);
            } else {
                console.log('Usage: sell <token_name>');
            }
            break;
        case 'volume':
            if (arg1) {
                const volume = Number(arg1);
                setVolume(volume);
            } else {
                console.log(`Current volume is ${getCurrentVolume()}`);
            }
            break;
        default:
            console.log('Unknown command. Use create, buy, sell, or volume.');
            break;
    }
};

// Start the command line interface
rl.on('line', (input) => {
    processCommand(input.trim());
});

// Initial instructions for the user
console.log('Welcome to the Token & Volume Bot CLI!');
console.log('Available commands:');
console.log('1. create <token_name> <price>');
console.log('2. buy <token_name>');
console.log('3. sell <token_name>');
console.log('4. volume <0-100>');
console.log('5. volume (to check current volume)');
