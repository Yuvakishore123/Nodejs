const EventEmitter = require('events');
const url = 'https://helloworld/log';
class Logger extends EventEmitter {
 log(message){
    console.log(message)
    this.emit('messageLogged',{id:1,url:url});
}
}

module.exports=Logger;
module.exports.endPoint = url;