const readline = require('readline');

function parseCommand(command) {

  const tokens = command.split(' ');

  switch (tokens[0]) {
    case '>': {
      console.log(tokens.slice(1).join(' '));
      break
    }
    case 'grip': {
      const gripValue = parseFloat(tokens[1]);
      console.log('grip: ' + gripValue);
    }
  }

}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', parseCommand);
