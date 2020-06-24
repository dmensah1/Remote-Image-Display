//required imports
var ITPpacket = require('./ITPpacketResponse'),
    singleton = require('./Singleton'),
    fs = require('fs');

// required variable declarations
let packet,
timeStamp,
seqNo,
ITPVer,
reqType,
resType,
imgName,
imgContent,
imgSize,
imgDirectory = './images';

module.exports = {

    handleClientJoining: function (sock) {
        //acquiring the values of the seq and time
        seqNo = singleton.getSequenceNumber();
        timeStamp = singleton.getTimestamp();

        console.log('Client ' + timeStamp + ' is connected at timestamp: ' + timeStamp);

        sock.on('data', (content) => {
            if (content.slice(0,4).length == 4) {
                //reading the command line for the request
                ITPVer = content.slice(0,2).readUInt16BE(0);
                reqType = content.slice(3).readUInt8(0).toString();
                imgName = content.slice(4).toString();

                console.log('Client ' + timeStamp + ' requests: ');
                console.log('--ITP version: ' + ITPVer);
                console.log('--Request Type: ' + reqType);
                console.log('--Image name: ' + imgName);

                resType = 0;
                //searching the image directory to see if image with the name specified exists
                fs.readdir(imgDirectory, (err, files) => {
                    for (let x = 0; x < files.length; x++) {
                        if(imgName == files[x]) {
                            resType = 1;
                        }
                    }
                    getImg(imgDirectory, imgName);
                });

            }
        });

        // socket closing msg
        sock.on('close', (content) => {
            console.log('Client ' + timeStamp + ' closed the connection.');
        });

        // function to retrieve the requested image
        function getImg (directory, name) {
            //if image is not found then create a packet to send back with not found
            if (resType == 0) {
                imgContent = Buffer.alloc(1);
                ITPpacket.init(ITPVer, resType, seqNo, timeStamp, 0, imgContent);
                packet = ITPpacket.getPacket();
                sock.write(packet);
            } else {
                // searching the image directory for the specific image
                fs.readFile(directory + '\\' + name, (err, content) => {
                    if (err) {
                        throw err;
                    } else {
                        //returning the packet which now includes the image
                        imgSize = content.length;
                        imgContent = content;
                        ITPpacket.init(ITPVer, resType, seqNo, timeStamp, imgSize, imgContent);
                        packet = ITPpacket.getPacket();
                        sock.write(packet);
                    }
                });
            }
        }
    }
};


