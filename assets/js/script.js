const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currentTimeTxt = document.getElementById('current-time');

// Song titles
// this array can be assembled with values from the database for example
const songs = [
    "a-very-happy-christmas",
    "driving-ambition",
    "feeling-happy",
    "hazy-after-hours",
    "hip-hop",
    "life-is-a-dream",
    "raising-me-higher",
    "serene-view",
    "sun-and-his-daughter",
    "tech-house-vibes",
];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

//Convert the first letter to uppercase
function titleOneUpper(text) {
    var words = text.toLowerCase().split(" ");
    for (var i = 0; i < words.length; i++) {
        var w = words[i];
        words[i] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
}

// Update song details
function loadSong(song) {
    let titleR = song;
    titleR = titleR.replace(/[- ]+/g, ' ');
    title.innerText = titleOneUpper(titleR);
    audio.src = `./assets/music/${song}.mp3`;
    cover.src = `./assets/images/${song}.jpg`;
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    const timeCurrent = (currentTime / 60).toFixed(2);
    progress.style.width = `${progressPercent}%`;
    currentTimeTxt.innerText = `${timeCurrent} min.`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);