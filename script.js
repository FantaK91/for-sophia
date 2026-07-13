const stages = Array.from(document.querySelectorAll('.stage'));
const video = document.getElementById('bgVideo');
const videoFinal = document.getElementById('bgVideoFinal');

let current = 0;
const total = stages.length - 1;

function showStage(index) {
  index = Math.max(0, Math.min(total, index));

  stages.forEach((stage, i) => {
    stage.classList.toggle('active', i === index);
  });

  current = index;

  if (index === 5 || index === 6) {
    playVideos();
  } else {
    pauseVideos();
  }
}

async function playVideos() {
  try {
    if (video) {
      video.currentTime = video.currentTime || 0;
      await video.play();
    }
  } catch (e) {}
  try {
    if (videoFinal) {
      videoFinal.currentTime = videoFinal.currentTime || 0;
      await videoFinal.play();
    }
  } catch (e) {}
}

function pauseVideos() {
  if (video) video.pause();
  if (videoFinal) videoFinal.pause();
}

function nextStage() {
  if (current < total) {
    showStage(current + 1);
  }
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-next]');
  if (!btn) return;
  nextStage();
});

document.addEventListener('touchend', (e) => {
  const btn = e.target.closest('[data-next]');
  if (!btn) return;
}, { passive: true });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    nextStage();
  }
});

// Any click on active stage should continue, except on final stage
stages.forEach(stage => {
  stage.addEventListener('click', (e) => {
    if (stage.dataset.stage === '6') return;
    if (e.target.closest('button')) return;
    if (stage.classList.contains('active')) nextStage();
  });
});

// Start quietly on first screen
showStage(0);
