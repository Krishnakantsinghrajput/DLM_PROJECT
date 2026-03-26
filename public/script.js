let queue = [];

function lock(){

const user = document.getElementById("user").value;
const resource = document.getElementById("resource").value;

fetch(`/lock?resource=${resource}&user=${user}`)
.then(res=>res.text())
.then(data=>{

document.getElementById("result").innerText=data;

if(data==="LOCKED"){

document.getElementById("lockBox").innerText="🔒 LOCKED BY "+user;
document.getElementById("lockBox").style.background="#e74c3c";

}else{

queue.push(user);
updateQueue();

}

});

}


function unlock(){

const resource=document.getElementById("resource").value;

fetch(`/unlock?resource=${resource}`)
.then(res=>res.text())
.then(data=>{

document.getElementById("result").innerText=data;

if(queue.length>0){

const next=queue.shift();

document.getElementById("lockBox").innerText="🔒 LOCKED BY "+next;

updateQueue();

}else{

document.getElementById("lockBox").innerText="🔓 FREE";
document.getElementById("lockBox").style.background="#4CAF50";

}

});

}


function updateQueue(){

const box=document.getElementById("queueBox");

box.innerHTML="Queue: "+queue.join(" → ");

}