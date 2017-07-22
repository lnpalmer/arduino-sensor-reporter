process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const request = require('request');
const readline = require('readline');

const endpoint = process.argv[2];
const sensorSession = [];

function handleResponse(error, response, body) {

  if (error !== null)
    console.log(error.message);

  console.log('sensor session uploaded to endpoint.');

  process.exit();

}

function transmitOutput() {

  request.post(
    endpoint,
    { form: { data: sensorSession }},
    handleResponse
  );

}

function registerOutput(value, timestamp) {

  sensorSession.push({ value, timestamp });

}

function parseCommand(command) {

  const tokens = command.split(' ');

  switch (tokens[0]) {
    case '>': {
      console.log(tokens.slice(1).join(' '));
      break;
    }
    case 'grip': {
      const gripValue = parseFloat(tokens[1]);
      registerOutput(gripValue, Date.now());
      break;
    }
  }

}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', parseCommand);

process.on('SIGINT', () => {
  transmitOutput();
});
