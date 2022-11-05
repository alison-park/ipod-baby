// Create your global variables below:
var tracklist = ["And That, Too", "Speaking Gently", "Time Moves Slow", "Lavendar", "Chompy's Paradise", "IV", "Hyssop of Love", "Structure No. 3", "In Your Eyes", "Cashmere"];
var volLevels = [];
var count=0;
var intervalID=null;
var song_id=0;
var prev=null;
var curr=null;

function init() {
	for (let i = 0; i < 6; i++) {
		let prefix="vl";
        let suffix=i.toString();
		let id_final=prefix.concat(suffix);
		volLevels[i] = document.getElementById(id_final);
	  }
   
	//Fill the background of the first 3 volume level <div>s. 
	document.getElementById("vl0").style.backgroundColor = "#9f5cc4";
	document.getElementById("vl1").style.backgroundColor = "#9f5cc4";
	document.getElementById("vl2").style.backgroundColor = "#9f5cc4";

};


function volUp() {
    for (let i = 0; i < 6; i++) {
		//console.log(volLevels[i].style.backgroundColor);
			if (volLevels[i].style.backgroundColor!="rgb(159, 92, 196)"){
				volLevels[i].style.backgroundColor="#9f5cc4";
				i=6;
			}
	}
	
}

function volDown() {
	for (let i = 5; i >-1; i--) {
		if (volLevels[i].style.backgroundColor=="rgb(159, 92, 196)"){
			volLevels[i].style.backgroundColor="white";
			i=-1;
		}
}
}


function helper(){
	
	if(document.getElementById("switch").innerHTML=="pause"){
		count=count+1;
		console.log("Pause is appearing, the music is playing");
		document.getElementById("player_time").value=count;
		console.log(document.getElementById("player_time").value);
		let element=document.getElementById("player_time");
		let elapsed_element=document.getElementById("time-elapsed");
		elapsed_element.innerHTML=secondsToMs(element.value);
		prev=document.getElementById("songname").innerHTML; //new!!
	}
	else{
		console.log("Music should not play");
	}

	if(document.getElementById("player_time").value==180){
		nextSong();
		console.log("Next Song!");
		count=0;
	}
	
}


function switchPlay() {
	// Your code goes here
	
	if(document.getElementById("switch").innerHTML=="play_arrow"){
		document.getElementById("switch").innerHTML="pause";
	}
	else{
		document.getElementById("switch").innerHTML="play_arrow";
	}


	curr=document.getElementById("songname").innerHTML;
	
	if(intervalID!=null){
		clearInterval(intervalID);
		if (prev!=null && prev!=curr){
			count=0;
		}
	}
	
	intervalID=setInterval(helper,1000); 
	prev=document.getElementById("songname").innerHTML;
  
}

function nextSong() {
	// Your code goes here
	document.getElementById("player_time").value=0;
	let element=document.getElementById("player_time");
	let elapsed_element=document.getElementById("time-elapsed");
	elapsed_element.innerHTML=secondsToMs(element.value);
	count=0;
	prev=document.getElementById("songname").innerHTML;
    song_id+=1;
	if(song_id<10){
		document.getElementById("songname").innerHTML=tracklist[song_id];
		curr=document.getElementById("songname").innerHTML; //new
	}
	else{
		song_id=0;
		document.getElementById("songname").innerHTML=tracklist[song_id];
		curr=document.getElementById("songname").innerHTML; //new
	}
	

}

function prevSong() {
	// Your code goes here
	document.getElementById("player_time").value=0;
	let element=document.getElementById("player_time");
	let elapsed_element=document.getElementById("time-elapsed");
	elapsed_element.innerHTML=secondsToMs(element.value);
	if(document.getElementById("switch").innerHTML=="pause"){
		count=0;
	}
    song_id-=1;
	if(song_id>-1){
		document.getElementById("songname").innerHTML=tracklist[song_id];

	}
	else{
		song_id=9;
		document.getElementById("songname").innerHTML=tracklist[song_id];
	}
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();