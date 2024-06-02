const playButton = document.getElementById('play-pause');
const seekBar = document.getElementById('seek-bar');
const playlist = document.getElementById('playlist');
const fileUpload = document.getElementById('file-upload');

let audio = null; // Store the audio element

// Function to play and pause the audio
function togglePlayPause() {
  if (audio) {
    if (audio.paused) {
      audio.play();
      playButton.innerText = 'Pause';
    } else {
      audio.pause();
      playButton.innerText = 'Play';
    }
  }
}

playButton.addEventListener('click', togglePlayPause);

// Function to update the seek bar and audio time
function updateSeek() {
  if (audio) {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    seekBar.value = (currentTime / duration) * 100;
  }
}

// Function to handle changes in the seek bar
function handleSeekChange() {
  if (audio) {
    const seekRatio = seekBar.value / 100;
    const targetTime = audio.duration * seekRatio;
    audio.currentTime = targetTime;
  }
}

seekBar.addEventListener('input', handleSeekChange);

// Function to handle uploaded song
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    audio = new Audio(url);
    audio.addEventListener('timeupdate', updateSeek);
    // Add song to playlist (basic example)
    const listItem = document.createElement('li');
    listItem.innerText = file.name;
    playlist.appendChild(listItem);
    togglePlayPause(); // Start playing the uploaded song
  }
}

fileUpload.addEventListener('change', handleFileUpload);

// Add functionality to handle playlist management (future implementation)
