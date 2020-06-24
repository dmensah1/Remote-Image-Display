//necessary imports
// ****NOTE: image names are CASE-SENSITIVE when running the GetImage on the cmd line
var net = require('net');
var fs = require('fs');
var ITPpacket = require('./ITPpacketRequest')
var opn = require('opn'); 

var argv = require('minimist')(process.argv.slice(2));
var SERVER = argv.s.split(":");
// creating the socket
let client = new net.Socket();
client.connect(SERVER[1], SERVER[0], () => {
    console.log('Connected to ImageDB server on: ' + argv.s);
    //initializing the packet with user inputs
    ITPpacket.init(argv.v, 1, argv.q);

    let packet = ITPpacket.getpacket();
    client.write(packet);
});

client.on('data', (content) => {
    console.log('Server Sent: ');
    console.log('--ITP Version = ' + content.slice(0,2).readUInt16BE(0));
    console.log('--Response Type = ' + content.slice(3).readUInt8(0));
    console.log('--Sequence Number = ' + content.slice(4,7).readUInt16BE(0));
    console.log('--Timestamp = ' + content.slice(8,11).readUInt16BE(0));
    console.log('--Image Size = ' + content.slice(12, 15).readUInt16BE(0));

    if(content.slice(3,4).readUInt8(0) != 0) {
        fs.writeFile('new.jpg', content.slice(16), (err) => {
            if(err) {
                throw err;
            } else {
                opn('new.jpg').then(() =>{
                });
            }

        });
    }

    // shutting client after response
    client.destroy();

});

client.on('close', () => {
    console.log('Disconnected from the server.');
    console.log('Connection closed.');
});
