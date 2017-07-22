stty -F $1 115200
stty -F $1 raw
node main.js $2 < $1
