let loopBeat;
let bassSynth;
let playBtn3 = document.querySelector("#play-button-3");
let pauseBtn3 = document.querySelector("#pause-button-3");

function setup() {
  bassSynth = new Tone.MembraneSynth().toDestination();

  Tone.Transport.bpm.value = 140;
  loopBeat = new Tone.Loop(playBeat, '4n');

  Tone.Transport.start();
  loopBeat.start(0);
}

function playBeat(time) {
  bassSynth.triggerAttackRelease('C1', '8n', time);
}

playBtn3.addEventListener("click", function(){ 
  loopBeat.start(0);        
  Tone.Transport.start();
});

pauseBtn3.addEventListener("click", function() {
  Tone.Transport.pause();
});
