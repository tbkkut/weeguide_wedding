// Wedding Invitation — Paweenuch & Kongkrit
// Wedding: Sunday 17 January 2027 (Thailand). Ceremony time not confirmed.
const WEDDING_DATE = new Date('2027-01-17T00:00:00+07:00');
const opening = document.getElementById('opening');
const website = document.getElementById('website');
const envelope = document.getElementById('envelope');
const openButton = document.getElementById('openButton');
let hasOpened = false;
const weddingMusic = document.getElementById('weddingMusic');
const musicToggle = document.getElementById('musicToggle');
weddingMusic.volume = 0.6;
function syncMusicButton() {
  const playing = !weddingMusic.paused;
  musicToggle.textContent = playing ? '♫ ปิดเพลง' : '♫ เปิดเพลง';
  musicToggle.setAttribute('aria-pressed', String(playing));
}
function startWeddingMusic() {
  // Called from a real click so mobile browsers can authorize audio.
  const promise = weddingMusic.play();
  if (promise && typeof promise.catch === 'function') {
    promise.catch(() => { syncMusicButton(); });
  }
}
musicToggle.addEventListener('click', () => {
  if (weddingMusic.paused) startWeddingMusic();
  else weddingMusic.pause();
});
weddingMusic.addEventListener('play', syncMusicButton);
weddingMusic.addEventListener('pause', syncMusicButton);
weddingMusic.addEventListener('error', () => {
  musicToggle.textContent = '♫ ไม่พบไฟล์เพลง';
});

// Gentle on mobile: the flower animation uses only temporary DOM nodes.
function floralBloomBurst() {
  const box = envelope.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height * .48;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const compact = vw < 600;
  const overlay = document.createElement('div');
  overlay.className = 'wow-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.setProperty('--origin-x', x + 'px');
  overlay.style.setProperty('--origin-y', y + 'px');
  document.body.appendChild(overlay);

  const flare = document.createElement('i');
  flare.className = 'wow-flare';
  overlay.appendChild(flare);
  const ring = document.createElement('i');
  ring.className = 'wow-ring';
  overlay.appendChild(ring);

  const count = compact ? 13 : 22;
  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    img.className = 'wow-flower';
    img.src = 'assets/floral-corner.svg';
    img.alt = '';
    const angle = -Math.PI + Math.PI * 2 * ((i + .2) / count);
    const travel = (compact ? 135 : 210) + Math.random() * (compact ? 110 : 220);
    const dx = Math.cos(angle) * travel;
    const dy = Math.sin(angle) * travel * .82;
    const size = (compact ? 54 : 74) + Math.random() * (compact ? 46 : 90);
    img.style.setProperty('--dx', dx.toFixed(0) + 'px');
    img.style.setProperty('--dy', dy.toFixed(0) + 'px');
    img.style.setProperty('--rotate', (Math.random()*180 - 90).toFixed(0)+'deg');
    img.style.setProperty('--size', size.toFixed(0)+'px');
    img.style.setProperty('--scale', (.6 + Math.random()*.5).toFixed(2));
    img.style.setProperty('--time', (2.3 + Math.random()*.7).toFixed(2)+'s');
    img.style.setProperty('--delay', (.16+Math.random()*.35).toFixed(2)+'s');
    overlay.appendChild(img);
  }
  const petals = compact ? 35 : 65;
  for (let i = 0; i < petals; i++) {
    const petal = document.createElement('i');
    petal.className = 'wow-petal';
    const angle = Math.random() * Math.PI*2;
    const distance = 80 + Math.random() * Math.max(vw*.4,180);
    petal.style.setProperty('--dx', (Math.cos(angle)*distance).toFixed(0)+'px');
    petal.style.setProperty('--dy', (Math.sin(angle)*distance*.75).toFixed(0)+'px');
    petal.style.setProperty('--size', (8 + Math.random()*16).toFixed(0)+'px');
    petal.style.setProperty('--petal-color', ['#a9c8e9','#d6e7fa','#f4fbff','#90b6df'][i%4]);
    petal.style.setProperty('--time', (2.3 + Math.random()*.9).toFixed(2)+'s');
    petal.style.setProperty('--delay', (.25 + Math.random()*.6).toFixed(2)+'s');
    overlay.appendChild(petal);
  }
  for (let i=0; i<(compact?22:38); i++) {
    const sparkle = document.createElement('span');
    sparkle.className='wow-glitter';
    sparkle.textContent=i%3===0?'✧':'✦';
    const angle = Math.random()*Math.PI*2;
    const dist = 70 + Math.random()*(compact?250:370);
    sparkle.style.setProperty('--dx',(Math.cos(angle)*dist).toFixed(0)+'px');
    sparkle.style.setProperty('--dy',(Math.sin(angle)*dist*.75).toFixed(0)+'px');
    sparkle.style.setProperty('--size',(9+Math.random()*15).toFixed(0)+'px');
    sparkle.style.setProperty('--time',(1.8+Math.random()*1.1).toFixed(2)+'s');
    sparkle.style.setProperty('--delay',(.2+Math.random()*.7).toFixed(2)+'s');
    overlay.appendChild(sparkle);
  }
  window.setTimeout(() => overlay.remove(), 4200);
}

function openInvitation() {
  if (hasOpened) return;
  hasOpened = true;
  musicToggle.hidden = false;
  startWeddingMusic();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  openButton.disabled = true;
  envelope.classList.add('is-open');
  if (!reduceMotion) {
    opening.classList.add('wow-opening');
    floralBloomBurst();
  }
  window.setTimeout(() => {
    opening.classList.add('wow-transition');
  }, reduceMotion ? 200 : 2650);
  window.setTimeout(() => {
    opening.hidden = true;
    opening.style.display = 'none';
    website.hidden = false;
    window.scrollTo({top:0,behavior:'instant'});
  }, reduceMotion ? 250 : 3550);
}
openButton.addEventListener('click', openInvitation);
envelope.addEventListener('click', openInvitation);

function updateCountdown() {
  const delta = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  const values = {
    days: Math.floor(delta / 86400000),
    hours: Math.floor(delta / 3600000) % 24,
    minutes: Math.floor(delta / 60000) % 60,
    seconds: Math.floor(delta / 1000) % 60
  };
  Object.entries(values).forEach(([key, value]) => {
    document.getElementById(key).textContent = String(value).padStart(2, '0');
  });
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

document.querySelectorAll('.gallery-thumb').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.gallery-thumb').forEach(other => other.classList.remove('active'));
    button.classList.add('active');
    document.getElementById('galleryMain').src = button.dataset.full;
  });
});

document.querySelectorAll('input[name="attendance"]').forEach(input => {
  input.addEventListener('change', () => {
    document.getElementById('guestCountGroup').hidden =
      document.querySelector('input[name="attendance"]:checked').value === 'no';
  });
});

document.getElementById('rsvpForm').addEventListener('submit', event => {
  event.preventDefault();
  // Preview only. No data is submitted or stored.
  document.getElementById('rsvpSuccess').hidden = false;
});

