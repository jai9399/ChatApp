const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const app = express();
const Filter = require('bad-words')
const server = http.createServer(app)


const io = socketio(server);

app.use(express.static(__dirname+"/public"))
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
      res.sendFile(__dirname+"/public/index.html")
})
var count =0;
 io.on('connection',(socket)=>{
    socket.broadcast.emit('show','User Joined');
    socket.emit('assign',count++);
    console.log(count)
    //   socket.on('update',(counter)=>{
    //      console.log("got",counter)
    //      io.emit('countUpdated',counter)
    //   })
    socket.on('join',(data)=>{
        console.log(data);
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('show','User Disconnected')
    })
    socket.on('Location',(postion)=>{
        io.emit('ShareLoc','https://google.com/maps?q='+postion.lat+','+postion.long);
    })
      console.log('New connection')
      //Event Acknwoledgement
      socket.on('messages',(message,callback)=>{
          const filter = new Filter()
          if(filter.isProfane(message)){
            // callback('Profanity is not allowed')
           return io.emit('recieve',"#####")
          }
          io.emit('recieve',message);
          callback(message);
      })
    })

 
server.listen(port,()=>{
    console.log('hi');  
})
