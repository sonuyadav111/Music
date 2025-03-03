console.log('welcome to spotify')
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');   // default play song
// initialize 
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
// let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs=[
    // make object of songs songName,filepath,coverpath
    {songName:'Kesariya',filePath:'song/1.mp3',coverPath:'covers/kesariya.jpg'},
    {songName:'Manzar Hai Ye Naya',filePath:'song/2.mp3',coverPath:'covers/uri.jpg'},
    {songName:'Sultan',filePath:'song/3.mp3',coverPath:'covers/kgf.jpg'},
    {songName:'Hamdard',filePath:'song/4.mp3',coverPath:'covers/humdard.jpg'},
    {songName:'Srivalli',filePath:'song/5.mp3',coverPath:'covers/pushpa.jpeg'}
]

// songItems.forEach((element)=>{
//     console.log(element,i);
//     element.getElementsByTagName('img')[0].src = song[i].coverpath;
//     element.getElementsByClassName('songName')[0].innerText = song[i].songName;
// })


// audioElement.play()
// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    // masterPlay is class of play circle icon 
    // this code adds click event to that icon
    if(audioElement.paused ||audioElement.currentTime<=0){   // if paused or song time =0 then play 
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');   
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;      // show gif when song plays

        
    }
    else{
        audioElement.pause();       // on click event if song is already playing then pause it
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;         // hide gif

    }
}) 

// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*1000) //formula for progress
    // take 1000 for smooth scroll of seekbar
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    // if i click on seekbar then song starts from that click
    audioElement.currentTime = (myProgressBar.value * audioElement.duration/1000)
})

const makeAllPlays = ()=>{
    // when alredy a song is playing and i play another song then this function changes the icons of previous song from pause to play
    // function used in below code for icon change
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        // console.log(element);   fo me 

        element.classList.add('fa-circle-play');

    })
}
// code for click on play icon in song list  
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    // songItemPlay is class of icons
    // we make use of array to use the same function for all the elements of class SongItemPlay
    // by using forEach we itrate the element
    element.addEventListener('click',(e)=>{
        // added event click to the element
        // console.log(e.target);     for me
        makeAllPlays();   // function call 
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src= `song/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0; 
        audioElement.play();
        gif.style.opacity = 1;  // opacity of gif set to 1 when song starts
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause');

    })
})
// on click next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>5){
        songIndex=0       // if user click on next when 5th song is playing then repeat 5th song 
    }
    else{

        songIndex += 1;     // to play next song
    }
    audioElement.src= `song/${songIndex+1}.mp3`;    // source of audio is songIndex+1 ex. 2+1= 3.mp3(sultan)
    masterSongName.innerText = songs[songIndex].songName;       // to take songname from above songs object
    audioElement.currentTime = 0;   // to play song from start
    audioElement.play();    // to play song
    masterPlay.classList.remove('fa-circle-play')  // after click on play icon then remove play icon
    masterPlay.classList.add('fa-circle-pause');    // and add pause icon

})
// on click previous button
document.getElementById('previous').addEventListener('click',()=>{
    // above get element by id previous and added click event to it and below code is function execute on clik
    if(songIndex<=0){
        songIndex=0
    }
    else{

        songIndex -= 1;         // to play prevous song
    }
    audioElement.src= `song/${songIndex+1}.mp3`;   // source of audio is songIndex+1 ex. 2+1= 3.mp3(sultan)
    masterSongName.innerText = songs[songIndex].songName;  // to take songname from above songs object
    audioElement.currentTime = 0; // to play song from start
    audioElement.play();            // to play song
    masterPlay.classList.remove('fa-circle-play')  // after click on play icon then remove play icon
    masterPlay.classList.add('fa-circle-pause');   // and add pause icon

})