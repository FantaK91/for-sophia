const screens = [
  document.getElementById('screen1'),
  document.getElementById('screen2'),
  document.getElementById('screen3')
];

const scene = document.getElementById('scene');
const heartsLayer = document.getElementById('hearts');
const tapHint = document.getElementById('tapHint');
const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
const openLetterBtn = document.getElementById('openLetterBtn');
const giftBtn = document.getElementById('giftBtn');

let state = 0;

function showScreen(index) {
  screens.forEach((s, i) => {
    s.classList.remove('active', 'open', 'opened', 'fade-out', 'fade-in');
    if (i === index) s.classList.add('active');
  });

  if (index === 0) screens[0].classList.add('open');
  if (index === 1) screens[1].classList.add('opened');
  tapHint.style.display = index === 2 ? 'none' : 'block';
}

function next() {
  if (state === 0) {
    screens[0].classList.add('fade-out');
    spawnHearts(12);
    setTimeout(() => {
      state = 1;
      showScreen(1);
      screens[1].classList.add('fade-in');
      spawnSparkles();
      spawnHearts(10);
    }, 260);
  } else if (state === 1) {
    screens[1].classList.add('fade-out');
    spawnHearts(14);
    setTimeout(() => {
      state = 2;
      showScreen(2);
      screens[2].classList.add('fade-in');
      spawnSparkles();
      spawnHearts(18);
    }, 260);
  }
}

function bindActivation(el, action) {
  el.addEventListener('click', action);
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  });
}

bindActivation(openEnvelopeBtn, next);
bindActivation(openLetterBtn, next);

giftBtn.addEventListener('click', () => {
  giftBtn.textContent = '🎁 Regalo abierto';
  giftBtn.style.transform = 'scale(0.98)';
  spawnHearts(22);
  spawnSparkles();
  setTimeout(() => {
    giftBtn.textContent = 'Abrir gift card';
    giftBtn.style.transform = '';
  }, 1200);
});

[screens[0], screens[1]].forEach(screen => {
  screen.addEventListener('click', (e) => {
    if (e.target === giftBtn) return;
    next();
  });
});

function spawnHearts(count = 8) {
  const colors = ['#d94a59', '#ff6b7a', '#b93a48', '#ff8a98'];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const size = 10 + Math.random() * 18;
    const left = Math.random() * 100;
    const duration = 2.8 + Math.random() * 2.8;
    const delay = Math.random() * 0.35;
    heart.style.left = left + '%';
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';
    heart.style.background = colors[Math.floor(Math.random() * colors.length)];
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), (duration + delay) * 1000);
  }
}

function spawnSparkles() {
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'bg-sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.bottom = '-20px';
    sparkle.style.animationDuration = (3.5 + Math.random() * 1.8) + 's';
    sparkle.style.animationDelay = (Math.random() * 0.4) + 's';
    scene.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 5600);
  }
}

spawnSparkles();
setInterval(() => spawnHearts(2), 1700);
