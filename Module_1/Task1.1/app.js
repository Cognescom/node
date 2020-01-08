import { createInterface } from 'readline';
import { reverse } from './reverse.js';

const readline = createInterface({
  input: process.stdin
});

readline.on('line', (line) => process.stdout.write(reverse(line) + '\n'));