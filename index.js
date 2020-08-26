// AudioContext を作成
const audioContext = new AudioContext();

// Audio オブジェクトを作成し、src にサーバ内の mp3 ファイルを指定
const audioElement = new Audio();
audioElement.src　=　"myCoolTrack.mp3"

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

// 音の波の大きさを操る GainNode を生成
const gainNode = audioContext.createGain();

// 音声グラフを順に接続し、最終的に出力する
track.connect(gainNode).connect(audioContext.destination);

// select our play button
const playButton = document.querySelector('.tape-controls-play');

playButton.addEventListener('click', function() {
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


const volumeControl = document.querySelector('#volume');

volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
}, false);
