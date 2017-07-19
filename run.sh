stty -F /dev/ttyACM0 115200
stty -F /dev/ttyACM0 raw
node main.js < $1
