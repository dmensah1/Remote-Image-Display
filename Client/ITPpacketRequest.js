// allocating the size (in bytes) of each field of packet
let packet = Buffer.alloc(3),
            reqType = Buffer.alloc(1),
            img;

let pkt;
module.exports = {

    // initializing the packet
    init: function(pack, req, image) {
        packet.writeUInt16BE(pack);
        reqType.writeUInt8(req);
        img = Buffer.from(image);

        const totalSize = packet.length + reqType.length + img.length;
        pkt = Buffer.concat([packet, reqType, img], totalSize);
       
    },

    // returns the entire packet
    getpacket: function() {
        return pkt;
    }


};

