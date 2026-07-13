const screens = Array.from(document.querySelectorAll('.screen'));
const videos = [document.getElementById('videoA'), document.getElementById('videoB')];
const audios = [document.getElementById('audioA'), document.getElementById('audioB')];
let current = 0;
const last = screens.length - 1;

function setScreen(i){
  i = Math.max(0, Math.min(last, i));
  screens.forEach((s, idx) => s.classList.toggle('active', idx === i));
  current = i;
  handleMediaPlayback();
}

async function handleMediaPlayback(){
  const shouldPlay = current >= 4;
  for (const v of videos){
    if (!v) continue;
    try{
      if (shouldPlay){
        v.currentTime = v.currentTime || 0;
        await v.play();
      } else {
        v.pause();
      }
    }catch(e){}
  }
  for (const a of audios){
    if (!a) continue;
    try{
      if (shouldPlay){
        a.currentTime = a.currentTime || 0;
        a.volume = 1;
        await a.play();
      } else {
        a.pause();
      }
    }catch(e){}
  }
}

function next(){
  if (current < last) setScreen(current + 1);
}

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-next]')) next();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    next();
  }
});

screens.forEach(screen => {
  screen.addEventListener('click', (e) => {
    if (e.target.closest('[data-next]')) return;
    if (current < last) next();
  });
});

setScreen(0);
