
// Some code needs to added that are common for the module
const math = require('mathjs');
let time = math.round(math.random()*(999-1)+1);
let seqNo = math.round(math.random()*(999-1)+1);

module.exports = {
    init: function() {
        //the function in param is evaluated every 10ms
       setInterval(function(){
        if (time == math.pow(2, 32)) {
            // if timer reaches 2^32 it resets
            time = 0;
        } else {
            // else its incremented by 1
            time += 1;
        } 
       }, 10);
    },

    //return the current sequence number + 1
    getSequenceNumber: function() {
        seqNo += 1;
        return seqNo;
    },

    //return the current timer value
    getTimestamp: function() {
        return time;
    }

};