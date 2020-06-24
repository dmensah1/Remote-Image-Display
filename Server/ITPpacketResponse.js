// allocating the size (in bytes) of each field of packet
let packet = Buffer.alloc(3),
            resType = Buffer.alloc(1),
            seqNo = Buffer.alloc(4),
            timeStamp = Buffer.alloc(4),
            imgSize = Buffer.alloc(4),
            imgContent;

let pkt;

module.exports = {

    init: function(pack, res, seq, stamp, size, content) {
        packet.writeUInt16BE(pack);
        resType.writeUInt8(res);
        seqNo.writeUInt16BE(seq);
        timeStamp.writeUInt16BE(stamp);
        imgSize.writeUInt16BE(size);
        imgContent = content;

        // storing the total size of the packet
        const totalSize = packet.length + resType.length + seqNo.length + timeStamp.length + imgSize.length + imgContent.length;

        // concatinating the different fields into one single packet
        pkt = Buffer.concat([packet,resType, seqNo,timeStamp,imgSize,imgContent], totalSize);

    },

    //returns the total length of the ITP packet
    getLength: function() {
        // length of the pkt is that of the entire packet minus the length of the payload (img data)
        let length = pkt.length - imgContent.length;
        return length;
    },

    //returns the entire packet
    getPacket: function() {
        return pkt;
    }
};