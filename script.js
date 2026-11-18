// Wedding Invitation — Paweenuch & Kongkrit
// Wedding: Sunday 17 January 2027 (Thailand). Ceremony time not confirmed.
const WEDDING_DATE = new Date('2027-01-17T00:00:00+07:00');
const opening = document.getElementById('opening');
const website = document.getElementById('website');
const envelope = document.getElementById('envelope');
const openButton = document.getElementById('openButton');
let hasOpened = false;

function openInvitation() {
  if (hasOpened) return;
  hasOpened = true;
  envelope.classList.add('is-open');
  openButton.disabled = true;
  window.setTimeout(() => opening.classList.add('closing'), 1050);
  window.setTimeout(() => {
    opening.hidden = true;
    opening.style.display = 'none';
    website.hidden = false;
    window.scrollTo({top: 0, behavior: 'instant'});
  }, 1750);
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
// Music is intentionally disabled until a suitable licensed audio file is selected.
