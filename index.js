const audioContext = new AudioContext();

// const audioElement = document.querySelector('audio');
const audioElement = new Audio();
audioElement.crossOrigin　=　"anonymous"
audioElement.src　=　"myCoolTrack.mp3"

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

track.connect(audioContext.destination);

// select our play button
const playButton = document.querySelector('.tape-controls-play');

playButton.addEventListener('click', function() {
  console.log(playButton);
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}, false);

audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false';
}, false);
