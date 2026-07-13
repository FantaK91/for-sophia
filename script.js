const screens = Array.from(document.querySelectorAll('.screen'));
const videos = [document.getElementById('videoA'), document.getElementById('videoB')];
let current = 0;
const last = screens.length - 1;

function setScreen(i){
  i = Math.max(0, Math.min(last, i));
  screens.forEach((s, idx) => s.classList.toggle('active', idx === i));
  current = i;
  handleVideoPlayback();
}

async function handleVideoPlayback(){
  const shouldPlay = current >= 5;
  for (const v of videos){
    if (!v) continue;
    try{
      if (shouldPlay){
        v.currentTime = v.currentTime || 0;
        v.muted = true;
        await v.play();
      }else{
        v.pause();
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

// Start on page 1
setScreen(0);
