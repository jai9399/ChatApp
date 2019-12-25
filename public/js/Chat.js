const socket = io();
var counter = 0;
 var user ="User";
 var userString="<b><p>"+user+":</p></b>";
//  socket.on('assign',(count)=>{
//      console.log(count)
//      user = user+count;
//      userString = "<b><p>"+user+":</p></b>"
//     })

// socket.on('countUpdated',(count)=>{
//     counter = count;
//     console.log('Count has been updated',count)
// })
// document.getElementById('run').addEventListener('click',()=>{
//     // counter=counter+1;
//     // socket.emit('update',counter);

// })
const elem = document.getElementById('display');

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      display("Geolocation is not supported by this browser.");
    }
  }
  
  const room = Qs.parse(location.search,{ignoreQueryPrefix:true});
  async function showPosition(position) {
     const lat = await position.coords.latitude;
     const long = await position.coords.longitude;
    //  console.log(lat) ;
    //  console.log(long) ;
        locations={
            long,lat
        }
        socket.emit('Location',locations)
    }
socket.on('ShareLoc',(postion)=>{
    const now = new Date();
    const mn = now.getMinutes();
    const sc = now.getSeconds();
    var hr = now.getHours();
    var ampm='am'
     if(hr>12){
         ampm ='pm';
         hr = hr-12;
     }
     else{
        ampm = 'am'     
    }
    const time = hr+":"+mn+" "+ampm;
    elem.innerHTML = elem.innerHTML + userString +  time+ "  -  <a target = '_blank' href="+postion+">This is my location</a>"
})

document.getElementById('Send').onclick=function(e){
    e.preventDefault();
    const input = document.getElementById('message');
    const messages = input.value;
    document.getElementById('message').value='';
    //Event Acknowlegment
    socket.emit('messages',messages,(message)=>{
        console.log('Message Sent : ',message)
    });
}   

 socket.on('show',(message)=>{
    const now = new Date();
    const mn = now.getMinutes();
    const sc = now.getSeconds();
    var hr = now.getHours();
    var ampm='am'
     if(hr>12){
         ampm ='pm';
         hr = hr-12;
     }
     else{
        ampm = 'am'     
    }
    const time = hr+":"+mn+" "+ampm;
     elem.innerHTML = elem.innerHTML+userString+"<p>"+time+"    -    "+message+"</p>"
 })


socket.on('recieve',(message)=>{
    const now = new Date();
    const mn = now.getMinutes();
    const sc = now.getSeconds();
    var hr = now.getHours();
    var ampm='am'
     if(hr>12){
         ampm ='pm';
         hr = hr-12;
     }
     else{
        ampm = 'am'     
    }
    const time = hr+":"+mn+" "+ampm;
    elem.innerHTML = elem.innerHTML+ userString+ "<p>"+time+"   -     "+message+"</p>"
})

socket.on('message',()=>{
    elem.innerHTML = "<p>Welcome</p>"
})
socket.emit('join',room);